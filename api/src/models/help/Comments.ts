import database from '../../config/DBConfig';
import { Logger } from '../../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
};

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Comments {
    ID?: string;
    ID_users?: string;
    ID_posts?: string;
    body?: string;

    constructor(ID?: string, ID_users?: string, ID_posts?: string, body?: string) {
        if (ID) this.ID = ID;
        if (ID_users) this.ID_users = ID_users;
        if (ID_posts) this.ID_posts = ID_posts;
        if (body) this.body = body;
    };

    async save() {
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('INSERT INTO comments (ID, ID_users, ID_posts, body) VALUES (?, ?, ?, ?)', [this.ID, this.ID_users, this.ID_posts, this.body]).then(() => {
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

            const [result] = await database.query('UPDATE comments SET ID_users = ?, ID_posts = ?, body = ? WHERE ID = ?', [this.ID_users, this.ID_posts, this.body, this.ID]).then(() => {
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

            const [result] = await database.query('DELETE FROM comments WHERE ID = ?', [ID]).then(() => {
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

    static async findByID(ID: string) {
        try {
            const [result] = await database.query('SELECT * FROM comments WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID_posts(ID_posts: string) {
        try {
            const [result] = await database.query('SELECT * FROM comments WHERE ID_posts = ?', [ID_posts]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID_users(ID_users: string) {
        try {
            const [result] = await database.query('SELECT * FROM comments WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findAll() {
        try {
            const [result] = await database.query('SELECT * FROM comments');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };
}