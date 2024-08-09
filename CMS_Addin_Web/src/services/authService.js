import httpClient from "../utils/httpClient";

const login = async (req) => {
  const response = await httpClient.post("/auth/login", req);
  return response.data;
};

const getProfile = async () => {
 const response = await httpClient.get("/auth/profile");
 return response.data;
};

const authService = {
  login,
  getProfile,
};

export default authService;