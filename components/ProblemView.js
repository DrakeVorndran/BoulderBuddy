import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'
import { FileSystem } from 'expo'
import { connect } from 'react-redux'

import { updateProblem, finishProblem } from '../actions'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos'


class ProblemView extends Component {

  constructor(props) {
    super(props)
    this.index = this.props.navigation.getParam('index', null)
  }

  attempt() {
    this.props.updateProblem(this.index)
  }

  finish() {
    this.props.finishProblem(this.index)
  }

  render() {
    const problem = this.props.problems[this.index]
    const uri = `${PHOTOS_DIR}/${problem.image}`
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.image} />

        <Text style={styles.name}>{problem.name}</Text>
        <Text style={styles.attempts}>Attempts: {problem.attempts}</Text>
        {problem.finished ? <Text>Sent It</Text> : <Text>Still Trying</Text>}
        <Button styles={styles.button}
          onPress={e => this.attempt()}
          title="1 Attempt"
        />
        <Button styles={styles.button}
          onPress={e => this.finish()}
          title="Sent it!"
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems
  }
}

const mapDispatchToProps = () => {
  return {
    updateProblem,
    finishProblem
  }

}

export default connect(mapStateToProps, mapDispatchToProps())(ProblemView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {

  },
  image: {
    height: 100,
    width: 100
  },
  name: {
    fontSize: 25
  },
  attempts: {
    fontSize: 20
  }
})