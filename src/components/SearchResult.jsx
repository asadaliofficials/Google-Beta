import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchDataFromApi } from '../utils/api';
import SearchResultHeader from './SearchResultHeader';
import Footer from './Footer';
import SearchedItemTemplate from './SearchedItemTemplate';
import SearchedImageItemTemplate from './SearchedImageItemTemplate';
import Pagination from './Pagination';
import { Context } from '../utils/ContextApi';

const useQueryParams = () => {
	console.log('searchresultpage rendeing');
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
};

const SearchResult = () => {
	const [result, setResult] = useState(null);
	const { imageSearch } = useContext(Context);

	const queryParams = useQueryParams();
	const query = queryParams.get('q');
	const startIndex = queryParams.get('start') || 1;

	useEffect(() => {
		if (!query) return;
		const fetchSearchResults = async () => {
			let payload = { q: query, start: startIndex };
			if (imageSearch) {
				payload.searchType = 'image';
			}
			try {
				const res = await fetchDataFromApi(payload);
				setResult(res);
			} catch (error) {
				console.error('Failed to fetch search results', error);
			}
		};

		fetchSearchResults();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [query, startIndex, imageSearch]);

	if (!result) return <div>Loading...</div>;

	const { items, queries, searchInformation } = result;
	console.log(searchInformation.formattedTotalResults);

	return (
		<div className="flex flex-col min-h-[100vh]">
			<SearchResultHeader />
			<main className="grow p-[12px] pb-0 md:pr-5 md:pl-20">
				<div className="flex text-sm text-[#70757a] mb-3">
					{`About ${searchInformation.formattedTotalResults} results (${searchInformation.formattedSearchTime} seconds)`}
				</div>

				{/* Conditional rendering for search type */}
				{items && items.length > 0 ? (
					!imageSearch ? (
						<>
							{items.map((item, index) => (
								<SearchedItemTemplate key={index} data={item} />
							))}
							<Pagination queries={queries} />
						</>
					) : (
						<>
							<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
								{items.map((item, index) => (
									<SearchedImageItemTemplate key={index} data={item} />
								))}
							</div>
							<Pagination queries={queries} />
						</>
					)
				) : (
					<p className="text-center text-gray-500">No results found!</p>
				)}
			</main>

			<Footer />
		</div>
	);
};

export default SearchResult;
