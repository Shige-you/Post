import { useState, useContext,useEffect } from "react";
import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { post, getList } from "../api/Post.tsx";
import styled from "styled-components";
import {getUser} from "../api/User.tsx"

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const { userInfo } = useContext(UserContext);
  const [userName,setUserName] =useState("");
  const { setPostList, setCurrentPage } = useContext(PostListContext);

  useEffect(() => {
    const myGetUser = async () => {
      if (!userInfo.token) return;
      try {
        const user = await getUser(userInfo.user_id, userInfo.token);
        setUserName(user.name);
      } catch (error) {
        console.error("ユーザー情報の取得に失敗しました", error);
      }
    };
    myGetUser();
  }, [userInfo.user_id, userInfo.token]);

  const refreshList = async () => {
    if (!userInfo || !userInfo.token) return;

    try {
      // 1ページ目を取得
      const posts = await getList(userInfo.token, 1); 
      
      let newPostList: Array<PostType> = [];
      if (posts) {
        posts.forEach((p: any) => {
          newPostList.push({
            id: p.id,
            user_name: p.user_name,
            content: p.content,
            created_at: new Date(p.created_at),
          });
        });
      }
      setPostList(newPostList);

      setCurrentPage(1); 

    } catch (error) {
      console.error("リスト更新エラー:", error);
    }
  };

  // 送信ボタンが押された時の処理
  const onSendClick = async () => {
    if (!msg.trim()) return; 
    
    console.log("送信開始");
    const { user_id, token } = userInfo;

    try {
      await post(String(user_id), token, msg);
      
      await refreshList();
      setMsg(""); // 入力欄を空にする
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    }
  };

  return (
    <SSideBar>
      <SSideBarRow>
        {userName}
      </SSideBarRow>
      <SSideBarRow>
        <STextarea
          rows={4}
          value={msg}
          onChange={(evt) => setMsg(evt.target.value)}
          style={{ width: "100%" }}
        ></STextarea>
      </SSideBarRow>
      <SSideBarRow>
        <SSideBarbutton onClick={onSendClick}>送信</SSideBarbutton>
      </SSideBarRow>
    </SSideBar>
  );
}

// --- スタイルの定義 ---
const SSideBar = styled.div`
  padding: 8px;
`
const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`
const STextarea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #CCCCCC;
  padding: 8px;
  box-sizing: border-box;
`
const SSideBarbutton = styled.button`
  background-color: #222222;
  padding: 8px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #444444;
  }
`