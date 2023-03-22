import { client, host } from "../../config/SMTPConfig";
import { Request, Response } from "express";

if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
    console.log('Missing environment variables');
    process.exit(1);
}

const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;

export async function sendVerificationCode(req: Request, res: Response) {
    try { 
        await client.connect();
        await client.greet({hostname: host});
        await client.authPlain({
            username: username,
            password: password
        });

        await client.mail({from: username});
        await client.rcpt({to: req.body.email});
        await client.data(`Subject: Verification Code\n\nYour verification code is: ${req.body.code}`);
        await client.quit();

        res.status(200).json({
            message: "Verification code sent"
        });
    } catch (error) {
        res.status(500).json({
            message: "Verification code not sent"
        });
    }
}