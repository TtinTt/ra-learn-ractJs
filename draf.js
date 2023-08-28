messApi
  .updateMess(messShowing.id, newMess)
  .then((response) => {
    handleClose();
    fetchMesss();
    setLoading(false); // Cập nhật trạng thái loading ở đây
  })
  .catch((error) => {
    alert(error.response.statusText);
    setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
  });
