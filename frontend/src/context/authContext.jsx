import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const AuthContext = createContext({
	authUser: null,
	setAuthUser: () => {},
	isLoading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	
	useEffect(() => {
		const fetchAuthUser = async () => {
			try {
			  const res = await fetch("/api/authRoutes/me");  
			  const data = await res.json();
			  console.log(data);
			  if (!res.ok) {
				throw new Error(data.error);
			  }
			  setAuthUser(data);
			} catch (error) {
			  console.log(error);
			  toast.error(error.message);
			} finally {
			  setIsLoading(false);
			}
		  };
		  

		fetchAuthUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				authUser,
				isLoading,
				setAuthUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Define prop types for the AuthContextProvider component
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
