import React, { forwardRef } from "react";
import styles from "./formInput.module.css";
import { PiChatLight, PiImageSquareBold } from "react-icons/pi";
import { FiFilm } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdGif } from "react-icons/md";

const FormInput = forwardRef(
  ({ form, deleteFun, index, handleChange }, ref) => {
    return (
      <div className={styles.container} ref={ref}>
        <div className={`${styles.title} open-sans-semibold`}>
          {form.fieldName} {form.count}
        </div>
        <div className={styles.delete} onClick={() => deleteFun(index)}>
          <RiDeleteBin6Fill />
        </div>
        {/* text input */}
        {form?.fieldType === 1 && (
          <div className={styles.inputContainer}>
            <PiChatLight className={styles.bubbleIcon} />
            <input
              className={`${styles.input} open-sans-semibold`}
              type="text"
              placeholder="Click to add text"
              value={form.fieldValue}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        )}
        {/* image input */}
        {form?.fieldType === 2 && (
          <div className={styles.inputContainer}>
            <PiImageSquareBold className={styles.bubbleIcon} />
            <input
              className={`${styles.input} open-sans-semibold`}
              type="text"
              placeholder="Click to add link"
              value={form.fieldValue}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        )}
        {/* video input */}
        {form?.fieldType === 3 && (
          <div className={styles.inputContainer}>
            <FiFilm className={styles.bubbleIcon} />
            <input
              className={`${styles.input} open-sans-semibold`}
              type="text"
              placeholder="Click to add link"
              value={form.fieldValue}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        )}
        {form?.fieldType === 4 && (
          <div className={styles.inputContainer}>
            <MdGif className={`${styles.bubbleIcon} ${styles.gif}`} />
            <input
              className={`${styles.input} open-sans-semibold`}
              type="text"
              placeholder="Click to add link"
              value={form.fieldValue}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        )}
        {/* text input */}
        {form?.fieldType === 5 && (
          <div className={`${styles.text} open-sans-semibold`}>
            Hint : User will input a text on his form
          </div>
        )}
        {/* number input */}
        {form?.fieldType === 6 && (
          <div className={`${styles.text} open-sans-semibold`}>
            Hint : User will input a number on his form
          </div>
        )}
        {/* email input */}
        {form?.fieldType === 7 && (
          <div className={`${styles.text} open-sans-semibold`}>
            Hint : User will input a email on his form
          </div>
        )}

        {/* phone input */}
        {form?.fieldType === 8 && (
          <div className={`${styles.text} open-sans-semibold`}>
            Hint : User will input a phone on his form
          </div>
        )}

        {/* date input */}
        {form?.fieldType === 9 && (
          <div className={`${styles.text} open-sans-semibold`}>
            Hint : User will select a date
          </div>
        )}

        {/* rating input */}
        {form?.fieldType === 10 && (
          <div className={`${styles.text} open-sans-semibold`}>
            Hint : User will tap to rate out of 5
          </div>
        )}

        {/* button input */}
        {form?.fieldType === 11 && (
          <input
            className={`${styles.inputButton} ${styles.input} open-sans-semibold`}
            type="text"
            placeholder="Click here to edit"
            value={form.fieldValue}
            onChange={(e) => handleChange(e, index)}
          />
        )}
        {form.error && (
          <div className={`${styles.error} poppins-500`}>Required Field</div>
        )}
      </div>
    );
  }
);

export default FormInput;
