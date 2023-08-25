const fetchOrders = async (keyword, page, NUMBER_RECORDS_PER_PAGE) => {
  // const navigate = useNavigate();

  await orderApi
    .searchOrders({
      name: searchFilter,
      page: currentPage,
      limit: ordersPerPage,
      maxPrice: priceFromValue,
      sortType: sortOption,
      category: link,
    })
    .then((data) => {
      setOrderList(data.records);
      setTotal(data.total);
    })
    .catch((error) => {
      alert(error);
      if (error.response.status === 401) {
        alert(error.response.statusText);
        // navigate("/orders");
      } else {
        alert(error.response.statusText);
      }
    });

  // setSelectedOrderIds([]);
};
