import React, { ReactNode, useState } from "react"; // 1. useStateを追加
import styled from "styled-components";
import {deletePost,updatePost} from "../api/Post.tsx"
import {UserContext} from "../providers/UserProvider.tsx"
import {useContext} from "react"

interface PostProps {
  post: {
    id: number;
    user_name: string;
    content: string;
    created_at: Date;
  };
  currentUserName?: string;
  onReload:()=>void;
}

export default function Post(props: PostProps) {
  const {userInfo} =useContext(UserContext)
  const { post, currentUserName,onReload } = props;
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [editContent,setEditContent]=useState(post.content);

  const getDateStr = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const min = dateObj.getMinutes();
    const sec = dateObj.getSeconds();
    return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
  };

  const getLines = (src: string): ReactNode => {
    return src.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const onClickDelete = async () =>{
   if (!userInfo?.token) return;

  const result = await deletePost(userInfo.token, post.id);
  if (result) {
    onReload();
  }
  setDeleteIsOpen(false);
  
};

const onClickUpdate = async () => {
  const result = await updatePost(userInfo.token, post.id, editContent);
  if (result) {
    setEditIsOpen(false);
    onReload(); // 画面を再読み込み
  }
};

  return (
    <SPost>
      <div>
        <SName>{post.user_name}</SName>
        <SDate>{getDateStr(post.created_at)}</SDate>

        {post.user_name === currentUserName && (
          <SButtonGroup>
            <SEdit onClick={() => setEditIsOpen(true)}>編集</SEdit>
            <SDelete onClick={() => setDeleteIsOpen(true)}>削除</SDelete>

            {editIsOpen && (
              <ModalOverlay>
                <ModalContent>
                  <h3>変更を入力</h3>
                  <textarea value={editContent} onChange={(e)=>setEditContent(e.target.value)} />
                  <br />
                  <button onClick={onClickUpdate}>確認して変更</button>
                  <Sbutton onClick={() => setEditIsOpen(false)}>キャンセル</Sbutton>
                </ModalContent>
              </ModalOverlay>
            )}

            {deleteIsOpen && (
              <ModalOverlay>
                <ModalContent>
                  <h3>確認</h3>
                  <p>本当に削除しますか？</p>
                  <Sbutton onClick={onClickDelete}>はい</Sbutton>
                  <button onClick={() => setDeleteIsOpen(false)}>キャンセル</button>
                </ModalContent>
              </ModalOverlay>
            )}
          </SButtonGroup>
        )}
      </div>
      <SContent>{getLines(post.content)}</SContent>
    </SPost>
  );
}


const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white; padding: 20px; border-radius: 8px; text-align: center;
`;

const SName = styled.span` font-size: small; color: #000044; font-weight: bold; `;
const SDate = styled.span` margin-left: 8px; font-size:small; color: #000044; `;
const SButtonGroup = styled.span` margin-left: 12px; `;
const SEdit = styled.button` margin-right: 4px; cursor: pointer; font-size: 0.7rem; `;
const SDelete = styled.button` cursor: pointer; font-size: 0.7rem; color: #cc0000; `;
const Sbutton=styled.button`color:red;`
// Post.tsx のスタイル部分を修正

// Post.tsx のスタイル部分

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
`

const SContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.4;
  overflow-y: auto;
  white-space: pre-wrap; /* 改行を有効にする */
  
  /* 投稿内のスクロールバーを消すとスッキリします */
  &::-webkit-scrollbar { display: none; }
`;