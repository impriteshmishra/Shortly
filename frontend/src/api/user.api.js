import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email, password) => {
    const {data} = await axiosInstance.post("/api/v1/auth/login", {email, password});
    return data;
}

export const sendOtp = async (email) => {
    console.log(email);
    
  const res = await axiosInstance.post("/api/v1/auth/sendOtp", { email });
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await axiosInstance.post("/api/v1/auth/verifyOtp", { email, otp });
  return res.data;
};

export const registerUser = async (name, email, password) => {
    const {data} = await axiosInstance.post("/api/v1/auth/register", {name,email,password});
    return data;
}

export const logoutUser = async () => {
    const {data} = await axiosInstance.get("/api/v1/auth/logout");
    return data;
}

export const getCurrentUser = async () => {
    const {data} = await axiosInstance.get("/api/v1/auth/me");
    return data;
}

export const getAllUserUrls = async () => {
    const {data} = await axiosInstance.post("/api/v1/user/urls");
    return data;
}

export const makePremiumUser = async (userId, gateway) => {
    // console.log(userId, gateway);
    const response = await axiosInstance.post(`/api/v1/user/premium/${userId}`, {gateway});
    return response;
}

export const transactionFetch = async (sessionId) => {
    const response = await axiosInstance.get(`/api/v1/user/transaction/${sessionId}`);
    return response;
}