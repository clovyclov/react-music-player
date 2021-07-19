import React, { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import { FaBeer, FaPlay } from 'react-icons/fa';
import './styles/app.scss';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
	const [ songs, setSongs ] = useState(data());
	const [ currentSong, setCurrentSong ] = useState(songs[0]);
	const [ currentTime, setCurrentTime ] = useState(0);
	const [ isPlaying, setIsPlaying ] = useState(false);
	const [ libraryOpen, setLibraryOpen ] = useState(false);
	const [ songInfo, setSongInfo ] = useState({
		currentTime: 0,
		duration: 0
	});
	const audioRef = useRef(1);

	return (
		<div className={`App ${libraryOpen ? 'library-active' : ''}`}>
			<Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				songs={songs}
				setSongs={setSongs}
			/>
			<Library
				songs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				setIsPlaying={setIsPlaying}
				audioRef={audioRef}
				libraryOpen={libraryOpen}
			/>
		</div>
	);
}

export default App;
