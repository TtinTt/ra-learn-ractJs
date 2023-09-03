productApi
  .updateProduct(newProduct.product_id, formData)
  .then(() => {
    // for (let pair of formData.entries()) {
    //   console.log("FormData2:", pair[0] + ", " + pair[1]);
    // }
    authApi
      .getAuth()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    alert(error.response?.statusText);
  });
