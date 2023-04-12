import database from '../../config/DBConfig';
import { Logger } from '../../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
};

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Posts {
    /**
     * @param ID
     * @param ID_users
     * @param title
     * @param body
     * 
     * @description Creates a new Posts object
     * 
     * @returns {Promise<Posts>}
     */
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
        /**
         * @description Saves the Posts object to the database
         * 
         * @returns {Promise<Posts>}
         */
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
        /**
         * @description Updates the Posts object in the database
         * 
         * @returns {Promise<Posts>}
         */
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
        /**
         * @description Deletes the Posts object from the database
         * 
         * @param ID
         * 
         * @returns {Promise<Posts>}
         */
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
        /**
         * @description Finds all Posts objects in the database
         * 
         * @returns {Promise<Posts[]>}
         */
        try {
            const [result] = await database.query('SELECT * FROM posts');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID(ID: string) {
        /**
         * @description Finds a Posts object in the database by ID
         * 
         * @param ID
         * 
         * @returns {Promise<Posts>}
         */
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID_users(ID_users: string) {
        /**
         * @description Finds a Posts object in the database by ID_users
         * 
         * @param ID_users
         * 
         * @returns {Promise<Posts>}
         */
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByTitle(title: string) {
        /**
         * @description Finds a Posts object in the database by title
         * 
         * @param title
         * 
         * @returns {Promise<Posts>}
         */
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE title = ?', [title]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByBody(body: string) {
        /**
         * @description Finds a Posts object in the database by body
         * 
         * @param body
         * 
         * @returns {Promise<Posts>}
         */
        try {
            const [result] = await database.query('SELECT * FROM posts WHERE body = ?', [body]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };
};