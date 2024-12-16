import React from "react";

export function useForm(initialState, validationRules) {
  // State management
  const [formData, setFormData] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  // Validate single field
  const validateField = (name, value) => {
    if (!validationRules[name]) return "";

    // Handle special case for confirm password
    if (name === "confirmPassword") {
      return validationRules[name](value, formData.password);
    }

    return validationRules[name](value);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Validate field and update errors
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    // Validate field and update errors
    const fieldError = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    const newTouched = {};

    // Validate all fields
    Object.keys(formData).forEach((fieldName) => {
      const fieldError = validateField(fieldName, formData[fieldName]);
      if (fieldError) {
        newErrors[fieldName] = fieldError;
      }
      newTouched[fieldName] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm
  };
}