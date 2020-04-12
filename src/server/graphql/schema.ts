/**
 * Library used to compose GraphQL schema from mongoose Schemas
 * https://www.npmjs.com/package/graphql-compose-mongoose
 *
 * Information on how to build a nested relation query
 * https://github.com/graphql-compose/graphql-compose-mongoose#how-to-build-nestingrelations
 *
 */

import TypeComposers from './type-composers';
import './custom-resolvers';
import { schemaComposer } from 'graphql-compose';

const { Country, Breed } = TypeComposers;

const queries = {
    countryOne: Country.getResolver('findOne'),
    countryMany: Country.getResolver('findMany'),
    countryCount: Country.getResolver('count'),
    breedOne: Breed.getResolver('findOne'),
    breedMany: Breed.getResolver('findMany'),
    breedCount: Breed.getResolver('count'),
    breedSearch: Breed.getResolver('search'),
    // countryById: Country.getResolver('findById'),
    // countryByIds: Country.getResolver('findByIds'),
    // countryConnection: Country.getResolver('connection'),
    // countryPagination: Country.getResolver('pagination'),
    // breedById: Breed.getResolver('findById'),
    // breedByIds: Breed.getResolver('findByIds'),
    // breedConnection: Breed.getResolver('connection'),
    // breedPagination: Breed.getResolver('pagination'),
};

const mutations = {
    vote: Breed.getResolver('vote'),
};

/**
 * Here we define our GQ QUERIES and MUTATIONS
 */
schemaComposer.Query.addFields(queries);
schemaComposer.Mutation.addFields(mutations);
const schema = schemaComposer.buildSchema();

export default schema;
