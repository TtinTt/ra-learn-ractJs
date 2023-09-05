import api, { getHeaders } from "./api";

const searchUsers = async (params = {}) => {
  return await api
    .get("/users", { params: params, headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      throw error;
    });
};

// const createUser = async (requestBody) => {
//   return await api
//     .postForm("/users", requestBody, { headers: getHeaders() })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("API Error", error);
//       throw error;
//     });
// };

// const getUserByUserId = async (userId) => {
//   return await api
//     .get(`/users/${userId}`, { headers: getHeaders() })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("API Error", error);
//       throw error;
//     });
// };

const updateUser = async (userId, requestBody) => {
  //   await console.log("requestBody", requestBody);

  return await api
    .put(`/users/${userId}`, requestBody, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API Error", error);
      return error;
    });
};

// const deleteUser = async (userId) => {
//   return await api
//     .delete(`/users/${userId}`, { headers: getHeaders() })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("API Error", error);
//       throw error;
//     });
// };

export default {
  searchUsers,
  updateUser,
  // deleteUser,
  // createUser,
  // getUserByUserId,
};
