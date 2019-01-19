export const getPosts = posts => ({
    type: 'GET_POST',
    posts
});

export const filterPosts = (value, posts) => ({
    type: 'FILTER_POST',
    value,
    posts
});