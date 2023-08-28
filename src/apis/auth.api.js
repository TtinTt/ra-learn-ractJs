import api, { getHeaders } from "./api";

const login = async (email, password, type) => {
  const requestBody = {
    email: email,
    password: password,
    type: type,
  };

  return await api
    .post("/login", requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

  // if (type == "customer") {
  //   return await api
  //     .post("/login", requestBody)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       throw error;
  //     });
  // } else if (type == "admin") {
  //   return await api
  //     .post("/admin/login", requestBody)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       throw error;
  //     });
  // }
};

const getAuth = async () => {
  console.log("getHeaders()", getHeaders());
  return await api
    .get("/auth", { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const logout = async () => {
  return await api
    .post("/logout", {}, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const register = async (requestBody) => {
  return await api
    .post("/register", requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default {
  login,
  getAuth,
  logout,
  register,
};
