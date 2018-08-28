import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { AppConstants } from '../constants';

export default class UserDetails extends Component {
  static navigationOptions = {
    title: 'Movie Details'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return this.getMovieDetails();
  }

  render() {
    const { navigation } = this.props;
    const movie = navigation.getParam('movie', '[null]');

    if (this.state.isLoading) {
      return <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#2962FF" />;
    }

    const moviePosterImage =
      movie.Poster === 'N/A' ? (
        <Image source={require('../../assets/images/noimage.png')} style={{ width: '100%', height: 400 }} />
      ) : (
        <Image source={{ uri: movie.Poster, width: '100%', height: 600 }} />
      );

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.moviePoster}>{moviePosterImage}</View>
        <View style={styles.details}>
          <Text style={styles.title}>Title: {movie.Title}</Text>
          <Text style={styles.info}>Cast: {this.state.movieDetails.Actors}</Text>
          <Text style={styles.info}>Director: {this.state.movieDetails.Director}</Text>
          <Text style={styles.info}>Release date: {this.state.movieDetails.Released}</Text>
          <Text style={styles.info}>Length: {this.state.movieDetails.Runtime}</Text>
          <Text style={styles.info}>Country: {this.state.movieDetails.Country}</Text>
          <Text style={styles.info}>Language: {this.state.movieDetails.Language}</Text>
          <Text style={styles.info}>Plot:</Text>
          <Text style={styles.paragraph}>{this.state.movieDetails.Plot}</Text>
        </View>
      </ScrollView>
    );
  }

  getMovieDetails() {
    const movie = this.props.navigation.getParam('movie', '[null]');
    return fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${AppConstants.apiKey}`)
      .then(response => response.json())
      .then(movieDetails => {
        if (movieDetails.Response) {
          this.setState({
            isLoading: false,
            movieDetails: movieDetails
          });
        }
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 4
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  info: {
    fontSize: 16,
    padding: 2
  },

  paragraph: {
    fontSize: 14,
    color: '#373737',
    marginLeft: 4,
    marginRight: 4
  },

  moviePoster: {
    marginTop: 4,
    marginBottom: 4
  },

  details: {}
});
