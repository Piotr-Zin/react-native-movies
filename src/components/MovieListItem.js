import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';

export default class MovieListItem extends React.Component {
  render() {
    const moviePosterImage =
      this.props.movie.Poster === 'N/A' ? (
        <Image source={require('../../assets/images/noimage.png')} style={{ width: 64, height: 64 }} />
      ) : (
        <Image source={{ uri: this.props.movie.Poster, width: 64, height: 64 }} />
      );

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          this.props.navigation.navigate('MovieDetails', {
            movie: this.props.movie
          })
        }>
        <View style={styles.container}>
          {moviePosterImage}
          <Text style={styles.text}>{this.props.movie.Title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 4,
    marginBottom: 1
  },
  text: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 4,
    flex: 1
  }
});
