import express from 'express';
import UsersRouter from './routes/UsersRoutes';
import StoredURIsRouter from './routes/StoredURIsRoutes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

// try {
//     if (process.env.PORT) {
//         port = parseInt(process.env.PORT)
//     } else {
//         console.log("No port specified.");
//     }
// } catch (err) {
//     console.log(err);
// }

app.use(express.json());
app.use(cors());

app.use('/users', UsersRouter);
app.use('/stored_uris', StoredURIsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
