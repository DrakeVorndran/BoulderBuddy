import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Problem = function (props) {
  console.log(props.problem)
  const { name, grade } = props.problem
  const {height, width} = Dimensions.get('window')
  return (
    <View style={{...styles.container, width: width*.9 , height: height/6}}>
      <Text style={styles.title}>{name}, {"V"+grade}</Text>
    </View>
  )
}

export default Problem

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#BBB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,

  }
})