import React from 'react';
import { FaMusic } from 'react-icons/fa';

const Nav = ({ libraryOpen, setLibraryOpen }) => {
	return (
		<nav>
			<h1>Waves</h1>
			<button onClick={() => setLibraryOpen(!libraryOpen)}>
				Library <FaMusic />
			</button>
		</nav>
	);
};

export default Nav;
