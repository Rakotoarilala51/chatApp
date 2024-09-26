import { LogOut } from "lucide-react";
import useLogOut from "../../hooks/useLogOut";

const LogoutButton = () => {
	const { logout}=useLogOut()


	return (
		<div className='mt-auto'>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
export default LogoutButton;
