import axiosInstance from "./axiosInstance";

// Authentication
export const loginWithGoogle = () => axiosInstance.get("/auth/google");
export const logout = () => axiosInstance.post("/auth/logout");

// Skills
export const getSkills = () => axiosInstance.get("/skills");
export const createSkill = (payload: Record<string, any>) => axiosInstance.post("/skills", payload);
export const getSkillById = (id: string) => axiosInstance.get(`/skills/${id}`);
export const updateSkill = (id: string, payload: Record<string, any>) => axiosInstance.put(`/skills/${id}`, payload);
export const deleteSkill = (id: string) => axiosInstance.delete(`/skills/${id}`);

// Users
export const getUserProfile = () => axiosInstance.get("/users/profile");
export const getAllUsers = () => axiosInstance.get("/users/all");
export const updateUserProfile = (payload: Record<string, any>) => axiosInstance.patch("/users/profile/update", payload);
