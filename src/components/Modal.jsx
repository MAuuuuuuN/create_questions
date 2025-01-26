import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const modal = forwardRef(function Modal(ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog}>
      <button>Close</button>
      <h2>履歴</h2>
    </dialog>,
    document.getElementById('modal')
  )
})

export default modal;