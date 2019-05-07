import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Picker } from 'react-native';
import { addProblem } from './actions'
import { Camera, Permissions } from 'expo';

class ProblemEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      problemName: '',
      problemGrade: null,
      captures: [],
      capturing: null,
      hasCameraPermission: null,
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
    }
  }

  setFlashMode = (flashMode) => this.setState({ flashMode });

  setCameraType = (cameraType) => this.setState({ cameraType });

  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing)
      this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

    this.setState({ hasCameraPermission });
  };


  add() {
    if (this.state.problemName && this.state.problemGrade) {
      this.props.addProblem(this.state.problemName, this.state.problemGrade)
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
    const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <Camera
            zoom={.3}
            ratio={'1:1'}
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={camera => this.camera = camera}
          >
            <Text>Where does this end up</Text>
          </Camera>
        </View>
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
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 100,
    width: 100,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }

});