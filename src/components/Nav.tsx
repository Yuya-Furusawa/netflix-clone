import React, { useState, useEffect } from "react";
import "./Nav.css";

export const Nav = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleShow = () => {
			if (window.scrollY > 100) {
				setShow(true);
			} else {
				setShow(false);
			}
		};

		//scrollされるたびにhandleShowを実行する
		//最初にレンダリングされた時にこの仕掛けを仕込んでおく
		window.addEventListener("scroll", handleShow);
		return () => {
			//クリーンアップ関数
			window.removeEventListener("scroll", handleShow);
		};
	}, []);

	return (
		<div className={`Nav ${show && "Nav-black"}`}>
			<img
				className="Nav-logo"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
				alt="Netflix logo"
			/>
			<img
				className="Nav-avater"
				src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
				alt="Avatar"
			/>
		</div>
	);
};