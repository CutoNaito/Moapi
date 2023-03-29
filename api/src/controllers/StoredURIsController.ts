import { StoredURIs } from "../models/StoredURIs";
import { Request, Response } from "express";
import { uuid } from "uuidv4";

if (!process.env.AUTH) {
    console.log('Missing environment variables');
    process.exit(1);
};

const auth_token = process.env.AUTH;

export async function getAll(req: Request, res: Response) {
    try {
        const [result] = await StoredURIs.findAll();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID(req: Request, res: Response) {
    try {
        const [result] = await StoredURIs.findByID(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID_users(req: Request, res: Response) {
    try {
        const result = await StoredURIs.findByID_users(req.params.user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByURI(req: Request, res: Response) {
    try {
        const [result] = await StoredURIs.findByURI(req.params.uri);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function create(req: Request, res: Response) {
    const UUID: string = uuid();
    const StoredURI = new StoredURIs(UUID, req.body.user_id, req.body.uri);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const [result] = await StoredURI.save();
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function update(req: Request, res: Response) {
    const StoredURI = new StoredURIs(req.params.id, req.body.user_id, req.body.uri);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const [result] = await StoredURI.update();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function remove(req: Request, res: Response) {
    const StoredURI = new StoredURIs(req.params.id, req.body.user_id, req.body.uri);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const [result] = await StoredURI.delete();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};