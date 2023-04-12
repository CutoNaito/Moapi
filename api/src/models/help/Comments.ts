import database from '../../config/DBConfig';
import { Logger } from '../../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
};

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Comments {
    /**
     * @param ID
     * @param ID_users
     * @param ID_posts
     * @param body
     * 
     * @description Creates a new Comments object
     */
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
        /**
         * @description Saves the Comments object to the database
         * 
         * @returns {Promise<Comments>}
         */
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
        /**
         * @description Updates the Comments object in the database
         * 
         * @returns {Promise<Comments>}
         */
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
        /**
         * @description Deletes the Comments object from the database
         * 
         * @param ID
         * 
         * @returns {Promise<Comments>}
         */
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
        /**
         * @description Finds the Comments object in the database
         * 
         * @param ID
         * 
         * @returns {Promise<Comments>}
         */
        try {
            const [result] = await database.query('SELECT * FROM comments WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID_posts(ID_posts: string) {
        /**
         * @description Finds the Comments object in the database
         * 
         * @param ID_posts
         * 
         * @returns {Promise<Comments>}
         */
        try {
            const [result] = await database.query('SELECT * FROM comments WHERE ID_posts = ?', [ID_posts]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findByID_users(ID_users: string) {
        /**
         * @description Finds the Comments object in the database
         * 
         * @param ID_users
         * 
         * @returns {Promise<Comments>}
         */
        try {
            const [result] = await database.query('SELECT * FROM comments WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };

    static async findAll() {
        /**
         * @description Finds all Comments objects in the database
         * 
         * @returns {Promise<Comments[]>}
         */
        try {
            const [result] = await database.query('SELECT * FROM comments');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        };
    };
}