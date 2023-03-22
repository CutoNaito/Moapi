import express from 'express';
import UsersRouter from './routes/UsersRoutes';
import StoredURIsRouter from './routes/StoredURIsRoutes';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/users', UsersRouter);
app.use('/stored_uris', StoredURIsRouter);

if (Number.isInteger(parseInt(port!)) && parseInt(port!) > 0) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
} else {
    console.log('Invalid port');
};
