import Post from './Post.tsx';
import { useContext, useEffect, useCallback } from 'react';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { getList } from "../api/Post.tsx";
import styled from 'styled-components';

export default function PostList() {
  // Providerから全ての共有データを受け取る
  const { postList, setPostList, currentPage, setCurrentPage } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);

  // ポスト一覧を取得する関数
  const fetchPosts = useCallback(async (page: number) => {
    if (!userInfo || !userInfo.token) return;
    
    try {
      // APIに現在のページ番号を渡してデータを取得
      const posts = await getList(userInfo.token, page);
      
      let newpostList: Array<PostType> = [];
      if (posts) {
        posts.forEach((p: any) => {
          newpostList.push({
            id: p.id,
            user_name: p.user_name,
            content: p.content,
            created_at: new Date(p.created_at),
          });
        });
      }
      setPostList(newpostList);
    } catch (error) {
      console.error('ポスト取得エラー', error);
    }
  }, [userInfo, setPostList]);

  // 「ページ番号」が変更されるたびに再み込み
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  // 「次へ」ボタン
  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };
  // 「前へ」ボタン
  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      <SContainer>
        <p>PostList ({currentPage} ページ目 ({currentPage-1}1件~{currentPage}0件))</p>
        <SListWrapper>
        {postList.map((p) => (
          <Post key={p.id}
          post={p}
          currentUserName={userInfo?.name||''}
          onReload={()=>fetchPosts(currentPage)}
          />
        ))}
        </SListWrapper>
      
      <PaginationWrapper>

        {postList.length > 0 && (
          <PageButton onClick={handlePrev} disabled={currentPage === 1}>
            前へ
          </PageButton>
        )}

        <PageNumber>
          {currentPage}
        </PageNumber>
        
        {postList.length === 10 && (
          <PageButton onClick={handleNext}>
            次へ
          </PageButton>
        )}
      </PaginationWrapper>
        </SContainer>
    </>
  );
}
// PostList.tsx のスタイル部分

const SContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%; /* 親の SContents の高さいっぱい使う */
  box-sizing: border-box;
`;

const SListWrapper = styled.div`
  margin-top: 16px; /* 🚨 残りのスペースをすべて使い切る */
  overflow-y: scroll;
  padding: 0 20px; /* 左右に少し余白 */

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
`;

const PaginationWrapper = styled.div`
  flex-shrink: 0; /* 🚨 リストが大きくても絶対に潰れない */
  padding: 10px 0;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white; /* 重なり防止 */
`;


const PageButton = styled.button`
  background-color: #222222;
  color: #fafafa;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  
  /* 無効化（disabled）されている時の見た目 */
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  /* マウスを乗せた時の動き */
  &:hover:not(:disabled) {
    background-color: #444444;
  }
`;

const PageNumber = styled.span`
  margin: 0 20px;
  font-weight: bold;
  font-size: 1.1rem;
`;