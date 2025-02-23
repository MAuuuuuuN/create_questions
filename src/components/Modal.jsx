import { useState, useEffect } from 'react';
import { getHistory, deleteAllHistory } from '../http.js';

import styles from './css/Modal.module.css';

export default function Modal({ showModal }) {
  const [historyData, setHistoryData] = useState([]);

  // モーダルを開くたびに履歴を取得
  useEffect(() => {
    async function getQuestionData() {
      const response = await getHistory();
      const formatData = response.map((record) => {
        const dateOption = {
          timeZone: 'Asia/Tokyo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
        const utcDate = new Date(record.create_at);
        const jstDate = utcDate.toLocaleDateString('ja-JP', dateOption);

        let correct = "";
        if (record.is_correct === 1) {
          correct = "正解";
        } else {
          correct = "不正解";
        }

        return {
          ...record,
          create_at: jstDate,
          is_correct: correct
        }
      });

      setHistoryData(formatData);
    }

    if (showModal) {
      getQuestionData();
    }
  }, [showModal]);

  // 履歴を削除
  async function deleteHistory() {
    const isDelete = window.confirm("履歴を削除しますか？");
    if (isDelete) {
      await deleteAllHistory();
      setHistoryData("");
    } else {
      return;
    }
  }

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>出題履歴</h1>
          {historyData.length > 0 ? (
            <>
              <div className={styles.table_area}>
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.table_header}>
                      <th>ID</th>
                      <th>出題日</th>
                      <th>カテゴリー</th>
                      <th>問題</th>
                      <th>正誤</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((record, index) => (
                      <tr key={index}>
                        <td>{record.id}</td>
                        <td>{record.create_at}</td>
                        <td>{record.category}</td>
                        <td>{record.question}</td>
                        <td>{record.is_correct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.button_area}>
                <button className={styles.delete} onClick={deleteHistory}>履歴を削除する</button>
                <button className={styles.close} onClick={showModal}>閉じる</button>
              </div>
            </>
          ) : (
            <div className={styles.no_data}>
              <p>データがありません</p>
              <button className={styles.close} onClick={showModal}>閉じる</button>
            </div>
          )}

        </div>
      </div>
    </>
  )
}