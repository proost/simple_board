import React, { Component } from 'react';
import BoardRouter from '../BoardRouter';
import './main.css';
import './util.css';

const boardRouter = new BoardRouter();

export default class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            contents : '',
            author: ''
        }
        this.handlePostAdd = this.handlePostAdd.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleContentsChange = this.handleContentsChange.bind(this);
    }

    handleAuthorChange(e){
        let self = this;
        self.setState({
            author: e.target.value
        })
    }

    handleContentsChange(e){
        let self = this;
        self.setState({
            contents: e.target.value
        })
    }

    handlePostAdd(e){
        let self = this;
        boardRouter.createPost({
            "author": this.state.author,
            "contents": this.state.contents
        }).then( (response) => {
                alert("Success!!");
                self.setState({ 
                    author: '',
                    contents: ''
                });
            }).catch( () => {
                alert("There was an error!!!");
            });
    };

    render(){
        return (
            <div class="container-contact100">
                <div class="wrap-contact100">
                    <form class="contact100-form validate-form">
                        <span class="contact100-form-title">
                            Create New Post
                        </span>
                        <div class="wrap-input100 validate-input">
                            <input  class="input100" type="text" placeholder="Author" onChange={this.handleAuthorChange}></input>
                            <span class="focus-input100"></span>
                        </div>
        
                        <div class="wrap-input100 validate-input" data-validate = "Message is required">
                            <textarea class="input100" name="message" placeholder="Enter your Message" onChange={this.handleContentsChange}></textarea>
                            <span class="focus-input100"></span>
                        </div>
        
                        <div class="container-contact100-form-btn">
                            <button class="contact100-form-btn" onClick={this.handlePostAdd}>
                                Submit Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}