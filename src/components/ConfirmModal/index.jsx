"use client";
import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeIcon}
          onClick={onCancel}
          aria-label="Close"
        >
          &#10006;
        </button>

        <h3>{title}</h3>
        <p>{message}</p>

        <div className={styles.modalActions}>
          <button onClick={onCancel} className={styles.cancelBtn}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
