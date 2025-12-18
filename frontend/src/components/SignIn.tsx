import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom'; 
import { UserContext } from "../providers/UserProvider.tsx";
import { sign_in } from '../api/Auth.tsx';
import styled from "styled-components";

export default function SignIn() {
  const navigate = useNavigate(); // 2. navigateオブジェクトを作成
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const {setUserInfo} =useContext(UserContext);

  // 3. async を付けて、非同期処理に対応させる
  const onSignInClick = async () => {
    console.log('onSignInClick');
    
    // 4. APIの結果（トークンなど）を受け取るまで待機
    const ret = await sign_in(userId, password);
    console.log(ret);

    // 5. ログインに成功（トークンが存在）したらメイン画面へ
    if (ret && ret.token) { 
      setUserInfo({
        user_id:ret.user_id,
        token:ret.token,
        email:ret.email
      })
      navigate('/main'); 
    } else {
      alert("ログインに失敗しました。IDまたはパスワードを確認してください。");
    }
  };

  return (
    <SSignInFrame>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">ID</label>
        </SSignInLabel>
        <SSignInInput>
          <input id="id" value={userId} type="text" onChange={(evt) => setUserId(evt.target.value)} />
        </SSignInInput>
      </SSignInRow>
      <SSignInRow>
        <SSignInLabel>
        {/* <label htmlFor="password">Password</label> */}
        <input id="password" value={password} type="password" onChange={(evt) => setPassword(evt.target.value)} />
        </SSignInLabel>
      </SSignInRow>
      <SSignInRow>
      <SLoginButton type="button" onClick={onSignInClick}>Login
      </SLoginButton>
      </SSignInRow>
    </SSignInFrame>
  );
}

const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  dixplay: inline-block;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;