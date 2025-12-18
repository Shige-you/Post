import axios from "axios"
const SERVER_ADDRESS = "http://localhost:3001"; 

// 1. 投稿一覧を取得する
export const getList = async (token: string) => {
  // URLの中に直接 token を組み込む
  const url = `${SERVER_ADDRESS}/post?token=${token}&records=10`;

  const res = await axios.get(url); 
  return res.data;
};

// 2. 投稿する
export const post = async (user_id: string, token: string, msg: string) => {
  const data = {
    message: msg
  };

  // こちらも URL の中に token と user_id 
  const url = `${SERVER_ADDRESS}/post?user_id=${user_id}&token=${token}`;
  
  const res = await axios.post(url, data);
  console.log(res);
}