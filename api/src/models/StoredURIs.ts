import database from '../config/DBConfig';
import { Logger } from '../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
}

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class StoredURIs {
    /**
     * @param ID
     * @param ID_users
     * @param URI
     * @param method
     * 
     * @description Creates a new StoredURIs object
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
         * @description Saves the StoredURIs object to the database
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('INSERT INTO stored_URIs (ID, ID_users, URI, method) VALUES (?, ?, ?, ?)', [this.ID, this.ID_users, this.URI, this.method]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    async update() {
        /**
         * @description Updates the StoredURIs object in the database
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('UPDATE stored_URIs SET ID_users = ?, URI = ?, method = ? WHERE ID = ?', [this.ID_users, this.URI, this.method, this.ID]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    async delete() {
        /**
         * @description Deletes the StoredURIs object from the database
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('DELETE FROM stored_URIs WHERE ID = ?', [this.ID]).then(() => {
                database.query('COMMIT');
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByID(ID: string) {
        /**
         * @description Finds a StoredURIs object in the database by its ID
         * 
         * @param ID
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByID_users(ID_users: string) {
        /**
         * @description Finds a StoredURIs object in the database by its ID_users
         * 
         * @param ID_users
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByURI(URI: string) {
        /**
         * @description Finds a StoredURIs object in the database by its URI
         * 
         * @param URI
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE URI = ?', [URI]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findAll() {
        /**
         * @description Finds all StoredURIs objects in the database
         * 
         * @returns {Promise<StoredURIs[]>}
         */
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByMethod(method: string) {
        /**
         * @description Finds a StoredURIs object in the database by its method
         * 
         * @param method
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE method = ?', [method]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findCount() {
        /**
         * @description Finds the number of StoredURIs objects in the database
         * 
         * @returns {Promise<StoredURIs>}
         */
        try {
            const [result] = await database.query('SELECT COUNT(*) FROM stored_URIs');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }
}