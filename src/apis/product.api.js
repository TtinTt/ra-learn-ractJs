import api, { getHeaders } from "./api";

const searchProducts = async (params = {}) => {
  return await api
    .get("/products", { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const createProduct = async (requestBody) => {
  const originalHeaders = getHeaders();

  return await api
    .post("/products", requestBody, {
      headers: {
        ...originalHeaders,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getProductByProductId = async (productId) => {
  return await api
    .get(`/products/${productId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const updateProduct = async (productId, requestBody) => {
  const originalHeaders = getHeaders();

  return await api
    .put(`/products/${productId}`, requestBody, {
      headers: {
        ...originalHeaders,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const deleteProduct = async (productId) => {
  return await api
    .delete(`/products/${productId}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getPrice = async (params = {}) => {
  return await api
    .get("/products/price", { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

const getTag = async (params = {}) => {
  return await api
    .get("/products/tag", { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

export default {
  getPrice,
  getTag,
  searchProducts,
  createProduct,
  getProductByProductId,
  updateProduct,
  deleteProduct,
};
