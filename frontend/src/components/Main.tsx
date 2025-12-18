import styled from 'styled-components';
import Header from '../components/Header.tsx';
import SideBar from '../components/SideBar.tsx';
import Contents from '../components/Contents.tsx';

export default function Main() {
	return (
		<>
			<SHeader>
				<Header></Header>
			</SHeader>
			<SBody>
				<SSideBar>
					<SideBar></SideBar>
				</SSideBar>
				<SContents>
					<Contents></Contents>
				</SContents>
			</SBody>
		</>
	)
}

const SHeader = styled.div`
	width: 100%;
	height: 32px;
	border:black 2px solid ;
`

const SBody = styled.div`
	width: 100%;
	height: calc(100vh - 32px);
	border: 2px solid black;
	display: flex;
	flex-direction: row
`

const SSideBar = styled.div`
	border: 2px solid  #676567ff;
	width: 30%;
	height: 100%;
`

const SContents = styled.div`
	border: 2px solid #676567ff;;
	width: 100%;
	height: 100%;
`