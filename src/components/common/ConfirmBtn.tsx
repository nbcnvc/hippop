import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

//alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from 'styled-components';

interface ConfirmBtnProps {
  deleteButton: (id: number) => Promise<void>;
  id: number;
}

function ConfirmBtn({ deleteButton, id }: ConfirmBtnProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (isDeleting) return; // 이미 삭제 중이라면 중복 호출 방지

    setIsDeleting(true);

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomBtn>
            <h1>댓글을 삭제하시겠습니까?</h1>
            <button
              onClick={async () => {
                try {
                  await deleteButton(id);
                  toast.info('삭제되었습니다!', {
                    className: 'custom-toast',
                    theme: 'light'
                  });
                  onClose();
                } catch (error) {
                  console.error(error);
                  toast.error('댓글 삭제 중 오류가 발생했습니다.');
                  onClose();
                } finally {
                  setIsDeleting(false);
                }
              }}
            >
              확인
            </button>
            <button onClick={onClose}>취소</button>
          </CustomBtn>
        );
      }
    });
  };

  return (
    <div className="container">
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default ConfirmBtn;

const CustomBtn = styled.div`
  .custom-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 6px;
  }

  .custom-dialog h1 {
    margin: 0 0 10px;
  }

  .custom-dialog button {
    margin: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .custom-dialog button:last-child {
    background-color: var(--second-color);
    color: white;
    border: 2px solid #7c84ae;
    border-bottom: 4px solid #7c84ae;
  }
}`;
