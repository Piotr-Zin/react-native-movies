import React from 'react';
import { ScrollView, ActivityIndicator, Text, View } from 'react-native';
import MovieListItem from './MovieListItem';
import { AppConstants } from '../constants';

export default class MovieList extends React.Component {
  static noResultsElement = (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginTop: 16 }}>No results!</Text>
    </View>
  );

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return this.getMoviesByTitle(this.props.title);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.title !== this.props.title) {
      return this.getMoviesByTitle(this.props.title);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator style={{ marginTop: 16 }} animating={true} size="large" color="#2962FF" />;
    }

    if (!this.state.moviesResult) {
      return MovieList.noResultsElement;
    }

    return (
      <ScrollView>
        {this.state.moviesResult.map(movie => {
          return <MovieListItem navigation={this.props.navigation} key={movie.imdbID} movie={movie} />;
        })}
      </ScrollView>
    );
  }

  getMoviesByTitle(title) {
    return fetch(`http://www.omdbapi.com/?s=${title}&apikey=${AppConstants.apiKey}`)
      .then(response => response.json())
      .then(movies => {
        if (movies.Response) {
          this.setState({
            isLoading: false,
            moviesResult: movies.Search
          });
        }
      })
      .catch(err => console.error(err));
  }
}
