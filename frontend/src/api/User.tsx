import axios from "axios";
const SERVER_ADDRESS = process.env.REACT_APP_API_URL; 


const getUser = async (user_id: number, token: string) => {
  const url = `${SERVER_ADDRESS}/user/${user_id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

export { getUser };

