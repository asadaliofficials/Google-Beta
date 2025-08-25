import React, { useContext, useEffect, useState } from 'react';
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

	// const { query } = useParams();

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

	function handleMikeClick() {
		setSearchQuery('');
		setListening(true);
	}
	return (
		<div
			id="searchBox"
			className="h-[46px] w-full md:w-[584px] flex items-center gap-3 px-4 border border-[#dfe1e5] rounded-3xl hover:bg-white hover:shadow-c hover:border-0 focus-within:shadow-c focus-within:border-0"
		>
			<AiOutlineSearch size={18} color="#9aa0a6" />
			<input
				placeholder={listening ? 'speak now...' : 'Search...'}
				type="text"
				onChange={e => setSearchQuery(e.target.value)}
				onKeyUp={searchQueryHandler}
				value={searchQuery}
				autoFocus={!searchResult}
				className={`grow outline-0 text-black/[0.87] ${listening ? 'caret-transparent' : ''}`}
			/>
			<div className="flex items-center gap-3">
				{searchQuery && (
					<IoMdClose
						size={24}
						color="#70757a"
						className="cursor-pointer"
						onClick={() => {
							setSearchQuery(''), setListening(false);
						}}
					/>
				)}
				<img onClick={handleMikeClick} className="h-6 w-6 cursor-pointer" src={MicIcon} alt="" />
				<img className="h-6 w-6 cursor-pointer" src={ImageIcon} alt="" />
			</div>
		</div>
	);
};

export default SearchInput;
