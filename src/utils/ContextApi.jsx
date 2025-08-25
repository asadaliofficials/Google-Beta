import React, { createContext, useState } from 'react';

export const Context = createContext();

export const AppContext = props => {
	const [imageSearch, setImageSearch] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<Context.Provider
			value={{
				imageSearch,
				setImageSearch,
				searchQuery,
				setSearchQuery,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
