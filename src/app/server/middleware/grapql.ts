import graphqlHTTP from 'express-graphql';
import schema from '../graphql/schema';

const allowGQPlayground = Boolean(process.env.ALLOW_GQ_PLAYGROUND);

export default [
    graphqlHTTP({
        graphiql: allowGQPlayground,
        schema,
    }),
];
