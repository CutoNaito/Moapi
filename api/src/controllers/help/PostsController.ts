import { Posts } from "../../models/help/Posts";
import { Request, Response } from "express";
import { uuid } from "uuidv4";

if (!process.env.AUTH) {
    console.log('Missing environment variables');
    process.exit(1);
};

const auth_token = process.env.AUTH;

export async function getAll(req: Request, res: Response) {
    try {
        const result = await Posts.findAll();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID(req: Request, res: Response) {
    try {
        const result = await Posts.findByID(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID_users(req: Request, res: Response) {
    try {
        const result = await Posts.findByID_users(req.params.user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByTitle(req: Request, res: Response) {
    try {
        const result = await Posts.findByTitle(req.params.title);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByBody(req: Request, res: Response) {
    try {
        const result = await Posts.findByBody(req.params.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function create(req: Request, res: Response) {
    const UUID: string = uuid();
    const Post = new Posts(UUID, req.body.user_id, req.body.title, req.body.body);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Post.save();
            res.status(200).json({result: result});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function update(req: Request, res: Response) {
    const Post = new Posts(req.params.id, req.body.user_id, req.body.title, req.body.body);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Post.update();
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
            const result = await Posts.delete(req.params.id);
            res.status(200).json({result: result});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};