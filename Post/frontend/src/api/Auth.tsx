import axios from 'axios';

export const sign_in = async (user_id: string, pass: string) => {
  const baseUrl = process.env.REACT_APP_API_URL;//環境変数から読み込むことで本番でも、localhostでも動くように

  const url = `${baseUrl}/auth?user_id=${user_id}&pass=${pass}`;
  console.log(url);
  const res = await axios.get(url);
  console.log(res);

  return res.data
};