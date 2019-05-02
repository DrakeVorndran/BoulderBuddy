import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux'
import { addRoute } from './actions'

class Routes extends React.Component {
  constructor(props) {
    super(props)
  }

  addProblem() {
    this.props.addRoute("Random name", "V2")
    console.log(this.props.routes)
  }

  showProblems() {
    return this.props.routes.map(route => <Text>{route.name}</Text>)
  }

  render() {
    return(
      <View>
        <Text>Hello</Text>
        {this.showProblems()}
        <Button 
          title="Add Route"
          onPress={e => this.props.navigation.navigate('Editor')}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    routes: state.routes
  }
}

const mapDispatchToProps = () => {
  return {
    addRoute
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Routes)
