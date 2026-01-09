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
  background-color: #333;
  color: white;
  box-sizing: border-box; 
`;

const SBody = styled.div`
  width: 100%;
  height: calc(100vh - 32px); 
  display: flex;
  flex-direction: row;
  overflow: hidden; 
`;

const SSideBar = styled.div`
  border-right: 1px solid #ddd;
  width: 250px; 
  background-color: #fff;
  box-sizing: border-box;
`;

const SContents = styled.div`
  flex: 1; 
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 全体のスクロールを防ぐ */
`;