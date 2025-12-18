import React, { ReactNode } from "react";
import styled from "styled-components";

// Props（この部品が受け取るデータ）の形を定義
interface PostProps {
  post: {
    user_name: string;
    content: string;
    created_at: Date;
  };
}

export default function Post(props: PostProps) {
  const { post } = props;

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
    return src.split('\n').map((line, index) => {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      );
    });
  };

  return (
    <SPost>
	<div>
      <SName>{post.user_name}</SName>
      <SDate>{getDateStr(post.created_at)}</SDate>
	</div>
	<div>{getLines(post.content)}</div>
    </SPost>
  );
}

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
`

const SName = styled.span`
  font-size: small;
  color: #000044;
`
const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`