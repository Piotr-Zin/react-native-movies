import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';

import MovieList from './MovieList';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View>
          <View style={{ height: StatusBar.currentHeight, backgroundColor: '#2962FF' }} />
          <SearchBar
            ref={searchBar => (this.searchBar = searchBar)}
            round
            lightTheme
            containerStyle={{
              backgroundColor: '#2962FF',
              borderBottomWidth: 0,
              borderTopWidth: 0
            }}
            inputStyle={{ backgroundColor: '#F8F8F8' }}
            searchIcon={{ size: 24, color: '#FFF' }}
            placeholder="Search movie title..."
            onSubmitEditing={event => navigation.state.params.setSearchTitle(event.nativeEvent.text)}
          />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTitle: 'Star Wars'
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      setSearchTitle: this.setSearchTitle
    });
  }

  render() {
    return (
      <View>
        <MovieList navigation={this.props.navigation} title={this.state.searchTitle} />
      </View>
    );
  }

  setSearchTitle = text => {
    this.setState({
      searchTitle: text
    });
  };
}
