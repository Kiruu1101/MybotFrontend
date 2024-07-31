import React, { useEffect, useRef, useState } from "react";
import styles from "./formbot.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUserForm } from "../../Apis/form";
import FormBotInput from "../FormBotInput/FormBotInput";
import { v4 as uuid } from "uuid";
import FormBotBubble from "../FormBotBubble/FormBotBubble";
import CircularLoader from "../CircularLoader/CircularLoader";

const FormBot = ({ themes, trial }) => {
  const { formId } = useParams();
  const [formField, setFormField] = useState([]);
  const [displayFormField, setDisplayFormField] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState("");
  const [isProcessing, setisProcessing] = useState(false);
  const [theme, setTheme] = useState(1);
  const ref = useRef(null);

  useEffect(() => {
    const id = uuid();
    setSessionId(id);
  }, []);

  useEffect(() => {
    setTheme(themes);
  }, [themes]);
  useEffect(() => {
    if (index > 0 && index <= formField?.length) {
      if (!formField[index - 1].isBubble) {
        const field = { ...formField[index - 1], isDisabled: false };
        setDisplayFormField([...displayFormField, field]);
      } else {
        const updatefield = displayFormField;
        if (
          updatefield.length > 0 &&
          updatefield[updatefield.length - 1].isBubble
        ) {
          updatefield[updatefield.length - 1].showProfile = false;
        }
        const field = { ...formField[index - 1], showProfile: true };
        setDisplayFormField([...updatefield, field]);
      }
    } else if (index > formField?.length) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    //eslint-disable-next-line
  }, [index]);
  useEffect(() => {
    const getFormData = async () => {
      if (isProcessing) return;
      setisProcessing(true);
      const res = await getUserForm(formId);
      if (res?.form) {
        setFormField(res?.form);
        setTheme(res?.theme);
        setIndex(1);
        setisProcessing(false);
      }
    };
    getFormData();
    //eslint-disable-next-line
  }, []);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [index]);
  return (
    <>
      {isProcessing ? (
        <div className={`${styles.loader} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <div
          className={styles.container}
          ref={ref}
          style={{
            background:
              theme === 1
                ? "rgba(255, 255, 255, 1)"
                : theme === 2
                ? "rgba(23, 25, 35, 1)"
                : "rgba(80, 140, 155, 1)",
          }}
        >
          <div className={styles.formBox}>
            {displayFormField?.map((field, ind) => (
              <div key={ind}>
                {field.isBubble && (
                  <FormBotBubble
                    field={field}
                    index={index}
                    setIndex={setIndex}
                    displayFormField={displayFormField}
                    setDisplayFormField={setDisplayFormField}
                  />
                )}
                {!field.isBubble && (
                  <FormBotInput
                    field={field}
                    index={index}
                    setIndex={setIndex}
                    formId={formId}
                    sessionId={sessionId}
                    displayFormField={displayFormField}
                    setDisplayFormField={setDisplayFormField}
                    trial={trial}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FormBot;
