import TypeComposers from '../type-composers';
import Models from '../../models';
import { BreedDocument } from '../../models/Breed';

const { Breed, Country } = TypeComposers;

/**
 * Resolver for voting
 *
 * arguments: _id of the breed
 * mutation: increments vote count on breed doc.
 */
Breed.addResolver({
    name: 'vote',
    type: Breed,
    args: { _id: 'String' },
    resolve: async ({ source, args, context, info }) => {
        const result = await Models.Breed.Model.findOneAndUpdate(
            { _id: args._id },
            { $inc: { votes: 1 } },
            { new: true },
        );
        return result;
    },
});

/**
 * Resolver to retrieve a Country doc
 * in place of origin field on Breed
 */
Breed.addRelation('origin', {
    resolver: () => Country.getResolver('findById'),
    prepareArgs: { _id: (breed: BreedDocument) => breed.origin },
    projection: { origin: 1 }, // required fields from source object
});

/** Search resolver for our FE application */
Breed.addResolver({
    name: 'search',
    type: '[Breed]', // returns an array of Breed
    args: {
        search: 'String',
        skip: { type: 'Int', defaultValue: 0 },
        limit: { type: 'Int', defaultValue: 10 },
    },
    resolve: async ({ source, args, context, info }) => {
        return await new Promise((resolve, reject) => {
            Models.Breed.Model.find(
                { name: { $regex: String(args.search), $options: 'i' } },
                null,
                { limit: Number(args.limit), skip: Number(args.skip) },
                (err, docs: BreedDocument[]) => {
                    if (err) return reject(err);
                    resolve(docs);
                },
            );
        });
    },
});
