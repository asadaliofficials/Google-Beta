const SearchedItemTemplate = ({ data }) => {
	function createMarkup(html) {
		return { __html: html };
	}
	 const url = new URL(data.link); // extract domain
  const favicon = `https://www.google.com/s2/favicons?sz=32&domain=${url.hostname}`;

	return (
		<div className="flex flex-col py-4 max-w-[700px]">
			<div className="flex gap-2">
				  <img src={favicon} alt="favicon" className="w-5 h-5 rounded" />
				<div className="text-sm truncate text-[#202124]">{data.formattedUrl}</div>
			</div>
			<div className="group cursor-pointer" onClick={() => window.open(data.link, '_blank')}>
				<div className="group-hover:underline text-xl text-[#1a0dab] pt-2">{data.title}</div>
			</div>
			<div
				className="text-sm text-[#4d5156] leading-6 pt-1"
				dangerouslySetInnerHTML={createMarkup(data.htmlSnippet)}
			/>
		</div>
	);
};

export default SearchedItemTemplate;
