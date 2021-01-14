import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Route, NavLink } from "react-router-dom";
import axios from 'axios';

export default function Movie(props) {
  console.log(props, 'movie props')
  const addToSavedList = props.addToSavedList;
  const [movie, setMovie] = useState();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`) 
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button" onClick={() => addToSavedList(movie.id)}>Save</div>
    </div>
  );
}
