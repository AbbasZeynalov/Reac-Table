const initialState = [];

const Posts = (state = initialState, action) => {


    switch (action.type) {
        case 'GET_POST':
            return {
                ...state,
                data: action.posts
            };
        case 'FILTER_POST':

            let value = action.value;
            let posts = action.posts;

            let filteredPosts = posts.filter((post) => {

                if(post.title.includes(value) || post.body.replace(/\r?\n|\r/g, ' ').includes(value)) {
                    return post;
                }

                return false;
            });

            return {
                ...state,
                data: filteredPosts
            };
        default:
            return state;
    }
};

export default Posts;