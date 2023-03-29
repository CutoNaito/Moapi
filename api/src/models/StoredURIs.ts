import database from '../config/DBConfig';
import { Logger } from '../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
}

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class StoredURIs {
    ID?: string;
    ID_users?: string;
    URI?: string;

    constructor(ID?: string, ID_users?: string, URI?: string) {
        if (ID) this.ID = ID;
        if (ID_users) this.ID_users = ID_users;
        if (URI) this.URI = URI;
    }

    async save() {
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('INSERT INTO stored_URIs (ID, ID_users, URI) VALUES (?, ?, ?)', [this.ID, this.ID_users, this.URI]).then(() => {
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
        try {
            await database.query('START TRANSACTION').catch((err: any) => {
                logger.log(`${err}`);
                database.query('ROLLBACK');
            });

            const [result] = await database.query('UPDATE stored_URIs SET ID_users = ?, URI = ? WHERE ID = ?', [this.ID_users, this.URI, this.ID]).then(() => {
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
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByID_users(ID_users: string) {
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByURI(URI: string) {
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs WHERE URI = ?', [URI]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findAll() {
        try {
            const [result] = await database.query('SELECT * FROM stored_URIs');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };
}