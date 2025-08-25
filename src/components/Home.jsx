import Logo from '../assets/beta.png';
import HomeHeader from './HomeHeader';
import SearchInput from './SearchInput';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { Context } from '../utils/ContextApi';
import { useContext } from 'react';

const Home = () => {
	const navigate = useNavigate();
	const { searchQuery } = useContext(Context);

	function handleClickEvent() {
		if (searchQuery?.length > 0) {
			navigate(`/search?q=${searchQuery}&start=${1}`);
		}
	}

	return (
		<div className="flex h-[100vh] flex-col">
			<HomeHeader />
			<main className="grow flex justify-center">
				<div className="w-full flex px-5 flex-col items-center mt-44">
					<img className="w-[172px] md:w-[272px] mb-8" src={Logo} alt="google img" />
					<SearchInput />
					<div className="flex gap-1 text-[#3c4043] mt-8">
						<button
							onClick={handleClickEvent}
							className="h-9 px-4 bg-[#f8f9fa] text-sm rounded-md border border-[#f8f9fa] hover:border-[#dadce0] cursor-pointer hover:shadow-c2"
						>
							Google Search
						</button>
						<button className="h-9 px-4 bg-[#f8f9fa] text-sm rounded-md border border-[#f8f9fa] hover:border-[#dadce0] cursor-pointer hover:shadow-c2">
							I'm Feeling Lucky
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Home;
