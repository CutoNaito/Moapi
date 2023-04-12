import { Comments } from "../../models/help/Comments";
import { Request, Response } from "express";
import { uuid } from "uuidv4";

if (!process.env.AUTH) {
    console.log('Missing environment variables');
    process.exit(1);
};

const auth_token = process.env.AUTH;

export async function getAll(req: Request, res: Response) {
    /**
     * @description Gets all comments from the database
     */
    try {
        const result = await Comments.findAll();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID(req: Request, res: Response) {
    /**
     * @description Gets a comment by ID from the database
     */
    try {
        const result = await Comments.findByID(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID_users(req: Request, res: Response) {
    /**
     * @description Gets a comment by ID_users from the database
     */
    try {
        const result = await Comments.findByID_users(req.params.user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function getByID_posts(req: Request, res: Response) {
    /**
     * @description Gets a comment by ID_posts from the database
     */
    try {
        const result = await Comments.findByID_posts(req.params.post_id);
        res.status(200).json({result: result});
    } catch (err) {
        res.status(500).json(err);
    }
};

export async function create(req: Request, res: Response) {
    /**
     * @description Creates a new comment in the database
     */
    const UUID: string = uuid();
    const Comment = new Comments(UUID, req.body.user_id, req.body.post_id, req.body.body);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Comment.save();
            res.status(200).json({result: result});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function update(req: Request, res: Response) {
    /**
     * @description Updates a comment in the database
     */
    const Comment = new Comments(req.params.id, req.body.user_id, req.body.post_id, req.body.body);

    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Comment.update();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

export async function remove(req: Request, res: Response) {
    /**
     * @description Removes a comment from the database
     */
    if (req.headers.authorization !== auth_token) {
        res.status(401).json({message: "Unauthorized"});
    } else {
        try {
            const result = await Comments.delete(req.params.id);
            res.status(200).json({result: result});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};