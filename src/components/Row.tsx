import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import axios from "./../axios";
import { API_KEY } from "./../apikey";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

// API_KEYの取得
require('dotenv').config();
const API_KEY = process.env.API_KEY;

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

type Option = {
	height: string;
	width: string;
	playerVars: {
		autoplay: 0 | 1 | undefined;
	};
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [trailerUrl, setTrailerUrl] = useState<string | null>("");

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]); //fetchUrlが変わるたびに、fetchData()を非同期で実行する

	const opts: Option = {
		height: "390",
		width: "640",
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = async (movie: Movie) => {
		if (trailerUrl) {
			setTrailerUrl(""); //画面にすでに表示されているときは`trailerUrl`を空にする
		} else {
			let trailerurl = await axios.get(
				`/tv/${movie.id}/videos?api_key=${API_KEY}`
			);
			setTrailerUrl(trailerurl.data.results[0]?.key);
		}
	};

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
						onClick={() => handleClick(movie)}
					/>
				))}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};