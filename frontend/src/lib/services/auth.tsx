"use server";

import axios from "axios";
import Cookies from "js-cookie";
import { RegisterFormSchemaTypes } from "../types/types";

export const registerWithoutInvite = async (data: RegisterFormSchemaTypes) => {
    try {
        await axios.post(
            `/api/auth/signup/`,
            {
                email: data.email,
                password: data.password,
                confirm_password: data.confirmPassword,
                newsletter: data.newsletter,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            },
        );
        console.log("User registered successfully");
    } catch (error) {
        throw error;
    }
};
