import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

if (!env.SERVER_URI || !env.AUTH_TOKEN) {
    throw new Error("Environment variables not set");
};

const SERVER_URI = env.SERVER_URI;

interface Comments {
    ID: string;
    ID_users: string;
    ID_posts: string;
    body: string;
}

export function HelpPost() {
    const history = useNavigate();
    const [searchParams] = useSearchParams();
    const postID = searchParams.get("id");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userID, setUserID] = useState("");
    const [postUserID, setPostUserID] = useState("");
    const [comments, setComments] = useState<Comments[]>([]);
    const [commentBody, setCommentBody] = useState("");

    async function fetchPost() {
        const response = await fetch(SERVER_URI + `/posts/${postID}`);
        const data = await response.json();

        if (data.error) {
            history("/help");
        } else {
            setTitle(data[0].title);
            setBody(data[0].body);
            setPostUserID(data[0].ID_users);
        };
    };

    async function fetchUser() {
        const response = await fetch(SERVER_URI + "/users/token/" + document.cookie.split("=")[1]);
        const data = await response.json();

        if (data.error) {
            history("/login");
        } else {
            setUserID(data.result.ID);
        };
    };

    async function fetchComment() {
        const response = await fetch(SERVER_URI + `/comments/post/${postID}`);
        const data = await response.json();

        if (data.error) {
            history("/help");
        } else {
            const mappedComments = data.result.map((comment: Comments) => {
                return {
                    ID: comment.ID,
                    ID_users: comment.ID_users,
                    ID_posts: comment.ID_posts,
                    body: comment.body
                };
            });

            setComments(mappedComments);
        };
    };

    async function deletePost() {
        const response = await fetch(SERVER_URI + `/posts/${postID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN!
            }
        });

        const data = await response.json();

        if (data.error) {
            alert("Something went wrong");
        } else {
            history("/help");
        };

        history("/help");
    };

    useEffect(() => {
        if (postID === "0" || postID === null || postID === undefined || postID === "undefined" || postID === "null" || postID === "") {
            history("/help");
        }

        fetchPost();
        fetchUser();
        fetchComment();
    }, []);

    const commentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(SERVER_URI + "/comments/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN!
            },
            body: JSON.stringify({
                user_id: userID,
                post_id: postID,
                body: commentBody
            })
        });

        const data = await response.json();

        if (data.error) {
            alert("Something went wrong");
        } else {
            fetchComment();
        };
    };

    async function deleteComment(id: string) {
        const response = await fetch(SERVER_URI + `/comments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.AUTH_TOKEN!
            }
        });

        const data = await response.json();

        if (data.error) {
            alert("Something went wrong");
        } else {
            fetchComment();
        };
    }

    return (
        <div>
            <Header />
            <div className="post-view">
                {userID === postUserID && <button onClick={deletePost}>Delete post</button>}
                <div className="post-content">
                    <h1>{title}</h1>
                    <p>{body}</p>
                </div>

                <div className="comment-div">
                    <div className="write-comment">
                        <h2>Write a comment</h2>
                        <form onSubmit={commentSubmit}>
                            <textarea placeholder="Write a comment" onChange={
                                (e) => {
                                    setCommentBody(e.target.value);
                                }
                            }></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                    <div className="comments">
                        {comments.map((comment) =>
                            <div className="comment" key={comment.ID}>
                                <div className="delete-comment-button">
                                    {userID === comment.ID_users && <button onClick={() => deleteComment(comment.ID)}>Delete comment</button>}
                                </div>
                                <p>{comment.body}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}