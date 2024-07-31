import React, { useEffect, useState } from "react";
import styles from "./formResponse.module.css";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getFormData } from "../../../Apis/form";
import { PiTextTBold } from "react-icons/pi";
import { FiHash } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { TbCheckbox } from "react-icons/tb";
import CircularLoader from "../../CircularLoader/CircularLoader";
import Icon from "../../Icon";

const FormResponse = () => {
  const params = useParams();
  const { formId } = params;
  const [formData, setFormData] = useState([]);
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(false);
  const [columnCount, setColumnCount] = useState(0);

  const ICON = [
    { id: 1, Icon: PiTextTBold },
    { id: 2, Icon: FiHash },
    { id: 3, Icon: MdAlternateEmail },
    { id: 4, Icon: FiPhone },
    { id: 5, Icon: FiCalendar },
    { id: 6, Icon: FaRegStar },
    { id: 7, Icon: TbCheckbox },
  ];

  useEffect(() => {
    const getAllData = async () => {
      if (loading || !formId) return;
      setLoading(true);
      const res = await getFormData(formId);
      if (res) {
        setForm(res?.form);
        setFormData(res?.formDataEntries);
        const updateColumnCount = res?.form?.fields.filter(
          (field) => !field.isBubble
        ).length;
        setColumnCount(updateColumnCount);
      }
      setLoading(false);
    };
    getAllData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={`${styles.loader} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <>
          {!formId || !form || form?.views === 0 ? (
            <div className={`${styles.error} flexbox-center inter`}>
              No Response yet collected
            </div>
          ) : (
            <div className={styles.responses}>
              <div className={`${styles.cards} open-sans-semibold`}>
                <div className={styles.card}>
                  <div>Views</div>
                  <div className="open-sans">{form?.views}</div>
                </div>
                <div className={`${styles.card} open-sans-semibold`}>
                  <div>Start</div>
                  <div className="open-sans">{form?.start}</div>
                </div>
                <div className={`${styles.card} open-sans-semibold`}>
                  <div>Completion rate</div>
                  <div className="open-sans">
                    {((form?.end / form?.views) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className={styles.responsesTable} >
                <table
                  style={{
                    width: "50%",
                    borderCollapse: "collapse",
                    tableLayout: "fixed",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "40px" }}></th>
                      <th>
                        <div className={styles.theader}>
                          <FiCalendar
                            style={{ width: "20px", height: "20px" }}
                          />{" "}
                          Submitted On
                        </div>
                      </th>
                      {form?.fields.map(
                        (field, index) =>
                          !field.isBubble && (
                            <th key={index}>
                              <div className={styles.theader}>
                                <Icon Icon={ICON[field.fieldType - 5]?.Icon} />{" "}
                                {field.fieldName} {field.fieldTypeCount}{" "}
                              </div>
                            </th>
                          )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {formData?.map((data, index) => (
                      <tr key={index}>
                        <td
                          style={{ width: "40px", whiteSpace: "nowrap" }}
                          className={styles.srno}
                        >
                          {index + 1}
                        </td>
                        <td>
                          {moment(data.createdAt).format("MMM Do YYYY, h:mm a")}
                        </td>
                        {Object.entries(data.data).map(([key, value], ind) => (
                          <td key={ind}>{value}</td>
                        ))}

                        {Array.from({
                          length:
                            columnCount - Object.entries(data.data).length,
                        }).map((_, ind) => (
                          <td key={`empty-${ind}`}></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FormResponse;
