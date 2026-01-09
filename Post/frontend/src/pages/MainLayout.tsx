import { Navigate } from "react-router-dom"
import Main from "../components/Main.tsx"
import { PostListProvider } from "../providers/PostListProvider.tsx"
import { UserContext } from "../providers/UserProvider.tsx"
import { useContext } from "react";

export default function MainLayout(){
	const {userInfo}=useContext(UserContext);
	const loggedIn = (userInfo.token !=='');

	return(
		<PostListProvider>
			{
				loggedIn?<Main/>:<Navigate replace to ="/"/>
			}
		</PostListProvider>
	)
}