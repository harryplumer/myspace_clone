import React from 'react'
import { connect } from 'react-redux';
import {Modal, Form, Button, Icon} from 'semantic-ui-react'
import {updatePost, addPost} from '../actions/posts'

class PostForm extends React.Component{

  state = {post: {body: ""}, editing: false, modalOpen: false}

  handleChange = (e) => {
    const newBody = e.target.value
    this.setState({ post: {...this.state.post, body: newBody }})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    const {post, editing} = this.state
    if (!editing)
      dispatch(addPost(post))    
    else
      dispatch(updatePost(post))
    this.setState({post: {name: ""}, modalOpen: false})
  }

  handleOpen = () => {
    const {editing, post} = this.props
    if (editing)
      this.setState({post, editing})
    
    this.setState({ modalOpen: true })
  }

  render(){
    const {post} = this.state 
    const {editing} = this.props
    return(
      <Modal
      trigger={editing ?  <span style={{cursor: 'pointer'}} onClick={this.handleOpen}>
              <Icon name='edit' size='small' />
              </span> :
      <Button primary onClick={this.handleOpen}>Add Post!</Button>  }
      open={this.state.modalOpen}
      >
        <Modal.Header>
          {editing ? "Edit Post" : "Add Post"}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.TextArea 
              label="body"
              value={post.body}
              onChange={this.handleChange}
              width={16}
              placeholder="What's On Your Mind?"
            />
            <Form.Button color='green' inverted>
              {editing ? "Save" : "Submit"}
            </Form.Button>
          </Form>
          <Button color='red' inverted onClick={() => {this.setState({modalOpen: false})}}>
            Cancel
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}


export default connect()(PostForm)