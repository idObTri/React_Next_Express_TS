import express, { Request, Response } from "express";
import next from "next";
//import mongoose from "mongoose";

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;

/* for mongodb
const dbUri = "mongodb://address:port/database";
mongoose.connect(dbUri, {
    authSource: "admin",
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
*/

const main = async () => {
    await app.prepare()
        .then(() => {
            const server = express();

            /* for mongodb
            server.use(express.urlencoded({
                limit: '50mb',
                extended: true
            }));
            server.use(express.json({
                limit: '50mb'
            }));
            */

            server.all("*", (req: Request, res: Response) => {
                return handle(req, res);
            });
            const httpServer = server.listen(port, (err?: Error) => {
                httpServer.keepAliveTimeout = 0;
                if (err) throw err;
                console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
            });
        }).catch((err: Error) => {
            console.error(err);
            process.exit(1);
        });
}

main();