import { SMTPClient } from "smtp-client";
import "dotenv/config"

if (!process.env.SMTP_HOST || !process.env.SMTP_PORT) {
    console.log('Missing environment variables');
    process.exit(1);
}

export const host = process.env.SMTP_HOST;
const port = parseInt(process.env.SMTP_PORT);

export const client = new SMTPClient({
    host: host,
    port: port
});