import React from 'react';
import SongList from './SongList';

const Library = ({ songs, setCurrentSong, setIsPlaying, audioRef, setSongs, libraryOpen }) => {
	return (
		<div className={`library ${libraryOpen ? 'library-open' : ''}`}>
			<h2>Library</h2>
			<div className={`library-songs`}>
				{songs.map((song) => (
					<SongList
						key={song.id}
						setCurrentSong={setCurrentSong}
						song={song}
						songs={songs}
						setIsPlaying={setIsPlaying}
						audioRef={audioRef}
						setSongs={setSongs}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
