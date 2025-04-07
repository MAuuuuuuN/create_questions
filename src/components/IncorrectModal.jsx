import { useState, useEffect } from 'react';
import { getHistory, deleteAllHistory } from '../http.js';

export default function Modal({ showModal }) {

  return (
    <>
      <div className="fixed flex justify-center items-center w-full h-full left-0 z-100 bg-stone-300/50">
        <div className="w-300 h-200 p-5 bg-white shadow-md rounded-xl">
          <h1 className="text-2xl font-bold text-center">復習</h1>

          <h2 className="text-xl font-bold text-center">復習設定</h2>
          <p className="m-5 text-lg text-center">カテゴリー設定</p>
          <p className="m-5 text-lg text-center">問題数設定</p>

          <button onClick={showModal} className="px-7 py-3 text-lg font-bold text-emerald-600 border-3 border-emerald-500 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-emerald-500 hover:text-white">閉じる</button>
          <button onClick={showModal} className="px-7 py-3 text-lg font-bold text-blue-600 border-3 border-blue-500 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white">出題する</button>
        </div>
      </div>
    </>
  )
}