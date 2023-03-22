import { Users } from "../models/Users";
import { Request, Response } from "express";
import { uuid } from "uuidv4";
import bcrypt from "bcrypt";

if (!process.env.AUTH) {
    console.log('Missing environment variables');
    process.exit(1);
};

const auth_token = process.env.AUTH;

export async function getAll(req: Request, res: Response) {
    try {
        const [result] = await Users.findAll();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID(req: Request, res: Response) {
    try {
        const [result] = await Users.findByID(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByUsername(req: Request, res: Response) {
    try {
        const [result] = await Users.findByUsername(req.params.username);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByEmail(req: Request, res: Response) {
    try {
        const [result] = await Users.findByEmail(req.params.email);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByToken(req: Request, res: Response) {
    try {
        const [result] = await Users.findByToken(req.params.token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function create(req: Request, res: Response) {
    const UUID: string = uuid();
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10);
    const User = new Users(UUID, req.body.username, req.body.email, hashedPassword, req.body.token);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const [result] = await User.save();
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export async function update(req: Request, res: Response) {
    const User = new Users(req.params.id, req.body.username, req.body.email, req.body.password);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const [result] = await User.update();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export async function remove(req: Request, res: Response) {
    const User = new Users(req.params.id);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const [result] = await User.delete();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

export async function login(req: Request, res: Response) {
    try {
        const result = await Users.findByUsername(req.body.username);
        const match = await bcrypt.compare(req.body.password, result[0].password);
        res.status(201).json({message: "Login successful", result: result, match: match});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}