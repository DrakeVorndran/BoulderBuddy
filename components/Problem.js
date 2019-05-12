import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight } from 'react-native';
import { FileSystem } from 'expo'


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos'



const Problem = function (props) {
  const { name, grade, image, attempts } = props.problem
  const { height, width } = Dimensions.get('window')
  const uri = `${PHOTOS_DIR}/${image}`
  const index = props.index
  return (
    <TouchableHighlight onPress={e => props.navigation.navigate('Problem', { index: index })}>
      <View style={{ ...styles.container, width: width * .9, height: height / 6 }}>
        <Image source={{ uri }} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.title}>{name}, {"V" + grade}</Text>
          <Text>Attempts: {attempts}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default Problem

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#BBB',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
  },
  image: {
    height: 50,
    width: 50,
  },
  text: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',

  }
})