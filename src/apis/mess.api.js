import api, { getHeaders } from "./api";

const searchMesss = async (params = {}) => {
  return await api
    .get("/messs", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const createMess = async (requestBody) => {
  return await api
    .post("/messs", requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getMessByMessId = async (messId) => {
  return await api
    .get(`/messs/${messId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const updateMess = async (messId, requestBody) => {
  await console.log("requestBody mess", requestBody);

  return await api
    .put(`/messs/${messId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const deleteMess = async (messId) => {
  return await api
    .delete(`/messs/${messId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

export default {
  searchMesss,
  createMess,
  getMessByMessId,
  updateMess,
  deleteMess,
};
