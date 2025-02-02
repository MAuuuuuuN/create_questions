import { useState } from 'react';
import { Button } from '@mantine/core';

export default function ShowAnswer({ onShowAnswer, isShow }) {
  const [nowShow, setNowShow] = useState('正解を表示する');

  function showAnswerButton() {
    onShowAnswer(!isShow);
    if (isShow) {
      setNowShow('正解を表示する');
    } else {
      setNowShow('正解を隠す');
    }
  }

  return (
    <>
      <Button onClick={showAnswerButton}>{nowShow}</Button>
    </>
  )
}