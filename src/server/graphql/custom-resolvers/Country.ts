import TypeComposers from '../type-composers';
import '../custom-resolvers';
import { BreedDocument } from '../../models/Breed';

const { Country, Breed } = TypeComposers;

Country.addRelation('breeds', {
    resolver: () => Breed.getResolver('findMany'),
    prepareArgs: {
        filter: (source: BreedDocument) => ({
            _operators: {
                _id: source.origin,
            },
        }),
        limit: 5,
    },
    projection: { origin: 1 }, // required fields from source object
});
