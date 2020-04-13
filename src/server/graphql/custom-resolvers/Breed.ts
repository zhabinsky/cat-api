import TypeComposers from '../type-composers';
import Models from '../../models';
import { BreedDocument } from '../../models/Breed';
import mongoose, { MongooseFilterQuery, FilterQuery } from 'mongoose';

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
        origin: { type: 'String' },
    },
    resolve: async ({ source, args, context, info }) => {
        return await new Promise((resolve, reject) => {
            const conditions = {
                isText: v => !!v && typeof v === 'string',
            };

            const query = new Query();

            query.addCriteria({
                condition: conditions.isText(args.search),
                type: 'AND',
                parameterName: 'name',
                value: () => ({ $regex: args.search, $options: 'i' }),
            });

            query.addCriteria({
                condition: conditions.isText(args.origin),
                type: 'AND',
                parameterName: 'origin',
                value: () => mongoose.Types.ObjectId(args.origin),
            });

            Models.Breed.Model.find(
                query.generate(),
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

function Query() {
    this.criteria = [];
    this.addCriteria = ({ condition, type, parameterName, value }) => {
        this.criteria.push([condition, type, parameterName, value]);
    };

    const getCriteriaOfType = type => {
        return this.criteria
            .filter(([condition]) => condition) // filter out criteria which dont apply
            .map(([, ...rest]) => rest) // format
            .filter(([t]) => t === type)
            .map(([, ...rest]) => rest) // format
            .map(([k, getValue]) => ({
                [k]: getValue(),
            }));
    };

    this.generate = () => {
        const criteria = getCriteriaOfType('AND');

        let query = {} as FilterQuery<BreedDocument>;

        if (criteria.length > 0) {
            if (criteria.length === 1) {
                query = criteria[0];
            } else {
                query = {
                    $and: criteria,
                };
            }
        }

        return query;
    };
}
