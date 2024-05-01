import React, { useState } from 'react'
import 'regenerator-runtime/runtime'
import axios from 'axios'

const SearchBar = () => {
	const [query, setQuery] = useState('')
	const [movies, setMovies] = useState([])

	const searchMovies = async (e) => {
		const response = await axios.get(
			`https://www.omdbapi.com/?s=${query}&apikey=61e718e9`
		)
		setMovies(response.data.Search)
	}

	const handleInputChange = (event) => {
		setQuery(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		searchMovies(query)
	}

	return (
		<div>
			Search Movie
			<form onSubmit={handleSubmit}>
				<input type="text" value={query} onChange={handleInputChange} />
				<button type="submit" onClick={handleSubmit}>
					Search
				</button>
			</form>
			<ul>
				{!movies ? (
					<div className="error">
						Invalid movie name. Please try again.
					</div>
				) : (
					movies.map((movie) => (
						<li key={movie.imdbID}>
							<h2>
								{movie.Title} ({movie.Year})
							</h2>
							<img src={movie.Poster} alt={movie.Title} />
						</li>
					))
				)}
			</ul>
		</div>
	)
}

export default SearchBar
