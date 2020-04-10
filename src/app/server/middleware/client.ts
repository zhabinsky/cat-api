import { parse } from 'url';
import next from 'next';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const dir = path.resolve(__dirname, '../../client');

const app = next({ dev, dir });
const handle = app.getRequestHandler();

let donePreparing = false;
const nextApp = app.prepare().then(() => {
    donePreparing = true;
});

const sendClientApp = async (req: any, res: any) => {
    const parsedUrl = parse(req.url, true);
    // const { pathname, query } = parsedUrl;

    if (!donePreparing) {
        await nextApp;
    }

    return handle(req, res, parsedUrl);
};

export default [sendClientApp];
