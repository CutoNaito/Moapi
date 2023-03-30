import database from '../config/DBConfig';
import { Logger } from '../logger/Logger';
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
}

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Favorites {
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
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE ID = ?', [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByID_users(ID_users: string) {
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE ID_users = ?', [ID_users]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByURI(URI: string) {
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE URI = ?', [URI]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findByMethod(method: string) {
        try {
            const [result] = await database.query('SELECT * FROM favorites WHERE method = ?', [method]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }

    static async findAll() {
        try {
            const [result] = await database.query('SELECT * FROM favorites');

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    }
};