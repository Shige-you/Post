import { useState, useContext } from "react";
import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { post, getList } from "../api/Post.tsx";
import styled from "styled-components";

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const { userInfo } = useContext(UserContext);
  const { setPostList } = useContext(PostListContext);

  // ✅ 最新の投稿一覧を取得してコンテキストを更新する関数
  const refreshList = async () => {
    if (!userInfo || !userInfo.token) return;

    try {
      const posts = await getList(userInfo.token);
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
      setPostList(newPostList); // ここで PostListProvider の中身が更新され、画面が変わります
    } catch (error) {
      console.error("リスト更新エラー:", error);
    }
  };

  // 送信ボタンが押された時の処理
  const onSendClick = async () => {
    if (!msg.trim()) return; // 空文字送信防止
    
    console.log("送信開始");
    const { user_id, token } = userInfo;

    try {
      // 1. サーバーへ投稿を送信
      await post(String(user_id), token, msg);
      
      // 2. 投稿が成功したら、すぐに最新リストを取得しに行く
      await refreshList();
      setMsg(""); // 入力欄を空にする
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    }
  };

  return (
    <>
      <SSideBar>
        <SSideBarRow>{userInfo.user_id || "hoge"}{userInfo.email||"hoge"}</SSideBarRow>
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
    </>
  );
}

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
`

const SSideBarbutton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
`