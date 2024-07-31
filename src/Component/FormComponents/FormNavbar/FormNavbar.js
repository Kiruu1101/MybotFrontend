import React, { useEffect, useState } from "react";
import styles from "./formNavbar.module.css";
import { IoMdClose } from "react-icons/io";
import FormFlow from "../FormFlow/FormFlow";
import FormTheme from "../FormTheme/FormTheme";
import FormResponse from "../FormResponse/FormResponse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createForm, getForm, updateForm } from "../../../Apis/form";
import { useParams } from "react-router-dom";
import Spinner from "./../../Spinner/Spinner";

const FormNavbar = () => {
  const [formBot, setFormBot] = useState([]);
  const [theme, setTheme] = useState(1);
  const [formName, setFormName] = useState("");
  const [navigation, setNavigation] = useState(0);
  const initialArray = Array.from({ length: 11 }, () => 0);
  const [fieldTypeCount, setFieldTypeCount] = useState(initialArray);
  const navigate = useNavigate();
  const params = useParams();
  const { formId } = params;
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    if (!params?.formId || loading) return;
    const homepageUrl = window?.location?.origin;
    navigator.clipboard
      .writeText(homepageUrl + "/form/" + params?.formId)
      .then(() => {
        toast.success("Link copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const handleSubmit = async () => {
    const updateError = [...formBot];
    let errorCount = 0;
    for (let i = 0; i < formBot.length; i++) {
      if ([1, 2, 3, 4, 11].includes(formBot[i].fieldType)) {
        if (formBot[i].fieldValue.trim().length === 0) {
          updateError[i].error = true;
          errorCount++;
        } else {
          updateError[i].error = false;
        }
      }
    }
    setFormBot(updateError);
    if (errorCount > 0) {
      toast.error("Fill all required Field");
      return;
    }
    if (!formName || formName.trim().length === 0) {
      toast.error("Enter Form Name");
      return;
    }
    if (formId) {
      setLoading(true);
      await updateForm(
        {
          fields: formBot,
          theme,
          formName,
          folder: params.folderId,
          fieldTypeArray: fieldTypeCount,
        },
        formId
      );
      setLoading(false);
    } else {
      setLoading(true);
      const res = await createForm({
        fields: formBot,
        theme,
        formName,
        folder: params.folderId,
        fieldTypeArray: fieldTypeCount,
      });
      setLoading(false);
      if (res?.form) {
        if (params.folderId) {
          navigate(`/workspace/${params.folderId}/form/${res?.form}`, {
            replace: true,
          });
        } else {
          navigate(`/workspace/form/${res?.form}`, { replace: true });
        }
      }
    }
  };

  useEffect(() => {
    const getFormData = async () => {
      const res = await getForm(formId);
      if (res?.form) {
        setTheme(res?.form?.theme);
        setFormName(res?.form?.name);
        const updateForm = [];
        const freqArray = Array.from({ length: 11 }, () => 0);
        res?.form?.fields.forEach((field) => {
          if ([1, 2, 3, 4, 11].includes(field.fieldType)) {
            const fieldWithError = {
              ...field,
              error: "",
              count: field.fieldTypeCount,
            };
            delete fieldWithError.fieldTypeCount;
            updateForm.push(fieldWithError);
          } else {
            const changeCount = {
              ...field,
              count: field.fieldTypeCount,
            };
            delete changeCount.fieldTypeCount;
            updateForm.push(changeCount);
          }
          freqArray[field.fieldType - 1] = Math.max(
            freqArray[field.fieldType - 1],
            field.fieldTypeCount
          );
        });
        setFieldTypeCount(freqArray);
        setFormBot(updateForm);
      }
    };
    if (formId) {
      getFormData();
    }
  }, [formId]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.formName}>
          <input
            className={`${styles.input} open-sans-semibold`}
            type="text"
            placeholder="Enter form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        <div className={styles.links}>
          <div
            className={`${styles.link} open-sans-semibold cursor-pointer ${
              navigation === 0 && styles.active
            }`}
            onClick={() => setNavigation(0)}
          >
            Flow
          </div>
          <div
            className={`${styles.link} open-sans-semibold cursor-pointer ${
              navigation === 1 && styles.active
            }`}
            onClick={() => setNavigation(1)}
          >
            Theme
          </div>
          <div
            className={`${styles.link} open-sans-semibold cursor-pointer ${
              navigation === 2 && styles.active
            }`}
            onClick={() => setNavigation(2)}
          >
            Response
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${styles.share} cursor-pointer open-sans-semibold`}
            onClick={() => handleCopy()}
          >
            Share
          </button>
          <button
            className={`${styles.btn} ${styles.save} cursor-pointer open-sans-semibold`}
            onClick={handleSubmit}
          >
            {loading ? <Spinner /> : "Save"}
          </button>
          <IoMdClose
            className={`${styles.close} cursor-pointer`}
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <>
        {navigation === 0 ? (
          <FormFlow
            formBot={formBot}
            setFormBot={setFormBot}
            fieldTypeCount={fieldTypeCount}
            setFieldTypeCount={setFieldTypeCount}
          />
        ) : navigation === 1 ? (
          <FormTheme theme={theme} setTheme={setTheme} />
        ) : (
          <FormResponse />
        )}
      </>
    </div>
  );
};

export default FormNavbar;
