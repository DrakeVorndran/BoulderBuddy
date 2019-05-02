import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'

import Routes from './Routes'
import RouteEditor from './RouteEditor'

const store = createStore(reducers)

class HomeScreen extends React.Component {
  render() {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Routes navigation={this.props.navigation}/>
      </View>
    )
  }
}



const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Editor: { screen: RouteEditor }
})

const MainContainer = createAppContainer(MainNavigator)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
