import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); 
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          console.log(response, 'get response');
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    const movieToSave = movieList.find((movie) => movie.id === id);
    if(saved.some((movie) => movie.id === id)){
      return undefined;
    }
    setSaved([...saved, movieToSave]);
  };

  return (
    <div>
      <SavedList list={saved} />
      <Route exact path='/'>
        <MovieList movies={movieList}/>
      </Route>
      <Route path='/movies/:id'>
        <Movie movies={movieList} addToSavedList={addToSavedList}/>
      </Route>
    </div>
  );
}
