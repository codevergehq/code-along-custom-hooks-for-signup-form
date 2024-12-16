import React from "react";
import "../styles/SignupForm.css";

function SignupForm() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = React.useState({});
    const [touched, setTouched] = React.useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email format";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(password))
            return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(password))
            return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(password))
            return "Password must contain at least one number";
        return "";
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) return "Please confirm your password";
        if (confirmPassword !== formData.password) return "Passwords do not match";
        return "";
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Immediate validation for better user experience
        let error = "";
        switch (name) {
            case "email":
                if (touched["email"]) {
                    error = validateEmail(value);
                }
                break;
            case "password":
                error = validatePassword(value);
                // Also validate confirm password if it exists
                if (formData.confirmPassword) {
                    setErrors((prev) => ({
                        ...prev,
                        confirmPassword: validateConfirmPassword(formData.confirmPassword),
                    }));
                }
                break;
            case "confirmPassword":
                if (touched["confirmPassword"]) {
                    error = validateConfirmPassword(value);
                }
                break;
            default:
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate all fields
        const newErrors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            confirmPassword: validateConfirmPassword(formData.confirmPassword),
        };

        setErrors(newErrors);
        setTouched({
            email: true,
            password: true,
            confirmPassword: true,
        });

        // Check if there are any errors
        if (!Object.values(newErrors).some((error) => error !== "")) {
            // Form is valid, proceed with submission
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