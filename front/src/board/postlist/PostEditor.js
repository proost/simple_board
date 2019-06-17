import React, { Component } from 'react';
import {FormOnSubmitAuthor,ButtonAuthorToggle} from './Author';

export default class PostEditor extends Component {

    constructor(props){
        super(props);
        this.state = {
            contents: '',
            author: '',
            isAuthorChange: true
        };
        this.setAuthor = this.setAuthor.bind(this);
        this.hadleTextChange = this.hadleTextChange.bind(this);
        this.handlePostUpdate = this.handlePostUpdate.bind(this);
        this.handlePostDelete = this.handlePostDelete.bind(this);
        this.handleEditCancle = this.handleEditCancle.bind(this);
    };

    setAuthor(newAuthor){
        let self = this;
        self.setState({
            author: newAuthor,
            isAuthorChange: !this.state.isAuthorChange
        });
    };

    hadleTextChange(e) {
        let self = this;
        self.setState({
            contents: e.target.value
        })
    };

    handlePostUpdate(e) {
        let self = this;
        if(self.state.contents.length) {
            let newPost = {
                pk : self.props.post.pk,
                contents: self.state.contents,
                author: self.state.author,
            };
            self.props.onPostUpdate(newPost);
        };
    };

    handlePostDelete(e){
        let self = this;
        self.props.onPostDelete(self.props.post);
    }

    handleEditCancle(e){
        let self = this;
        self.props.onEditCancle();
    }

    render(){
        if (this.props.isModify) {
            return(
                <div className="notes-app">
                    <FormOnSubmitAuthor onAuthorSet={this.setAuthor} isAuthorChange={this.state.isAuthorChange} ></FormOnSubmitAuthor>
                    <ButtonAuthorToggle isAuthorChange={this.state.isAuthorChange} author={this.state.author} onAuthorSet={this.setAuthor} ></ButtonAuthorToggle>
                    <h2 className="app-header">Posts App</h2>
                <div className="note-editor">
                    <textarea
                        className="textarea"
                        placeholder="Enter your post here..."
                        rows={5}
                        onChange={this.hadleTextChange}>
                        {this.props.post.contents}
                    </textarea>
                    <div className="controls">
                        <label className="radio-custom-label">Last Author:{this.props.post.author}</label>
                        <button className="add-button" onClick={this.handlePostUpdate}>Update</button>
                        <button className="add-button" onClick={this.handlePostDelete}>Delete</button>
                        <button className="add-button" onClick={this.handleEditCancle}>Cancle</button>
                    </div>
                </div>
            </div>
            );
        }
        else {
            return null;
        }
    };
}
