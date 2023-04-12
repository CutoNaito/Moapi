import database from "../config/DBConfig";
import { Logger } from "../logger/Logger";
import 'dotenv/config';

if (!process.env.LOG_PATH) {
    throw new Error('LOG_PATH is not defined');
}

const PATH = process.env.LOG_PATH;
const logger = new Logger(PATH);

export class Users {
    /**
     * @param ID
     * @param username
     * @param password
     * @param email
     * @param token
     * @param verified
     * @param verification_code
     * 
     * @description Creates a new Users object
     */
    ID?: string;
    username?: string;
    password?: string;
    email?: string;
    token?: string;
    verified?: number;
    verification_code?: string;

    constructor(ID?: string, username?: string, email?: string, password?: string, token?: string, verified?: number, verification_code?: string) {
        if (ID) this.ID = ID;
        if (username) this.username = username;
        if (email) this.email = email;
        if (password) this.password = password;
        if (token) this.token = token;
        if (verified) this.verified = verified;
        if (verification_code) this.verification_code = verification_code;
    }

    async save() {
        /**
         * @description Saves the Users object to the database
         * 
         * @returns {Promise<Users>}
         */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("INSERT INTO users (ID, username, password, email, token, verified, verification_code) VALUES (?, ?, ?, ?, ?, ?, ?)", [this.ID, this.username, this.password, this.email, this.token, false, this.verification_code]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    async update() {
        /**
         * @description Updates the Users object in the database
         * 
         * @returns {Promise<Users>}
         */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("UPDATE users SET username = ?, password = ?, email = ? WHERE ID = ?", [this.username, this.password, this.email, this.ID]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    async delete() {
        /**
         * @description Deletes the Users object from the database
         * 
         * @returns {Promise<Users>}
         */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("DELETE FROM users WHERE ID = ?", [this.ID]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByID(ID: string) {
        /**
         * @description Finds a Users object in the database by ID
         * 
         * @param ID
         * 
         * @returns {Promise<Users>}
         */
        try {
            const [result] = await database.query("SELECT * FROM users WHERE ID = ?", [ID]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findAll() {
        /**
         * @description Finds all Users objects in the database
         * 
         * @returns {Promise<Users[]>}
         */
        try {
            const [result] = await database.query("SELECT * FROM users");

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByUsername(username: string) {
        /**
         * @description Finds a Users object in the database by username
         * 
         * @param username
         * 
         * @returns {Promise<Users>}
         */
        try {
            const [result] = await database.query("SELECT * FROM users WHERE username = ?", [username]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByEmail(email: string) {
        /**
         * @description Finds a Users object in the database by email
         * 
         * @param email
         * 
         * @returns {Promise<Users>}
         */
        try {
            const [result] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async findByToken(token: string) {
        /**
         * @description Finds a Users object in the database by token
         * 
         * @param token
         * 
         * @returns {Promise<Users>}
         */
        try {
            const [result] = await database.query("SELECT * FROM users WHERE token = ?", [token]);

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async verify(token: string) {
        /**
         * @description Verifies a Users object in the database by token
         * 
         * @param token
         * 
         * @returns {Promise<Users>}
         */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("UPDATE users SET verified = ? WHERE token = ?", [true, token]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };

    static async removeVerificationCode(token: string) {
        /**
         * @description Removes the verification code from a Users object in the database by token
         * 
         * @param token
         * 
         * @returns {Promise<Users>}
         */
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("UPDATE users SET verification_code = ? WHERE token = ?", [null, token]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                logger.log(`${err}`);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            logger.log(`${err}`);
        }
    };
};