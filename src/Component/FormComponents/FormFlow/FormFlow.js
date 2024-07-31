import React, { useEffect, useRef, useState } from "react";
import styles from "./formFlow.module.css";
import { PiChatLight } from "react-icons/pi";
import { PiImageSquareBold } from "react-icons/pi";
import { FiFilm } from "react-icons/fi";
import { MdGif } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { FiHash } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { TbCheckbox } from "react-icons/tb";
import FormInput from "../FormInput/FormInput";

const FormFlow = ({
  fieldTypeCount,
  setFieldTypeCount,
  formBot,
  setFormBot,
}) => {
  const formRefs = useRef([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  const incrementFieldTypeCount = (i, value) => {
    const newArray = [...fieldTypeCount];
    if (i >= 0 && i < newArray.length) {
      newArray[i] += value;
      newArray[i] = Math.max(0, newArray[i]);
      setFieldTypeCount(newArray);
      setScrollIndex(formBot.length);
    }
  };

  const handleChange = (e, ind) => {
    const updatedFormBot = [...formBot];

    updatedFormBot[ind] = {
      ...updatedFormBot[ind],
      fieldValue: e.target.value,
    };
    setFormBot(updatedFormBot);
  };
  const handleFormBot = (fieldId) => {
    switch (fieldId) {
      case 1:
        const field1 = {
          isBubble: true,
          fieldName: "Text",
          fieldType: 1,
          fieldValue: "",
          count: fieldTypeCount[0] + 1,
          error: false,
        };
        incrementFieldTypeCount(0, 1);
        setFormBot((prev) => [...prev, field1]);
        return;
      case 2:
        const field2 = {
          isBubble: true,
          fieldName: "Image",
          fieldType: 2,
          fieldValue: "",
          count: fieldTypeCount[1] + 1,
          error: false,
        };
        incrementFieldTypeCount(1, 1);
        setFormBot((prev) => [...prev, field2]);
        return;
      case 3:
        const field3 = {
          isBubble: true,
          fieldName: "Video",
          fieldType: 3,
          fieldValue: "",
          count: fieldTypeCount[2] + 1,
          error: false,
        };
        incrementFieldTypeCount(2, 1);
        setFormBot((prev) => [...prev, field3]);
        return;
      case 4:
        const field4 = {
          isBubble: true,
          fieldName: "GIF ",
          fieldType: 4,
          fieldValue: "",
          count: fieldTypeCount[3] + 1,
          error: false,
        };
        incrementFieldTypeCount(3, 1);
        setFormBot((prev) => [...prev, field4]);
        return;
      case 5:
        const field5 = {
          isBubble: false,
          fieldName: "Input Text",
          fieldType: 5,
          count: fieldTypeCount[4] + 1,
        };
        incrementFieldTypeCount(4, 1);
        setFormBot((prev) => [...prev, field5]);
        return;
      case 6:
        const field6 = {
          isBubble: false,
          fieldName: "Input Number",
          fieldType: 6,
          count: fieldTypeCount[5] + 1,
        };
        incrementFieldTypeCount(5, 1);
        setFormBot((prev) => [...prev, field6]);
        return;
      case 7:
        const field7 = {
          isBubble: false,
          fieldName: "Input Email",
          fieldType: 7,
          count: fieldTypeCount[6] + 1,
        };
        incrementFieldTypeCount(6, 1);
        setFormBot((prev) => [...prev, field7]);
        return;
      case 8:
        const field8 = {
          isBubble: false,
          fieldName: "Input Phone",
          fieldType: 8,
          count: fieldTypeCount[7] + 1,
        };
        incrementFieldTypeCount(7, 1);
        setFormBot((prev) => [...prev, field8]);
        return;
      case 9:
        const field9 = {
          isBubble: false,
          fieldName: "Input Date",
          fieldType: 9,
          count: fieldTypeCount[8] + 1,
        };
        incrementFieldTypeCount(8, 1);
        setFormBot((prev) => [...prev, field9]);
        return;
      case 10:
        const field10 = {
          isBubble: false,
          fieldName: "Input Rating",
          fieldType: 10,
          count: fieldTypeCount[9] + 1,
        };
        incrementFieldTypeCount(9, 1);
        setFormBot((prev) => [...prev, field10]);
        return;
      case 11:
        const field11 = {
          isBubble: false,
          fieldName: "Input Button",
          fieldType: 11,
          fieldValue: "",
          count: fieldTypeCount[10] + 1,
          error: false,
        };
        incrementFieldTypeCount(10, 1);
        setFormBot((prev) => [...prev, field11]);
        return;
      default:
        return;
    }
  };

  // delete function
  const handleDelete = (ind) => {
    if (formBot.length === 0 || ind < 0 || ind >= formBot.length) {
      return;
    }

    const deletedItem = formBot[ind];
    const fieldType = deletedItem.fieldType;

    const updateFormBot = formBot;
    for (let i = ind + 1; i < formBot.length; i++) {
      if (formBot[i].fieldType === fieldType) {
        updateFormBot[i].count -= 1;
      }
    }
    const updatedFormBot = updateFormBot.filter((form, i) => i !== ind);
    setFormBot(updatedFormBot);
    incrementFieldTypeCount(fieldType - 1, -1);
  };

  useEffect(() => {
    if (
      formRefs.current &&
      formRefs.current.length &&
      formRefs.current[scrollIndex]
    ) {
      formRefs.current[scrollIndex].scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollIndex]);
  return (
    <div className={styles.container}>
      <div className={styles.formMenu}>
        <div className={styles.bubbles}>
          <div className={`${styles.formText} open-sans-semibold font-14`}>
            Bubbles
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formInput} onClick={() => handleFormBot(1)}>
              <PiChatLight className={styles.bubbleIcon} /> Text
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(2)}>
              <PiImageSquareBold className={styles.bubbleIcon} /> Image
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(3)}>
              <FiFilm className={styles.bubbleIcon} /> Video
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(4)}>
              <MdGif className={`${styles.bubbleIcon} ${styles.gif}`} />
              Gif
            </div>
          </div>
        </div>
        <div className={styles.input}>
          <div className={`${styles.formText} open-sans-semibold font-14`}>
            Input
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formInput} onClick={() => handleFormBot(5)}>
              <PiTextTBold className={styles.inputIcon} /> Text
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(6)}>
              <FiHash className={styles.inputIcon} /> Number
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(7)}>
              <MdAlternateEmail className={styles.inputIcon} /> Email
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(8)}>
              <FiPhone className={styles.inputIcon} /> Phone
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(9)}>
              <FiCalendar className={styles.inputIcon} /> Date
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(10)}>
              <FaRegStar className={styles.inputIcon} /> Rating
            </div>
            <div className={styles.formInput} onClick={() => handleFormBot(11)}>
              <TbCheckbox className={styles.inputIcon} /> Buttons
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formBoard}>
        <div className={`${styles.start} border-none open-sans-semibold`}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0V21H2.625V0H0ZM5.25 0V10.5H10.5V13.125H21L15.75 7.95375L21 2.625H13.125V0L5.25 0Z"
              fill="white"
            />
          </svg>
          Start
        </div>
        <div className={styles.formList}>
          {formBot.map((form, ind) => (
            <FormInput
              key={ind}
              form={form}
              ref={(el) => (formRefs.current[ind] = el)}
              deleteFun={handleDelete}
              index={ind}
              handleChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormFlow;
