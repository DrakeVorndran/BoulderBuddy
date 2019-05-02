import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { addRoute } from './actions'

class RouteEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      routeName: ''
    }
  }

  render(){
    return (
      <View>
        <Text>Route Name:</Text>
        <TextInput 
          style={{borderWidth: 1, borderColor: 'blue'}}
          onChangeText={(routeName => this.setState({routeName}))}
          value={this.state.routeName}
        />
        <Button 
          title='Add Route'
          onPress={e => this.props.addRoute(this.state.routeName, 'V2')}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
    addRoute
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(RouteEditor)