import React from 'react';

const SongList = ({ song, songs, setCurrentSong, setIsPlaying, audioRef, setSongs }) => {
	const newSongs = songs.map((tune) => {
		if (song.id === tune.id) {
			return {
				...tune,
				active: true
			};
		} else {
			return {
				...tune,
				active: false
			};
		}
	});

	return (
		<div
			className={`song ${song.active ? 'selected' : ''}`}
			id={song.id}
			onClick={async () => {
				setIsPlaying(false);
				await setCurrentSong(song);
				audioRef.current.play();
				setIsPlaying(true);
				setSongs(newSongs);
			}}
		>
			<img src={song.cover} alt="" />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default SongList;
