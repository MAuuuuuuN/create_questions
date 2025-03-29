import { useState, useEffect } from 'react';
import { getHistory, deleteAllHistory } from '../http.js';

export default function Modal({ showModal }) {
  const [historyData, setHistoryData] = useState([]);

  // モーダルを開くたびに履歴を取得
  useEffect(() => {
    async function getQuestionData() {
      const response = await getHistory();
      console.log(response);
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
      <div className="fixed flex justify-center items-center w-full h-full left-0 z-100 bg-stone-300/50">
        <div className="w-300 h-200 p-5 bg-white shadow-md rounded-xl">
          <h1 className="sticky text-2xl font-bold text-center">出題履歴</h1>
          {historyData.length > 0 ? (
            <>
              <div className="my-5 h-150 overflow-scroll">
                <table className="">
                  <thead className="border-b-2 border-b-stone-200 sticky">
                    <tr className="">
                      <th className="w-[8%]">ID</th>
                      <th className="w-[12%]">出題日</th>
                      <th className="w-[12%]">カテゴリー</th>
                      <th className="w-[60%]">問題</th>
                      <th className="w-[8%]">正誤</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((record, index) => (
                      <tr key={index}>
                        <td className="text-center py-2">{record.id}</td>
                        <td className="text-center">{record.create_at}</td>
                        <td className="text-center">{record.category}</td>
                        <td>{record.question}</td>
                        <td className="text-center">{record.is_correct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between p-5">
                <button onClick={showModal} className="px-7 py-3 text-lg font-bold text-emerald-600 border-3 border-emerald-500 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-emerald-500 hover:text-white">閉じる</button>
                <button onClick={deleteHistory} className="px-7 py-3 text-lg font-bold text-red-600 border-3 border-red-600 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-red-600 hover:text-white">履歴を削除する</button>
              </div>
            </>
          ) : (
            <div>
              <p>データがありません</p>
              <button onClick={showModal}>閉じる</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}