import React, { useContext, useEffect, useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';

import MicIcon from '../assets/mic.svg';
import ImageIcon from '../assets/image.svg';
import { Context } from '../utils/ContextApi';

const SearchInput = ({ searchResult }) => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const query = queryParams.get('q') || '';

	const { searchQuery, setSearchQuery } = useContext(Context);
	useEffect(() => {
		setSearchQuery(query);
	}, [query, setSearchQuery]);

	const navigate = useNavigate();

	const searchQueryHandler = event => {
		if (event?.key === 'Enter' && searchQuery?.length > 0) {
			navigate(`/search?q=${searchQuery}&start=${1}`);
		}
	};

	const [listening, setListening] = useState(false);
	const recognitionRef = useRef(null);
	const silenceTimerRef = useRef(null);

	const startListening = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert('Speech Recognition not supported in this browser.');
			return;
		}

		recognitionRef.current = new SpeechRecognition();
		recognitionRef.current.lang = 'en-US';
		recognitionRef.current.interimResults = true;
		recognitionRef.current.continuous = true;

		recognitionRef.current.onstart = () => {
			setListening(true);
			setSearchQuery('');
		};

		recognitionRef.current.onresult = event => {
			let transcript = '';
			for (let i = event.resultIndex; i < event.results.length; i++) {
				transcript += event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					// Final text → navigate immediately
					setSearchQuery(transcript);
					navigate(`/search?q=${transcript}&start=${1}`);
					stopListening();
					return;
				}
			}
			setSearchQuery(transcript);

			// restart silence timer
			clearTimeout(silenceTimerRef.current);
			silenceTimerRef.current = setTimeout(() => {
				stopListening();
				if (transcript.trim().length > 0) {
					navigate(`/search?q=${transcript}&start=${1}`);
				}
			}, 1000); // 1 sec pause
		};

		recognitionRef.current.onend = () => {
			setListening(false);
		};

		recognitionRef.current.start();
	};

	const stopListening = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
		}
		setListening(false);
		clearTimeout(silenceTimerRef.current);
	};

	return (
		<div
			id="searchBox"
			className="h-[46px] w-full md:w-[584px] flex items-center gap-3 px-4 border border-[#dfe1e5] rounded-3xl hover:bg-white hover:shadow-c hover:border-0 focus-within:shadow-c focus-within:border-0"
		>
			<AiOutlineSearch size={18} color="#9aa0a6" />
			<input
				placeholder={listening ? '🎤 Speak now...' : 'Search...'}
				type="text"
				onChange={e => setSearchQuery(e.target.value)}
				onKeyUp={searchQueryHandler}
				value={searchQuery}
				autoFocus={!searchResult}
				className={`grow outline-0 text-black/[0.87] ${listening ? 'caret-transparent' : ''}`}
				readOnly={listening}
			/>
			<div className="flex items-center gap-3">
				{(searchQuery || listening) && (
					<IoMdClose
						size={24}
						color="#70757a"
						className="cursor-pointer"
						onClick={() => {
							stopListening();
							setSearchQuery('');
						}}
					/>
				)}

				{!listening ? (
					<img
						onClick={startListening}
						className="h-6 w-6 cursor-pointer"
						src={MicIcon}
						alt="mic"
					/>
				) : (
					<img
						onClick={stopListening}
						className="h-6 w-6 cursor-pointer"
						src={MicIcon}
						alt="stop mic"
					/>
				)}

				<img className="h-6 w-6 cursor-pointer" src={ImageIcon} alt="image" />
			</div>
		</div>
	);
};

export default SearchInput;
