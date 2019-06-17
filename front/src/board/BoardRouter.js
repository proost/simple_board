import axios from 'axios';
const URL = 'http://127.0.0.1:8000';

export default class BoardRouter{

    getPostsAll() {
        const url = `${URL}/posts/`;
        return axios.get(url).then(response => response.data);
    }

    getPostsByURL(link) {
        const url = `${URL}/posts/?${link}`;
        return axios.get(url).then(response => response.data)
    }

    getPost(pk){
        const url = `${URL}/post/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    getPostsBySearch(searchTerm) {
        const url = `${URL}/posts/?search=${searchTerm}`;
        return axios.get(url).then(response => response.data);
    }

    deletePost(post){
        const url = `${URL}/posts/${post.pk}`;
        return axios.delete(url);
    }

    createPost(post){
        const url = `${URL}/post/`;
        return axios.post(url,post);
    }

    updatePost(post){
        const url = `${URL}/posts/${post.pk}`;
        return axios.put(url,post);
    }
}