import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import { addProblem } from './actions'

class ProblemEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problemName: ''
    }
  }

  add() {
    this.props.addProblem(this.state.problemName, 'V2')
    this.setState({ problemName: '' })
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputField}>
          <Text style={styles.label}>Problem Name:</Text>
          <TextInput
            style={styles.text}
            onChangeText={(problemName => this.setState({ problemName }))}
            value={this.state.problemName}
          />
        </View>
        <Button
          title='Add Problem'
          onPress={e => this.add()}
        />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = () => {
  return {
    addProblem
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(ProblemEditor)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',
    backgroundColor: '#F00',
    margin: 'auto',
  },
  text: {
    width: '50%',
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    margin: 10,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '20%',
    backgroundColor: '#0F0'
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  }

});