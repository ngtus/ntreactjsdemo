import axios, { CancelToken } from "axios";
import { useContext, useState, useEffect } from "react";
import {
    useParams
} from "react-router-dom";
import PostDetail from "../../component/PostDetail";
import UserContext from "../../contexts/UserContext";
const PostPage = () => {
    const currentUser = useContext(UserContext)
    const [error, setError] = useState('');
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState({
        id: null,
        userId: null,
        title: null,
        body: null,
    });
    useEffect(() => {
        let cancel;
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/posts/${id}`,
            headers: { Authorization: `Bearer ${currentUser.token}`},
        }).then(({ data }) => {
            setIsLoading(false);
            console.log(data);
            setPost({
                id: data.id,
                userId: data.userId,
                title: data.title,
                body: data.body
            });
        })
            .catch(err => {
                setError(err.message);
            })
        return () => {
            cancel();
        }
    }, [])

    if (isLoading) return <div>loading...</div>
    if (error) return <div>{error}</div>
    return (
        <PostDetail key={post.id} id={post.id} userId={post.userId} title={post.title} body={post.body} />
    )
}

export default PostPage;