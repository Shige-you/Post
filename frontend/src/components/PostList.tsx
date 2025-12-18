import Post from './Post.tsx';
import { useContext, useEffect,useCallback } from 'react';
import { PostListContext,PostType } from '../providers/PostListProvider.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import  {getList} from "../api/Post.tsx";

export default function PostList() {
  // ポストリストコンテキスト、ユーザーコンテキストを使用
  const { postList, setPostList } = useContext(PostListContext);
  const { userInfo } = useContext(UserContext);


  // ポスト一覧を取得する関数
  const getPostList =useCallback( async() => {
	  if(!userInfo||!userInfo.token){
	return;
  }
    try{
		const posts = await getList(userInfo.token);
		console.log(posts);

    // getListで取得したポスト配列をコンテキストに保存する
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
  }catch(error){
	console.error('ポスト取得エラー',error);
  }
},[userInfo,setPostList]
 );

  //描画時にポスト一覧を取得する
  useEffect(()=>{
	getPostList();
  },[getPostList]);

	return (
		<div>
			<p>PostList</p>
			{postList.map((p)=>(
				<Post key={p.id} post={p}/>				
			))}
		</div>
	)	
}