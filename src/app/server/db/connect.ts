import mongoose from 'mongoose';

const CONNECTION_URI = process.env.DB_URI as string;

mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const connect = async () => {
    return new Promise((resolve, reject) => {
        db.on('error', (...args) => {
            console.error('connection error:', ...args);
            reject();
            process.exit(1);
        });

        db.once('open', () => {
            console.notify('DB Connection OK ' + CONNECTION_URI);
            resolve();
        });
    });
};

export default connect;
