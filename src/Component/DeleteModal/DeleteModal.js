import React from "react";
import styles from "./deleteModal.module.css";

const DeleteModal = ({ deleteItem, text, confirm, cancel }) => {
  const handleDone = () => {
    confirm(deleteItem._id);
    cancel();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.title} open-sans-semibold`}>{text}</div>
      <div className={styles.btn}>
        <div
          className={`${styles.done} open-sans-semibold cursor-pointer`}
          onClick={handleDone}
        >
          Confirm
        </div>
        <div className={styles.line}></div>
        <div
          className={`${styles.cancel} open-sans-semibold cursor-pointer`}
          onClick={() => cancel()}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
