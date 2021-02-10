import React, { useState, useEffect } from "react";
import axios from "./../axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
	title: string;
	fetchUrl: string;
	isLargeRow?: boolean;
};

type Movie = {
	id: string;
	name: string;
	title: string;
	original_name: string;
	poster_path: string;
	backdrop_path: string;
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
	const [movies, setMovies] = useState<Movie[]>([]);

	console.log(isLargeRow);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]); //fetchUrlが変わるたびに、fetchData()を非同期で実行する

	console.log(movies);

	return(
		<div className="Row">
			<h2>{title}</h2>
			<div className="Row-posters">
				{movies.map((movie, i) => (
					<img
						key={movie.id}
						className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
						src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
						alt={movie.name}
					/>
				))}
			</div>
		</div>
	);
};