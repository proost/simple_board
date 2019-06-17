import React, { Component } from 'react';
import BoardRouter from '../BoardRouter';
import PostEditor from './PostEditor';
import './postlist.css';
import PostSearcher from './PostSearcher';

const boardRouter = new BoardRouter();

export default class PostList extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts : [],
            isModify: false,
            targetPost: {},
            nextLink: '',
            prevLink: ''
        };
        this.handleModify = this.handleModify.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.cancleEdit = this.cancleEdit.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
    };

    componentDidMount(){
        let self  =  this;
        boardRouter.getPostsAll()
            .then( (response) => {
                self.setState({ 
                    posts: response.data,
                    nextLink: response.nextLink,
                    prevLink: response.prevLink
                });
        });
    };

    handleModify(e,post){
        let self = this;
        self.setState({
            isModify: !self.state.isModify,
            targetPost: post
        })
    }

    updatePost(updatedPost){
        let self = this;
        boardRouter.updatePost({
            "pk": updatedPost.pk,
            "contents": updatedPost.contents,
            "author": updatedPost.author
        }).then( (response) => {
            alert("Post updated!");
            let newPosts = self.state.posts.filter( post => post.pk !== updatedPost.pk);
            newPosts.unshift(response.data);
            self.setState({
                isModify: !self.state.isModify,
                posts: newPosts
            });
        }).catch(() => {
            alert("There was an error!");
        });
    }

    deletePost(tartgetPost){
        let self = this;
        boardRouter.deletePost(tartgetPost)
            .then( (response) => {
                alert("Post deleted!");
                let newPosts = self.state.posts.filter( post => post.pk !== tartgetPost.pk)
                self.setState({
                    isModify: !self.state.isModify,
                    posts: newPosts
                });
            }).catch(() => {
                alert("There was an error!");
            });
    }

    cancleEdit(){
        let self = this;
        self.setState({
            isModify: !self.state.isModify
        })
    }

    searchPost(searchWord){
        let self = this;
        if (searchWord) {
            boardRouter.getPostsBySearch(searchWord)
                .then( (response) => (
                    self.setState({ posts: response.data })
                ))
        }
        else {
            boardRouter.getPostsAll()
            .then( (response) => {
                self.setState({ posts: response.data });
        });
        }
    }

    handlePreviousPage(e){
        let self = this;
        boardRouter.getPostsByURL(self.state.prevLink)
            .then( (response) => {self.setState({ 
                posts: response.data,
                nextLink: response.nextLink,
                prevLink: response.prevLink
            })}
            );
    }

    handleNextPage(e){
        let self = this;
        boardRouter.getPostsByURL(self.state.nextLink)
            .then( (response) => { 
                self.setState({
                posts: response.data,
                nextLink: response.nextLink,
                prevLink: response.prevLink
            })}
            );
    }

    render(){
        return (
            <div>
                <PostEditor 
                    onPostUpdate={this.updatePost} 
                    onPostDelete={this.deletePost}  
                    onEditCancle={this.cancleEdit} 
                    post={this.state.targetPost} 
                    isModify={this.state.isModify} >
                </PostEditor>
                <PostSearcher onPostSearch={this.searchPost}></PostSearcher>
                <div className="timeline-container">
                    {this.state.posts.map( post => (
                        <div className="timeline-item">
                        <div className="timeline-item-content">
                            <time>Created: {post.date_of_created.split('T')[0]}</time>
                            <time>Modified: {post.date_of_modified.split('T')[0]}</time>
                            <p>{post.contents}</p>
                                <button  onClick={(e) => this.handleModify(e,post)}>
                                    Modify
                                </button>
                            <span className="circle" />
                        </div>
                    </div>
                    ))
                }
                </div>
                <div class="page-button">
                    <button class="ui icon left labeled button" onClick={this.handlePreviousPage}>
                        <i aria-hidden="true" class="left arrow icon"></i>
                        Previous Page
                    </button>
                    <button class="ui icon right labeled button">
                        Next Page
                        <i aria-hidden="true" class="right arrow icon" onClick={this.handleNextPage}></i>
                    </button>
                </div>
            </div>
        );
    };
}