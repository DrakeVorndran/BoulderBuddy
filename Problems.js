import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { addProblem } from './actions'

import Problem from './Problem'

class Problems extends React.Component {
  constructor(props) {
    super(props)
  }

  showItems({item, index}) {
    return (
      <Problem problem={item} />
    )
  }

  showProblems() {
    return (
      <FlatList 
        style={styles.list}
        data={this.props.problems}
        renderItem={this.showItems}
        keyExtractor={(problem, i) => problem.name+i}
      />
      )
  }

  render() {
    return(
      <View style={styles.container}>
        {this.showProblems()}
        <Button 
          title="Add Problem"
          onPress={e => this.props.navigation.navigate('Editor')}
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
    addProblem
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Problems)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',    
  }
});