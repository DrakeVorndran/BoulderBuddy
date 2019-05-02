import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

import Problems from './Problems'
import ProblemEditor from './ProblemEditor'

const store = createStore(reducers)

class HomeScreen extends React.Component {
  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Problems navigation={this.props.navigation}/>
      </View>
    )
  }
}



const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Editor: { screen: ProblemEditor }
})

const MainContainer = createAppContainer(MainNavigator)

class App extends React.Component {
  render() {
    return (
      <Provider store={store} style={styles.container}>
        <MainContainer/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
