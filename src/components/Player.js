import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft, FaPlay, FaPause, FaGift } from 'react-icons/fa';

const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
	setSongs
}) => {
	useEffect(
		() => {
			const newSongs = songs.map((song) => {
				if (song.id === currentSong.id) {
					return {
						...song,
						active: true
					};
				} else {
					return {
						...song,
						active: false
					};
				}
			});
			setSongs(newSongs);
		},
		[ currentSong ]
	);
	const [ playerTime, setPlayerTime ] = useState(0);
	//Event handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({
			...songInfo,
			currentTime: current,
			duration: duration
		});
	};
	const getTime = (time) => {
		return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
	};
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const skipTrackHandler = (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-back') {
			currentIndex--;
			setCurrentSong(songs[currentIndex]);
			if (songs[currentIndex] === undefined) {
				setCurrentSong(songs[songs.length - 1]);
			}
			setIsPlaying(false);
		} else {
			currentIndex++;
			setCurrentSong(songs[currentIndex]);
			if (songs[currentIndex] === undefined) {
				setCurrentSong(songs[0]);
			}

			setIsPlaying(false);
		}
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					onChange={dragHandler}
					type="range"
				/>
				<p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
			</div>
			<div className="play-control">
				<FaAngleLeft onClick={() => skipTrackHandler('skip-back')} />
				{isPlaying ? <FaPause onClick={playSongHandler} /> : <FaPlay onClick={playSongHandler} />}
				<FaAngleRight onClick={() => skipTrackHandler('skip-forward')} />
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			/>
		</div>
	);
};

export default Player;
