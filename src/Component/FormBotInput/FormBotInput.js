import React, { useEffect, useState } from "react";
import styles from "./formbotInput.module.css";
import { BiSend } from "react-icons/bi";
import { addFormData } from "../../Apis/form";

const FormBotInput = ({
  formId,
  field,
  index,
  setIndex,
  sessionId,
  displayFormField,
  setDisplayFormField,
  trial,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (field.isDisabled || !input || isLoading) return;
    setIsLoading(true);
    let res = false;
    if (trial) {
      res = true;
    } else {
      res = await addFormData({
        formId,
        fieldId: field._id,
        sessionId,
        input: input,
      });
    }

    if (res) {
      const updatedFields = displayFormField.map((field, index) =>
        index === displayFormField.length - 1
          ? { ...field, isDisabled: true }
          : field
      );
      setDisplayFormField(updatedFields);
      setIndex(index + 1);
    }
    setIsLoading(false);
  };

  const handleButton = async () => {
    if (field.isDisabled || isLoading) return;
    setIsLoading(true);
    let res = false;
    if (trial) {
      res = true;
    } else {
      res = await addFormData({
        formId,
        fieldId: field._id,
        sessionId,
        input: field.fieldValue,
      });
    }
    if (res) {
      const updatedFields = displayFormField.map((field, index) =>
        index === displayFormField.length - 1
          ? { ...field, isDisabled: true }
          : field
      );
      setDisplayFormField(updatedFields);
      setIndex(index + 1);
    }
    setIsLoading(false);
  };

  const updateRating = (rating) => {
    if (field.isDisabled) return;
    setInput(rating);
  };
  useEffect(() => {
    const delay = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };
    delay();
    //eslint-disable-next-line
  }, []);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.dotContainer}>
          <div className={styles.dotFlashing}></div>
        </div>
      ) : field.fieldType === 11 ? (
        <div
          className={`${styles.button} open-sans-semibold cursor-pointer ${
            field.isDisabled && styles.disabled
          }`}
          onClick={handleButton}
        >
          {field.fieldValue}
          {!field.isDisabled && <span className={styles.dot}></span>}
        </div>
      ) : (
        <>
          <div
            className={`${styles.inputContainer} ${
              field.isDisabled && styles.inputDisabled
            }`}
          >
            {field.fieldType === 5 && (
              <input
                type="text"
                placeholder="Enter your text"
                className={`${styles.input} open-sans-semibold ${
                  field.isDisabled && styles.inputDisabled
                }`}
                value={input}
                disabled={field.isDisabled}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
            {field.fieldType === 6 && (
              <input
                type="number"
                placeholder="Enter a number"
                className={`${styles.input} open-sans-semibold ${
                  field.isDisabled && styles.inputDisabled
                }`}
                value={input}
                disabled={field.isDisabled}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
            {field.fieldType === 7 && (
              <input
                type="email"
                placeholder="Enter your Email"
                className={`${styles.input} open-sans-semibold ${
                  field.isDisabled && styles.inputDisabled
                }`}
                value={input}
                disabled={field.isDisabled}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
            {field.fieldType === 8 && (
              <input
                type="tel"
                placeholder="Enter your Phone"
                className={`${styles.input} open-sans-semibold ${
                  field.isDisabled && styles.inputDisabled
                }`}
                value={input}
                disabled={field.isDisabled}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
            {field.fieldType === 9 && (
              <input
                type="text"
                placeholder="Select a date"
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                className={`${styles.input} open-sans-semibold ${
                  field.isDisabled && styles.inputDisabled
                }`}
                value={input}
                disabled={field.isDisabled}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
            {field.fieldType === 10 && (
              <div className={styles.ratings}>
                <div
                  className={`${styles.rating} ${
                    input === 1 && styles.disabled
                  }`}
                  onClick={(e) => updateRating(1)}
                >
                  1
                </div>
                <div
                  className={`${styles.rating} ${
                    input === 2 && styles.disabled
                  }`}
                  onClick={(e) => updateRating(2)}
                >
                  2
                </div>
                <div
                  className={`${styles.rating} ${
                    input === 3 && styles.disabled
                  }`}
                  onClick={(e) => updateRating(3)}
                >
                  3
                </div>
                <div
                  className={`${styles.rating} ${
                    input === 4 && styles.disabled
                  }`}
                  onClick={(e) => updateRating(4)}
                >
                  4
                </div>
                <div
                  className={`${styles.rating} ${
                    input === 5 && styles.disabled
                  }`}
                  onClick={(e) => updateRating(5)}
                >
                  5
                </div>
              </div>
            )}
          </div>
          <div
            className={`${styles.send} cursor-pointer flexbox-center ${
              field.isDisabled && styles.inputDisabled
            }`}
            onClick={handleSubmit}
          >
            <BiSend className={styles.icon} />
          </div>
        </>
      )}
    </div>
  );
};

export default FormBotInput;
