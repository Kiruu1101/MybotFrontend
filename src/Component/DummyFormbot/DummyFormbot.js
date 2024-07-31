import React, { useEffect, useState } from "react";
import styles from "./dummyFormbot.module.css";
import { BiSend } from "react-icons/bi";

const DummyFormbot = ({ index, setIndex, DummyForm }) => {
  const [formField, setFormField] = useState([]);
  const [displayFormField, setDisplayFormField] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    if (index > 0 && index <= formField?.length) {
      if (!formField[index - 1].isBubble) {
        const field = {
          ...formField[index - 1],
          isDisabled: false,
          isLoading: true,
        };
        setDisplayFormField([...displayFormField, field]);
      } else {
        const updatefield = displayFormField;
        if (
          updatefield.length > 0 &&
          updatefield[updatefield.length - 1].isBubble
        ) {
          updatefield[updatefield.length - 1].showProfile = false;
        }
        const field = {
          ...formField[index - 1],
          showProfile: true,
          isLoading: true,
        };
        setDisplayFormField([...updatefield, field]);
      }
      setRender(render + 1);
    }
    //eslint-disable-next-line
  }, [index]);
  useEffect(() => {
    const getFormData = () => {
      if (DummyForm?.form) {
        setFormField(DummyForm?.form);
        setIndex(1);
      }
    };
    getFormData();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const delay = async () => {
      if (displayFormField.length === 0) return;
      setTimeout(() => {
        const updatefield = displayFormField;
        updatefield[updatefield.length - 1].isLoading = false;
        setDisplayFormField([...updatefield]);
        if (displayFormField[displayFormField.length - 1].isBubble) {
          setIndex(index + 1);
        }
      }, 2000);
    };
    delay();
    //eslint-disable-next-line
  }, [render]);

  const handleSubmit = async (field) => {
    if (field.isDisabled) return;
    const updatedFields = displayFormField.map((fields, index) =>
      index === displayFormField.length - 1
        ? { ...fields, isDisabled: true }
        : fields
    );
    setDisplayFormField(updatedFields);
    setIndex(index + 1);
  };

  const handleChange = (e, field) => {
    if (field.isDisabled) return;
    const { value } = e.target;
    setDisplayFormField(
      displayFormField.map((fields) =>
        fields._id === field._id ? { ...fields, fieldValue: value } : fields
      )
    );
  };
  const updateRating = (field, rating) => {
    if (field.isDisabled) return;
    setDisplayFormField(
      displayFormField.map((fields) =>
        fields._id === field._id ? { ...fields, fieldValue: rating } : fields
      )
    );
  };
  const handleButton = async (field) => {
    if (field.isDisabled) return;
    const updatedFields = displayFormField.map((fields, index) =>
      index === displayFormField.length - 1
        ? { ...fields, isDisabled: true }
        : fields
    );
    setDisplayFormField(updatedFields);
    setIndex(index + 1);
  };

  return (
    <div
      className={styles.container}
      style={{
        background:
          "linear-gradient(0deg, #121212, #121212),linear-gradient(0deg, #171923, #171923),linear-gradient(0deg, #171923, #171923)",
      }}
    >
      <div className={styles.formBox}>
        {displayFormField?.map((field, ind) => (
          <div key={ind}>
            {field.isBubble && (
              <div
                className={styles.bubblecontainers}
                style={{ alignItems: "end" }}
              >
                <div
                  className={styles.profile}
                  style={{ visibility: !field.showProfile && "hidden" }}
                ></div>
                <div className={styles.bubbleContainer}>
                  {field.isLoading ? (
                    <div className={styles.dotFlashing}></div>
                  ) : (
                    <>
                      {field.fieldType === 1 && (
                        <div className={styles.text}>{field?.fieldValue}</div>
                      )}
                      {(field.fieldType === 2 || field.fieldType === 4) && (
                        <img
                          src={field.fieldValue}
                          alt="bubbleImg"
                          className={styles.media}
                        />
                      )}{" "}
                      {field.fieldType === 3 && (
                        <video className={styles.media} controls>
                          <source src={field.fieldValue} type="video/mp4" />
                        </video>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
            {!field.isBubble && (
              <div className={styles.inputContainers}>
                {field.isLoading ? (
                  <div className={styles.dotContainer}>
                    <div className={styles.dotFlashing}></div>
                  </div>
                ) : field.fieldType === 11 ? (
                  <div
                    className={`${
                      styles.button
                    } open-sans-semibold cursor-pointer ${
                      field.isDisabled && styles.disabled
                    }`}
                    onClick={() => handleButton(field)}
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
                          value={field.fieldValue}
                          disabled={field.isDisabled}
                          onChange={(e) => handleChange(e, field)}
                        />
                      )}
                      {field.fieldType === 6 && (
                        <input
                          type="number"
                          placeholder="Enter a number"
                          className={`${styles.input} open-sans-semibold ${
                            field.isDisabled && styles.inputDisabled
                          }`}
                          value={field.fieldValue}
                          disabled={field.isDisabled}
                          onChange={(e) => handleChange(e, field)}
                        />
                      )}
                      {field.fieldType === 7 && (
                        <input
                          type="email"
                          placeholder="Enter your Email"
                          className={`${styles.input} open-sans-semibold ${
                            field.isDisabled && styles.inputDisabled
                          }`}
                          value={field.fieldValue}
                          disabled={field.isDisabled}
                          onChange={(e) => handleChange(e, field)}
                        />
                      )}
                      {field.fieldType === 8 && (
                        <input
                          type="tel"
                          placeholder="Enter your Phone"
                          className={`${styles.input} open-sans-semibold ${
                            field.isDisabled && styles.inputDisabled
                          }`}
                          value={field.fieldValue}
                          disabled={field.isDisabled}
                          onChange={(e) => handleChange(e, field)}
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
                          value={field.fieldValue}
                          disabled={field.isDisabled}
                          onChange={(e) => handleChange(e, field)}
                        />
                      )}
                      {field.fieldType === 10 && (
                        <div className={styles.ratings}>
                          <div
                            className={`${styles.rating} ${
                              field.fieldValue === 1 && styles.disabled
                            }`}
                            onClick={(e) => updateRating(field, 1)}
                          >
                            1
                          </div>
                          <div
                            className={`${styles.rating} ${
                              field.fieldValue === 2 && styles.disabled
                            }`}
                            onClick={(e) => updateRating(field, 2)}
                          >
                            2
                          </div>
                          <div
                            className={`${styles.rating} ${
                              field.fieldValue === 3 && styles.disabled
                            }`}
                            onClick={(e) => updateRating(field, 3)}
                          >
                            3
                          </div>
                          <div
                            className={`${styles.rating} ${
                              field.fieldValue === 4 && styles.disabled
                            }`}
                            onClick={(e) => updateRating(field, 4)}
                          >
                            4
                          </div>
                          <div
                            className={`${styles.rating} ${
                              field.fieldValue === 5 && styles.disabled
                            }`}
                            onClick={(e) => updateRating(field, 5)}
                          >
                            5
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`${
                        styles.send
                      } cursor-pointer flexbox-center ${
                        field.isDisabled && styles.inputDisabled
                      }`}
                      onClick={() => handleSubmit(field)}
                    >
                      <BiSend className={styles.icon} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummyFormbot;
