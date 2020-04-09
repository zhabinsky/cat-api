import express from 'express';
import connectDB from './db/connect';
import * as Middleware from './middleware';
import populate from '../__populate';

async function init() {
    /** Connect to DB before starting the app */
    await connectDB();

    /** Make sure our DB is not empty before exposing the WEB to the network */
    await populate();

    const app = express();

    app.use('/public-assets', ...Middleware.static);
    app.use('/graphql', ...Middleware.graphql);
    app.use(...Middleware.client);

    const PORT = Number(process.env.PORT);
    app.listen(PORT, async (err) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.ok('App listening @ http://localhost:' + PORT);
    });
}

init();
