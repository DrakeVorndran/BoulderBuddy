import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, } from 'react-native'
import { Camera, Permissions, FileSystem } from 'expo'
import { Feather as Icon } from 'react-native-vector-icons'
class RoutePicture extends Component {
  constructor(props) {
    super(props)

    this.state = {
      captures: [],
      capturing: null,
      hasCameraPermission: null,
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
      willTake: true,
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
    });
    const camera = await Permissions.askAsync(Permissions.CAMERA)
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted')

    this.setState({ hasCameraPermission })
  }

  takePicture = () => {
    if (this.camera) {
      this.setState({ willTake: false })
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved })
    }
  }

  onPictureSaved = async photo => {
    const title = `${Date.now()}.jpg`
    this.setState({willTake: true})
    this.props.navigation.navigate('Editor', { picture: title })
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/${title}`,
    })
    this.setState({ newPhotos: true })
  }

  render() {
    const { height, width } = Dimensions.get('window')
    const { hasCameraPermission, flashMode, cameraType, capturing, captures, willTake } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>
    }
    return (

      <View style={styles.container}>
        <Camera
          type={cameraType}
          ratio='1:1'
          flashMode={flashMode}
          style={{ ...styles.preview, height: width - 30, width: width - 30 }}
          ref={camera => this.camera = camera}
        >

        </Camera>
        {willTake?
        <TouchableOpacity onPress={e => this.takePicture()}>
          <View style={styles.capture}>
            <Icon name="aperture" size={100} color="#000" />
          </View>
        </TouchableOpacity>
        :
        <Text style={styles.loading}>Loading</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    margin: 20,
  },
  loading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
})

export default RoutePicture