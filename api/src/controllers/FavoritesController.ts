import { Favorites } from "../models/Favorites";
import { Request, Response } from "express";
import { uuid } from "uuidv4";

if (!process.env.AUTH) {
    console.log('Missing environment variables');
    process.exit(1);
};

const auth_token = process.env.AUTH;

export async function getAll(req: Request, res: Response) {
    try {
        const result = await Favorites.findAll();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID(req: Request, res: Response) {
    try {
        const result = await Favorites.findByID(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID_users(req: Request, res: Response) {
    try {
        const result = await Favorites.findByID_users(req.params.user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByURI(req: Request, res: Response) {
    try {
        const result = await Favorites.findByURI(req.params.uri);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByMethod(req: Request, res: Response) {
    try {
        const result = await Favorites.findByMethod(req.params.method);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function create(req: Request, res: Response) {
    const UUID: string = uuid();
    const Favorite = new Favorites(UUID, req.body.user_id, req.body.uri, req.body.method);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Favorite.save();
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function update(req: Request, res: Response) {
    const Favorite = new Favorites(req.params.id, req.body.user_id, req.body.uri);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Favorite.update();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function remove(req: Request, res: Response) {
    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Favorites.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};