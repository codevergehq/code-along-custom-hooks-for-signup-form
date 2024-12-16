import React from "react";
import "../styles/form.css";
import {useForm} from "../hooks/useForm.jsx";
import {validationRules} from "../utils/validationRules.js";

function SignupForm() {
    const initialState = {
        email: "",
        password: "",
        confirmPassword: "",
    }

    const {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateForm
    } = useForm(initialState, validationRules)


    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateForm()) {
            console.log("Form submitted:", formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                />
                {touched.email && errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                />
                {touched.password && errors.password && <span>{errors.password}</span>}
            </div>

            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Confirm Password"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                    <span>{errors.confirmPassword}</span>
                )}
            </div>

            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;