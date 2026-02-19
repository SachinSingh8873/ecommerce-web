// Email validation
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters" };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    return { valid: true, message: "Password is valid" };
};

// Shipping details validation
export const validateShippingDetails = (details: any): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!details.name || details.name.trim().length === 0) {
        errors.name = "Full name is required";
    }

    if (!details.email || !validateEmail(details.email)) {
        errors.email = "Valid email address is required";
    }

    if (!details.address || details.address.trim().length === 0) {
        errors.address = "Street address is required";
    }

    if (!details.city || details.city.trim().length === 0) {
        errors.city = "City is required";
    }

    if (!details.zip || details.zip.trim().length === 0) {
        errors.zip = "ZIP code is required";
    }

    if (details.zip && !/^\d{5}(?:-\d{4})?$/.test(details.zip.replace(/\s/g, ''))) {
        errors.zip = "ZIP code must be in a valid format";
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
};

// Form field validation
export const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
        case "name":
            if (!value || value.trim().length === 0) return "Name is required";
            if (value.length < 2) return "Name must be at least 2 characters";
            return null;

        case "email":
            if (!value || !validateEmail(value)) return "Valid email is required";
            return null;

        case "password":
            const passwordValidation = validatePassword(value);
            return passwordValidation.valid ? null : passwordValidation.message;

        case "address":
            if (!value || value.trim().length === 0) return "Address is required";
            if (value.length < 5) return "Address is too short";
            return null;

        case "city":
            if (!value || value.trim().length === 0) return "City is required";
            if (value.length < 2) return "City is too short";
            return null;

        case "zip":
            if (!value || value.trim().length === 0) return "ZIP code is required";
            if (!/^\d{5}(?:-\d{4})?$/.test(value.replace(/\s/g, ''))) {
                return "ZIP code must be in a valid format (e.g., 12345 or 12345-6789)";
            }
            return null;

        default:
            return null;
    }
};
