import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Picker, Image } from 'react-native';
import { addProblem } from '../actions'
import { FileSystem } from 'expo'

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos'

class ProblemEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problemName: '',
      problemGrade: null,
    }
  }

  
  componentDidMount() {
  }

  add() {
    if (this.state.problemName && this.state.problemGrade) {
      this.props.addProblem(this.state.problemName, this.state.problemGrade, this.props.navigation.getParam('picture',null))
      this.setState({ problemName: '' })
      this.props.navigation.navigate('Home')
    }
  }

  genPicker() {
    const grades = [...Array(17).keys()]
    const items = grades.map(value => <Picker.Item key={`V${value}GRADE`} label={`V${value}`} value={value} />)
    return (
      <Picker
        selectedValue={this.state.problemGrade}
        style={{ ...styles.picker }}
        onValueChange={(itemValue, itemIndex) => this.setState({ problemGrade: itemValue })}
      >
        <Picker.Item label='Select Grade' value={null} />
        {items}
      </Picker>
    )
  }


  render() {
    const { navigation } = this.props
    const fileName = navigation.getParam('picture', null)
    const uri = `${PHOTOS_DIR}/${fileName}`
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={{ uri }} style={{height: 150, width: 150}}/>
        
        <View style={styles.inputField}>
          <Text style={styles.label}>Problem Name:</Text>
          <TextInput
            style={styles.text}
            onChangeText={(problemName => this.setState({ problemName }))}
            value={this.state.problemName}
          />
        </View>
        <View style={styles.inputField}>
          {this.genPicker()}
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
    margin: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '50%',
  },
});