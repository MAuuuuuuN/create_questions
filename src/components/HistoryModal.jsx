import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

export default function HistoryModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/history');
      setHistory(response.data);
    } catch (error) {
      console.error('履歴の取得に失敗しました:', error);
    }
  };

  const handleDeleteHistory = async () => {
    if (window.confirm('履歴を全て削除してもよろしいですか？')) {
      try {
        await axios.delete('http://localhost:3001/api/history');
        setHistory([]);
      } catch (error) {
        console.error('履歴の削除に失敗しました:', error);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="履歴">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={handleDeleteHistory}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            履歴を削除
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {history.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  {new Date(item.create_at).toLocaleString()}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                  item.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_correct ? '正解' : '不正解'}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {item.category || 'カテゴリなし'}
                </span>
              </div>
              <p className="text-gray-700">{item.question}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}