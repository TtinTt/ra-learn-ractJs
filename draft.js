function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

orders.forEach((order) => {
  if (order.email.toUpperCase().includes(inputvalue.toUpperCase())) {
    console.log(order);
    ordersSearch.push(order);
  }
});
