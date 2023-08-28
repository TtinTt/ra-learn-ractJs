const fetchUsers = async () => {
  // console.log("đang lấy oder của user có email là ", userEmail);
  // setLoading(true); // Cập nhật trạng thái loading ở đây trước khi gọi API
  await userApi
    .searchUsers({
      name: searchValue,
      page: currentPage,
      limit: usersPerPage,
      sortType: filter,
    })
    .then((data) => {
      setUsers(data.records);
      setTotal(data.total);
      setLoading(false);
      if (data.total <= 10) {
        setCurrentPage(1);
      }
    })
    .catch((error) => {
      alert(error);
      if (error.response.status === 401) {
        alert(error.response.statusText);
        // navigate("/users");
      } else {
        alert(error.response.statusText);
        setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
      }
    });
};
