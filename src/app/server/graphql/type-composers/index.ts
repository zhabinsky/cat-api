import { composeWithMongoose } from 'graphql-compose-mongoose/node8';
import { ObjectTypeComposer } from 'graphql-compose';

import Models from '../../models';

const customizationOptions = {};
const typeComposers: TypeComposers = {};

for (const [modelName, model] of Object.entries(Models)) {
    const typeComposer = composeWithMongoose(model.Model, customizationOptions);
    typeComposers[modelName] = typeComposer;
}

interface TypeComposers {
    [modelName: string]: ObjectTypeComposer;
}

/**
 * typeComposers has a ObjectTypeComposer
 * for every registered model
 *
 * so that later we can use it when declaring our
 * queries and mutations (avoiding duplicate code)
 */

export default typeComposers;
