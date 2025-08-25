import { TbGridDots } from 'react-icons/tb';

import Profile from '../assets/logo.png';
const ProfileIcon = () => {
	return (
		<div className="flex gap-2">
			<span className="h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-black/[0.05]">
				<TbGridDots size={20} color="#5f6368" />
			</span>
			<span className="h-10 w-10 relative flex justify-center items-center">
				<span className="h-9 w-9 rounded-full overflow-hidden">
					<img className="h-full w-full object-cover" src={Profile} />
				</span>
			</span>
		</div>
	);
};

export default ProfileIcon;
