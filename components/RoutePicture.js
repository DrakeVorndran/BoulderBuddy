import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, } from 'react-native'
import { Camera, Permissions, FileSystem } from 'expo'
import { Feather as Icon } from 'react-native-vector-icons'
class RoutePicture extends Component {
  constructor(props) {
    super(props)
    console.log(FileSystem.documentDirectory)

    this.state = {
      captures: [],
      capturing: null,
      hasCameraPermission: null,
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
    }
  }

  

  setFlashMode = (flashMode) => this.setState({ flashMode })

  setCameraType = (cameraType) => this.setState({ cameraType })

  handleCaptureIn = () => this.setState({ capturing: true })

  handleCaptureOut = () => {
    if (this.state.capturing)
      this.camera.stopRecording()
  }

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync()
    this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
  }

  async componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
    const camera = await Permissions.askAsync(Permissions.CAMERA)
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted')

    this.setState({ hasCameraPermission })
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved })
    }
  }

  onPictureSaved = async photo => {
    const title = `${Date.now()}.jpg`
    console.log(`${FileSystem.documentDirectory}photos/${title}`)
    this.props.navigation.navigate('Editor', {picture:title})
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${title}`,
    })
    this.setState({ newPhotos: true })
  }

  render() {
    const { height, width } = Dimensions.get('window')
    const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>
    }
    return (
      <View>
        <Camera
          type={cameraType}
          flashMode={flashMode}
          style={{ ...styles.preview, height: height - 80, width }}
          ref={camera => this.camera = camera}
        >
          <TouchableOpacity onPress={e => this.takePicture()}>
            <View style={styles.capture}>
              <Icon name="aperture" size={100} color="#FFF"/>
            </View>
          </TouchableOpacity>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    margin: 20,
  }
})

export default RoutePicture