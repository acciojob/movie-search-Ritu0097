import React, { useState } from 'react'
import './App.css'

function MovieSearch() {
	const [searchInput, setSearchInput] = useState('')
	const [movies, setMovies] = useState([])
	const [errorMessage, setErrorMessage] = useState('')

	const apiKey = '99eb9fd1'

	const handleSearchInput = (event) => {
		setSearchInput(event.target.value)
	}

	const searchMovies = () => {
		setMovies([])
		setErrorMessage('')

		if (!searchInput.trim()) {
			setErrorMessage('Please enter a movie title.')
			return
		}

		fetch(
			`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
				searchInput
			)}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.Response === 'True') {
					setMovies(data.Search)
				} else {
					setErrorMessage('Invalid movie name. Please try again.')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
				setErrorMessage('An error occurred. Please try again later.')
			})
	}
	return (
		<div className="container">
			<h1>Movie Search</h1>
			<input
				type="text"
				value={searchInput}
				onChange={handleSearchInput}
				placeholder="Enter movie title"
			/>
			<button onClick={searchMovies}>Search</button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			<div className="movie-list">
				{movies.map((movie) => (
					<div className="movie" key={movie.imdbID}>
                        <li>
						<h2><li>{`${movie.Title} (${movie.Year})`}</li></h2>
                        </li>
						<img
							src={
								movie.Poster !== 'N/A'
									? movie.Poster
									: 'https://via.placeholder.com/150'
							}
							alt={movie.Title}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default MovieSearch
