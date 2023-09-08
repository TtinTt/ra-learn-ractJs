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

const resetPass = async (email, codeResetPass, confirmPassword) => {
  console.log("email truyền vào", email);
  return await api
    .put("/users/resetpass", {
      email: email,
      code: codeResetPass,
      password: confirmPassword,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const sendCodeResetPass = async (email) => {
  console.log("email truyền vào", email);
  return await api
    .put("/users/getcode", { email: email })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
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
  sendCodeResetPass,
  resetPass,
  // deleteUser,
  // createUser,
  // getUserByUserId,
};
