import database from '../config/DBConfig';
import { Logger } from '../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
}

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Favorites {
    /**
     * @param ID
     * @param ID_users
     * @param URI
     * @param method
     * 
     * @description Creates a new Favorites object
     */
    ID?: string;
    ID_users?: string;
    URI?: string;
    method?: string;

    constructor(ID?: string, ID_users?: string, URI?: string, method?: string) {
        if (ID) this.ID = ID;
        if (ID_users) this.ID_users = ID_users;
        if (URI) this.URI = URI;
        if (method) this.method = method;
    }

    async save() {
        /**
         * @description Saves the Favorites object to the database
         * 
         * @returns {Promise<Favorites>}
         */
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('INSERT INTO favorites (ID, ID_users, URI, method) VALUES (?, ?, ?, ?)', [this.ID, this.ID_users, this.URI, this.method]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    async update() {
        /**
         * @description Updates the Favorites object in the database
         * 
         * @returns {Promise<Favorites>}
        */
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('UPDATE favorites SET ID_users = ?, URI = ?, method = ? WHERE ID = ?', [this.ID_users, this.URI, this.method, this.ID]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async delete(ID: string) {
        /**
         * @description Deletes the Favorites object from the database
         * 
         * @param ID
         * 
         * @returns {Promise<Favorites>}
         */
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('DELETE FROM favorites WHERE ID = ?', [ID]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByID(ID: string) {
        /**
         * @description Finds the Favorites object in the database
         * 
         * @param ID
         * 
         * @returns {Promise<Favorites>}
         */
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByID_users(ID_users: string) {
        /**
         * @description Finds the Favorites object in the database
         * 
         * @param ID_users
         * 
         * @returns {Promise<Favorites>}
         */
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByURI(URI: string) {
        /**
         * @description Finds the Favorites object in the database
         * 
         * @param URI
         * 
         * @returns {Promise<Favorites>}
         */
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE URI = ?', [URI]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByMethod(method: string) {
        /**
         * @description Finds the Favorites object in the database
         * 
         * @param method
         * 
         * @returns {Promise<Favorites>}
         */
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE method = ?', [method]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findAll() {
        /**
         * @description Finds all the Favorites objects in the database
         * 
         * @returns {Promise<Favorites[]>}
         */
        try {
            const [result] = await database.query('SELECT * FROM favorites');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }
};