// eslint-disable-next-line
import React, { Component } from 'react';

export default class PostSearcher extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
    };

    handleTextChange(e){
        let self = this;
        self.setState({
            searchTerm: e.target.value
        });
    };

    handleSubmit(e){
        let self = this;
        // eslint-disable-next-line
        if (e.keyCode == 13 || e.type == "click") {
            self.props.onPostSearch(self.state.searchTerm);
        };
    }

    handleClear(e){
        let self = this;
        // eslint-disable-next-line
        self.setState({ searchTerm: '' });
        self.props.onPostSearch(self.state.searchTerm);
    }

    render(){
        return(
        <div class="ui action input" id="noteSearch">
            <input type="text" 
                placeholder="Search..." 
                onChange={this.handleTextChange}
                onKeyDown={this.handleSubmit}
            />
            <button class="ui button" onClick={this.handleSubmit}>
                Search
            </button>
            <button class="ui button" onClick={this.handleClear} >
                Double Click : Reload all
            </button>
        </div>
        );
    }


}
