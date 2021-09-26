import axios from "axios";
import Post from '../../component/Post';
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const PostsPage = () => {
    const currentUser = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState('')
    const [sortBy, setSortBy] = useState(null)
    const filtered = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()))
    const history = useHistory();
    const showPostDetail = (id) => {
        history.push(`/posts/${id}`);
    }
    const handleDelete = (id) => {
        var postsAfterDelete = posts.filter(post => {
            return post.id !== id;
        })
        setPosts(postsAfterDelete)
    }
    const handleSearch = (evt) => {
        setSearchText(evt.target.value)
    }
    const getSorted = () => {
        switch (sortBy) {
            case "ID":
                return filtered.sort((post1, post2) => post1.id - post2.id)
            case "USERID":
                return filtered.sort((post1, post2) => post1.userId - post2.userId)
            case "TITLE":
                return filtered.sort((post1, post2) => {
                    if (post1.title.toLowerCase() < post2.title.toLowerCase()) return -1;
                    if (post1.title.toLowerCase() > post2.title.toLowerCase()) return 1;
                    return 0;
                })
            case "BODY":
                return filtered.sort((post1, post2) => {
                    if (post1.body.toLowerCase() < post2.body.toLowerCase()) return -1;
                    if (post1.body.toLowerCase() > post2.body.toLowerCase()) return 1;
                    return 0;
                })
            default:
                return filtered
        }
    }
    const sorted = getSorted()
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts',
            headers: { Authorization: `Bearer ${currentUser.token}` },
        }).then(({ data }) => {
            setIsLoading(false);
            setPosts(data);
        })
    }, [])
    if (isLoading) return <div>loading...</div>
    return (
        <div>
            <div className="searchBar">
                <input type="text" placeholder="search by title" value={searchText} onChange={handleSearch} />
            </div>
            <table>
                <tr>
                    <th onClick={() => setSortBy("ID")}>Id</th>
                    <th onClick={() => setSortBy("USERID")}>User id</th>
                    <th onClick={() => setSortBy("TITLE")}>Title</th>
                    <th onClick={() => setSortBy("BODY")}>Body</th>
                </tr>
                {sorted.map(post => (
                    <Post key={post.id} id={post.id} userId={post.userId} title={post.title} body={post.body} delete={() => handleDelete(post.id)} detail={() => showPostDetail(post.id)} />
                ))}
            </table>
        </div>
    )
}

export default PostsPage;