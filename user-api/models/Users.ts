import database from "../config/DBConfig";

export class Users {
    ID?: string;
    username?: string;
    password?: string;
    email?: string;
    token?: string;

    constructor(ID?: string, username?: string, email?: string, password?: string, token?: string) {
        if (ID) this.ID = ID;
        if (username) this.username = username;
        if (email) this.email = email;
        if (password) this.password = password;
        if (token) this.token = token;
    }

    async save() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("INSERT INTO users (ID, username, password, email, token) VALUES (?, ?, ?, ?, ?)", [this.ID, this.username, this.password, this.email, this.token]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    async update() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("UPDATE users SET username = ?, password = ?, email = ? WHERE ID = ?", [this.username, this.password, this.email, this.ID]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    async delete() {
        try {
            await database.query("START TRANSACTION").catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });

            const [result] = await database.query("DELETE FROM users WHERE ID = ?", [this.ID]).then(() => {
                database.query("COMMIT");
            }).catch((err: any) => {
                console.log(err);
                database.query("ROLLBACK");
            });

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    static async findByID(ID: string) {
        try {
            const [result] = await database.query("SELECT * FROM users WHERE ID = ?", [ID]);

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    static async findAll() {
        try {
            const [result] = await database.query("SELECT * FROM users");

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    static async findByUsername(username: string) {
        try {
            const [result] = await database.query("SELECT * FROM users WHERE username = ?", [username]);

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    static async findByEmail(email: string) {
        try {
            const [result] = await database.query("SELECT * FROM users WHERE email = ?", [email]);

            return result;
        } catch (err) {
            console.log(err);
        }
    };

    static async findByToken(token: string) {
        try {
            const [result] = await database.query("SELECT * FROM users WHERE token = ?", [token]);

            return result;
        } catch (err) {
            console.log(err);
        }
    };
};