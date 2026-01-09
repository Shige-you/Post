import axios from "axios"
const SERVER_ADDRESS = process.env.REACT_APP_API_URL; 

// 1. 投稿一覧を取得する
export const getList = async (token: string,page:number) => {
  // URLの中に直接 token を組み込む
  const offset = (page -1) * 10;
  const url = `${SERVER_ADDRESS}/post?token=${token}&records=10&offset=${offset}`;

  const res = await axios.get(url); 
  return res.data;
};

export const post = async (user_id: string, token: string, msg: string) => {
  const data = {
    message: msg
  };

  const url = `${SERVER_ADDRESS}/post?user_id=${user_id}&token=${token}`;
  
  const res = await axios.post(url, data);
  console.log(res);
}

export const deletePost = async (token: string, id: number) => {
  try {
    const url = `${SERVER_ADDRESS}/post/${id}?token=${token}`;
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    console.error("削除エラー:", error);
    return null;
  }
};

export const updatePost = async (token: string, id: number, content: string) => {
  try{
    const url = `${SERVER_ADDRESS}/post/${id}?token=${token}`;
    const res = await axios.patch(url, { content: content });
    return res.data;
}catch(error){
  console.error('更新エラー:',error);
  return null;
}};