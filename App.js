import React from 'react';
import HomeScreen from './src/components/HomeScreen';
import MovieDetails from './src/components/MovieDetails';
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    MovieDetails: { screen: MovieDetails }
  },
  {
    initialRouteName: 'Home',

    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2962FF'
      },
      headerTintColor: '#FFF'
    }
  }
);
