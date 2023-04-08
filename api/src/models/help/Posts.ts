import database from '../../config/DBConfig';
import { Logger } from '../../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
};

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Posts {
    ID?: string;
    ID_users?: string;
    title?: string;
    body?: string;

    constructor(ID?: string, ID_users?: string, title?: string, body?: string) {
        if (ID) this.ID = ID;
        if (ID_users) this.ID_users = ID_users;
        if (title) this.title = title;
        if (body) this.body = body;
    };

    async save() {
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('INSERT INTO posts (ID, ID_users, title, body) VALUES (?, ?, ?, ?)', [this.ID, this.ID_users, this.title, this.body]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    async update() {
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('UPDATE posts SET ID_users = ?, title = ?, body = ? WHERE ID = ?', [this.ID_users, this.title, this.body, this.ID]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async delete(ID: string) {
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('DELETE FROM posts WHERE ID = ?', [ID]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findAll() {
        try {
            const [result] = await database.query('SELECT * FROM posts');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID(ID: string) {
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID_users(ID_users: string) {
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByTitle(title: string) {
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE title = ?', [title]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByBody(body: string) {
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE body = ?', [body]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };
};