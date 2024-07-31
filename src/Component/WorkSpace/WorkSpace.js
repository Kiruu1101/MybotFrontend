import React, { useContext, useEffect, useState } from "react";
import styles from "./workSpace.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiFolderPlus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Tooltip } from "antd";
import {
  createFolder,
  deleteFolder,
  deleteForm,
  getAllFolder,
  getAllForm,
} from "../../Apis/form";
import CreateFolderModal from "../CreateFolderModal/CreateFolderModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import { logout } from "../../context/authContext/AuthAction";
import CircularLoader from "../CircularLoader/CircularLoader";

const WorkSpace = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const { folderId } = useParams();
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [folders, setFolders] = useState([]);
  const [isFormDelete, setIsFormDelete] = useState(false);
  const [forms, setForms] = useState();
  const [formLoader, setFormLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleCreateFolderModalOpen = () => {
    setIsCreateFolderModalOpen(true);
  };

  const handleCreateFolderModalCancel = () => {
    setIsCreateFolderModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteItem({});
  };

  const handleDeleteModalOpen = (event, item, isForm) => {
    event.stopPropagation();
    setDeleteItem(item);
    setIsDeleteModalOpen(true);
    setIsFormDelete(isForm);
  };

  const handleDeleteFolder = async (folderId) => {
    const res = await deleteFolder(folderId);
    if (res) {
      const updateFolder = folders.filter((folder) => folder._id !== folderId);
      setFolders(updateFolder);
    }
  };

  const handleDeleteForm = async (formId) => {
    const res = await deleteForm(folderId);
    if (res) {
      const updateForm = forms.filter((form) => form._id !== formId);
      setForms(updateForm);
    }
  };

  const handleCreateFolder = async (data) => {
    const res = await createFolder(data);
    if (res?.folder) {
      setFolders((prevFolders) => [...prevFolders, res.folder]);
    }
  };

  useEffect(() => {
    const fetchFolder = async () => {
      setLoader(true);
      const res = await getAllFolder();
      setFolders(res?.folders || []);
      if (!folderId) {
        setForms(res?.forms || []);
      }
      setLoader(false);
    };
    fetchFolder();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchForm = async () => {
      if (!folderId) return;
      setFormLoader(true);
      const res = await getAllForm(folderId);
      setForms(res?.forms?.forms || []);
      setFormLoader(false);
    };
    fetchForm();
  }, [folderId]);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.header} open-sans-semibold flexbox-center`}
        onClick={handleShowMenu}
      >
        <div className={`${styles.menu}`}>
          <div className={`${styles.userName} opens-sans-semibold`}>
            <div
              style={{
                width: "220px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {user?.name}'s workspace
            </div>
            <IoIosArrowUp className={styles.icon} />
          </div>
        </div>
        {showMenu && (
          <div className={`${styles.userMenu} opens-sans-semibold`}>
            <div className={`${styles.username} cursor-pointer`}>
              <div
                style={{
                  width: "220px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {user?.name}'s workspace
              </div>
              <IoIosArrowDown className={styles.icon} />{" "}
            </div>
            <div
              onClick={() => navigate("/setting")}
              className={`${styles.setting} cursor-pointer`}
            >
              Settings
            </div>
            <div
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              className={`${styles.logout} cursor-pointer`}
            >
              Logout
            </div>
          </div>
        )}
      </div>
      {loader ? (
        <div className={`${styles.loader} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <div className={`${styles.main}`}>
          <div className={styles.folderContainer}>
            <button
              className={`${styles.folder} border-none open-sans-semibold cursor-pointer`}
              onClick={handleCreateFolderModalOpen}
            >
              <FiFolderPlus />
              <span className={`${styles.folderName} ellipsis`}>
                {" "}
                Create a folder
              </span>
            </button>

            {folders.length > 0 &&
              folders?.map((folder, index) => (
                <button
                  key={folder._id}
                  className={`${
                    styles.folder
                  } border-none open-sans-semibold cursor-pointer ${
                    folder._id === folderId && styles.active
                  }`}
                  onClick={() => navigate(`/workspace/${folder._id}`)}
                >
                  <span className={`${styles.folderName} ellipsis`}>
                    <Tooltip
                      placement="top"
                      key={folder?._id}
                      title={folder?.name}
                      trigger={window.cordova ? "click" : "hover"}
                      style={{ overflow: "auto", height: "200px" }}
                    >
                      {folder?.name}
                    </Tooltip>
                  </span>
                  <RiDeleteBin6Fill
                    className={styles.deleteIcon}
                    onClick={(event) =>
                      handleDeleteModalOpen(event, folder, false)
                    }
                  />
                </button>
              ))}
          </div>

          <div className={styles.formContainer}>
            {formLoader ? (
              <div className={`${styles.formLoader} flexbox-center`}>
                <CircularLoader />
              </div>
            ) : (
              <>
                <button
                  className={`${styles.form} flexbox-center open-sans cursor-pointer`}
                  onClick={() =>
                    navigate(
                      folderId
                        ? `../workspace/${folderId}/form/`
                        : "../workspace/form/"
                    )
                  }
                >
                  <IoMdAdd className={styles.add} />
                  Create a typebot
                </button>
                {forms?.length > 0 &&
                  forms?.map((form, index) => (
                    <button
                      key={form._id}
                      className={`${styles.form} ${styles.formName} flexbox-center open-sans cursor-pointer`}
                      onClick={() =>
                        navigate(
                          folderId
                            ? `../workspace/${folderId}/form/${form._id}`
                            : `../workspace/form/${form._id}`
                        )
                      }
                    >
                      <span className={`${styles.formname} ellipsis`}>
                      <Tooltip
                        placement="top"
                        key={form?._id}
                        title={form?.name}
                        trigger={window.cordova ? "click" : "hover"}
                        style={{ overflow: "auto", height: "200px" }}
                      >
                        {form?.name}
                      </Tooltip>
                      </span>
                      <RiDeleteBin6Fill
                        className={`${styles.deleteIcon} ${styles.formDelete}`}
                        onClick={(event) =>
                          handleDeleteModalOpen(event, form, true)
                        }
                      />
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      )}

      <Modal
        closable={false}
        footer={null}
        open={isCreateFolderModalOpen}
        width={600}
        style={{
          top: 170,
          left: -100,
        }}
        destroyOnClose={true}
      >
        <CreateFolderModal
          cancel={handleCreateFolderModalCancel}
          confirm={handleCreateFolder}
        />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        open={isDeleteModalOpen}
        width={500}
        destroyOnClose={true}
      >
        <DeleteModal
          cancel={handleDeleteModalCancel}
          confirm={isFormDelete ? handleDeleteForm : handleDeleteFolder}
          text={
            <>
              Are you sure you want to delete{" "}
              <span
                className="open-sans-bold"
                style={{ color: "rgba(245, 80, 80, 1)" }}
              >
                {deleteItem.name}
              </span>
              {isFormDelete ? " form ?" : " folder ?"}
            </>
          }
          deleteItem={deleteItem}
        />
      </Modal>
    </div>
  );
};

export default WorkSpace;
