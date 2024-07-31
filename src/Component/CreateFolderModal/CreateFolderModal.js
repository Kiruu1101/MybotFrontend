import React, { useState } from "react";
import styles from "./createFolderModal.module.css";

const CreateFolderModal = ({ confirm, cancel }) => {
  const [name, setName] = useState();

  const handleDone = () => {
    confirm({ name });
    cancel();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.title} open-sans-semibold`}>
        Create New Folder
      </div>
      <input
        className={`${styles.input} open-sans-semibold`}
        type="text"
        placeholder="Enter folder name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.btn}>
        <div
          className={`${styles.done} open-sans-semibold cursor-pointer`}
          onClick={handleDone}
        >
          Done
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

export default CreateFolderModal;
