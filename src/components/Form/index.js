"use client";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import styles from "@/css/Form.module.css";
import { useState, useEffect } from "react";

const Form = ({
  title = "Form",
  setEditData,
  fields = [],
  onSubmit,
  initialData = null,
  showInitially = false,
  onCancelEdit, // NEW: callback from parent
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(showInitially);

  // Autofill for edit
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setShowForm(true);
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmit) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({});
      setShowForm(false);
      if (onCancelEdit) onCancelEdit(); // reset edit state after submit
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    setShowForm(false);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <>
      {loading && <Loader />}
      {!showForm && (
        <Button
          onClick={() => {
            setShowForm(true);
            setEditData(null);
          }}
          variant="primary"
        >
          ➕ {title}
        </Button>
      )}

      {showForm && (
        <div className={styles.overlay}>
          <div className={styles.formCard}>
            <Button
              onClick={handleClose}
              variant="danger"
              className={styles.closeButton}
            >
              ✖
            </Button>

            <h2>{title}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.key}>
                  <label>{field.label}</label>
                  <input
                    type={field.type || "text"}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder || ""}
                    required={field.required}
                  />
                </div>
              ))}

              <Button type="submit" className={styles.submitButton}>
                {initialData ? "Update" : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
