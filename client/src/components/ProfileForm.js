import React from 'react'
import {connect} from 'react-redux'
import {Form, Container, Grid, Header} from 'semantic-ui-react'
import {addProfile, updateProfile} from '../actions/profiles'
import Dropzone from 'react-dropzone'

class ProfileForm extends React.Component{
  state = {profile: {name: "", dob: "", city: "", state: "", country: "", gender: "", file: ""}, 
          month: "", day: "", year: "", editing: false}

  componentDidMount(){
  if (this.props.editing){
    let {profile} = this.props 
    let dateStr = profile.dob.split("-")
      let year = dateStr[0]
      let month = dateStr[1]
      let day = dateStr[2]
      this.setState({profile: this.props.profile, editing: true, year, month, day, })
    }
  }
  
  handleChange = (propertyName) => (event) => {
    if (propertyName === "day" || propertyName === "month" || propertyName === "year")
      this.setState({[propertyName]: event.target.value})
    else {
      const {profile}  = this.state
      const newProfile = {
        ...profile,
        [propertyName]: event.target.value
      }
      this.setState({ profile: newProfile })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = new FormData()
    const {dispatch} = this.props
    let {profile} = this.state
    const {year, month, day, editing} = this.state    
    profile.dob = `${year}-${month}-${day}`
    const {name, city, state, country, gender, file, dob} = profile
    
    data.append('name', name)
    data.append('city', city)
    data.append('state', state)
    data.append('country', country)
    data.append('gender', gender)
    data.append('dob', dob)
    if (file)
      data.append('avatar', file)

    debugger

    if (!editing)
      dispatch(addProfile(data))
    else
      dispatch(updateProfile(profile.id, data))   
    
    this.setState({profile: {name: "", dob: "", city: "", state: "", country: "", gender: ""}, 
                    month: "", day: "", year: "", editing: false})

    this.props.history.push('/')
  }

  onDrop = (files) => {
    const {profile} = this.state 
    const newProfile = {
      ...profile,
      file: files[0]
    };
    this.setState({ profile: newProfile })
  }

  render(){
    const {editing, profile, month, day, year} = this.state
    return(
      <Container>
        <Grid>
          <Header as="h2">{editing ? "Edit Your Profile!" : "Create Your Profile!"}</Header>
          <Grid.Column width={16}>
            <Form onSubmit={this.handleSubmit}>  
              <Form.Group>
                <Form.Input
                  required
                  label="Name"
                  value={profile.name}
                  onChange={this.handleChange("name")}
                  width={8}
                />
                <Form.Input
                  required
                  label="Month"
                  value={month}
                  onChange={this.handleChange("month")}
                  width={2}
                />
                <Form.Input
                required
                  label="Day"
                  value={day}
                  onChange={this.handleChange("day")}
                  width={2}
                />
                <Form.Input
                required
                  label="Year"
                  value={year}
                  onChange={this.handleChange("year")}
                  width={2}
                />
                <Form.Input
                  label="Gender"
                  value={profile.gender}
                  onChange={this.handleChange("gender")}
                  width={2}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                    label="City"
                    value={profile.city}
                    onChange={this.handleChange("city")}
                    width={10}
                />
                <Form.Input
                    label="State"
                    value={profile.state}
                    onChange={this.handleChange("state")}
                    width={2}
                />
                <Form.Input
                    required
                    label="Country"
                    value={profile.country}
                    onChange={this.handleChange("country")}
                    width={2}
                />
              </Form.Group>
              <Dropzone
                style = {{
                  marginBottom: '10px',
                  border: 'dashed 1px black',
                  width: '100%',
                  height: '50px',
                  textAlign: 'center'
                }}
                onDrop={this.onDrop}
                multiple={false}
              >
                Add an avatar here!
              </Dropzone>
              <Form.Button color='green' inverted>
                {editing ? "Save" : "Submit"}
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default connect()(ProfileForm)






