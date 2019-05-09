import React, { Component } from 'react' 
import { StyleSheet, View, Text, Button } from 'react-native' 
import { connect } from 'react-redux'

import { updateProblem } from '../actions'
import { State } from 'react-native-gesture-handler';


class ProblemView extends Component {

  constructor(props) {
    super(props)
    this.index = this.props.navigation.getParam('index', null)
  }

  attempt() {
    this.props.updateProblem(this.index)
  }

  render() {
    const problem = this.props.problems[this.index]
    return(
      <View>
        <Text>{problem.name}</Text>
        <Text>{problem.attempts}</Text>
        <Button
          onPress={e => this.attempt()}
          title="1 Attempt"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    problems: state.problems
  }
}

const mapDispatchToProps = () => {
  return{
    updateProblem
  }

}

export default connect(mapStateToProps, mapDispatchToProps())(ProblemView)

const styles = StyleSheet.create({

})