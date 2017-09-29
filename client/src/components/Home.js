import React, { Component } from 'react';
import { Header, Feed, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux'
import {getPosts, deletePost} from '../actions/posts'
import PostForm from './PostForm'

class Home extends Component {
  componentDidMount(){
    this.props.dispatch(getPosts())
  }

  feedEventsProp = () => {
    const {posts, user} = this.props
   return posts.map(p => {
     if (user.id === p.user_id){
      return {
        key: p.id,
        summary: `${p.profile.name} posted`,
        extraText: p.body,
        meta: <span><PostForm post={p} editing={true} /> 
        <span style={{cursor: 'pointer'}} onClick={ () => this.props.dispatch(deletePost(p.id)) }>
          <Icon name='remove' size='small' /></span>
        </span>
      }
    }
     else 
      return {
        key: p.id,
        summary: `${p.profile.name} posted`,
        extraText: p.body,
      }
    })
  } 

  render() {
    const {posts} = this.props
    return (
      <div>
        <div style={{textAlign: "center"}}>
        <Header as='h1' textAlign='center'>Welcome To NFL QB Private Social Media!</Header>
        <PostForm />
        <Feed events={this.feedEventsProp()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, posts: state.posts }
}

export default connect(mapStateToProps)(Home)
