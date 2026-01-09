import { createContext, Dispatch, SetStateAction, useState } from "react";

// 投稿データの型定義
export type PostType = {
    id: number;
    user_name: string;
    content: string;
    created_at: Date;
};

export const PostListContext = createContext(
    {} as {
        postList: PostType[]; // ポストの配列
        setPostList: Dispatch<SetStateAction<PostType[]>>;
        currentPage: number;   // 現在のページ番号（追加）
        setCurrentPage: Dispatch<SetStateAction<number>>; // ページ更新関数（追加）
    }
);

export const PostListProvider = (props: any) => {
    const { children } = props;

    // 投稿リストの状態管理
    const [postList, setPostList] = useState<PostType[]>([]);
    
    //  現在のページ番号の状態管理を追加（初期値は1ページ目）
    const [currentPage, setCurrentPage] = useState(1);

    return (
        // サイドバーやリスト画面からこれらを使えるようになります
        <PostListContext.Provider value={{ postList, setPostList, currentPage, setCurrentPage }}> 
            {children}
        </PostListContext.Provider>
    );
};