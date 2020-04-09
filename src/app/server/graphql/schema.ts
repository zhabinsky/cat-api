/**
 * https://www.npmjs.com/package/graphql-compose-mongoose
 *
 * Library used to compose GraphQL schema from mongoose Schemas
 */

import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { schemaComposer } from 'graphql-compose';
import * as Models from '../models';

const customizationOptions = {};

const CountryTC = composeWithMongoose(
    Models.Country.Model,
    customizationOptions,
);
schemaComposer.Query.addFields({
    countryById: CountryTC.getResolver('findById'),
    countryByIds: CountryTC.getResolver('findByIds'),
    countryOne: CountryTC.getResolver('findOne'),
    countryMany: CountryTC.getResolver('findMany'),
    countryCount: CountryTC.getResolver('count'),
    countryConnection: CountryTC.getResolver('connection'),
    countryPagination: CountryTC.getResolver('pagination'),
});

const BreedTC = composeWithMongoose(Models.Breed.Model, customizationOptions);
schemaComposer.Query.addFields({
    breedById: BreedTC.getResolver('findById'),
    breedByIds: BreedTC.getResolver('findByIds'),
    breedOne: BreedTC.getResolver('findOne'),
    breedMany: BreedTC.getResolver('findMany'),
    breedCount: BreedTC.getResolver('count'),
    breedConnection: BreedTC.getResolver('connection'),
    breedPagination: BreedTC.getResolver('pagination'),
});

/**
 * This resource explained how to build a relation
 * https://github.com/graphql-compose/graphql-compose-mongoose#how-to-build-nestingrelations
 */

interface Breed {
    origin: string;
}

BreedTC.addRelation('origin', {
    resolver: () => CountryTC.getResolver('findById'),
    prepareArgs: { _id: (breed: Breed) => breed.origin },
    projection: { origin: 1 }, // required fields from source object
});

CountryTC.addRelation('breeds', {
    resolver: () => BreedTC.get('$findMany'), // shorthand for `UserTC.getResolver('findMany')`
    prepareArgs: {
        filter: (source: Breed) => ({
            _operators: {
                _id: source.origin,
            },
        }),
        limit: 5,
    },
    projection: { origin: 1 }, // required fields from source object
});

const graphqlSchema = schemaComposer.buildSchema();

export default graphqlSchema;
