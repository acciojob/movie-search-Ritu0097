// MovieSearch.js
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

		// If search input is empty, show error message
		if (!searchInput.trim()) {
			setErrorMessage('Please enter a movie title.')
			return
		}

		// Fetch data from OMDb API
		fetch(
			`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
				searchInput
			)}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.Response === 'True') {
					// Display search results
					setMovies(data.Search)
				} else {
					// Show error message for invalid search
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
						<h2>{`${movie.Title} (${movie.Year})`}</h2>
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
