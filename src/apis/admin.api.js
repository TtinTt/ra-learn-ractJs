import api, { getHeaders } from "./api";

const searchAdmins = async (params = {}) => {
  return await api
    .get("/admins", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const createAdmin = async (requestBody) => {
  return await api
    .postForm("/admins", requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getAdminByAdminId = async (adminId) => {
  return await api
    .get(`/admins/${adminId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const updateAdmin = async (adminId, requestBody) => {
  //   await console.log("requestBody", requestBody);

  return await api
    .put(`/admins/${adminId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      return error;
    });
};

const deleteAdmin = async (adminId) => {
  return await api
    .delete(`/admins/${adminId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const addAdmin = async (requestBody) => {
  return await api
    .post("/admins", requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default {
  searchAdmins,
  createAdmin,
  getAdminByAdminId,
  updateAdmin,
  deleteAdmin,
  addAdmin,
};
