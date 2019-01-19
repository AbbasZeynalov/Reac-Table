import Axios from "axios";

const PostService = () => {
    return Axios.get('http://jsonplaceholder.typicode.com/posts');
};

export default PostService;
