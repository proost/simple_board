import  React, { Component } from  'react';
import './board/board.css';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter,Route} from  'react-router-dom';
import PostList from './board/postlist/PostList';
import Post from './board/post/Post';

const Router = () => (
  <div>
    <ul>
        <li><a href="/">Posts</a></li>
        <li><a href="/post">Post</a></li>
    </ul>
    <div>
      <Route path="/posts" component={PostList} />
      <Route path="/" exact component={PostList} />
      <Route path="/post/" component={Post}/>
    </div>
  </div>
)

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    )
  }
}
