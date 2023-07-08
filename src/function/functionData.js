import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React from "react";
export const removeAccentsUpperCase = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
};

export const getStatus = (orderStatus) => {
  if (orderStatus === "0") {
    return "Đang xử lý thông tin đơn hàng";
  } else if (orderStatus === "1") {
    return "Đơn hàng đang được chuẩn bị";
  } else if (orderStatus === "2") {
    return "Đơn hàng đang được giao tới";
  } else if (orderStatus === "3") {
    return "Đơn hàng đã được giao thành công";
  } else if (orderStatus === "4") {
    return "Giao hàng không thành công và đang chuyển hoàn";
  } else if (orderStatus === "5") {
    return "Đơn hàng đã được chuyển hoàn";
  } else if (orderStatus === "-1") {
    return "Đơn hàng đã bị huỷ";
  } else if (orderStatus === "-2") {
    return "Đơn hàng bị từ chối";
  }
};

export const hanleGetColor = (orderStatus) => {
  if (orderStatus === "0") {
    return "#D7D7D7";
  } else if (orderStatus === "1") {
    return "PaleGoldenRod";
  } else if (orderStatus === "2") {
    return "PaleGoldenRod";
  } else if (orderStatus === "3") {
    return "PaleGoldenRod";
  } else if (orderStatus === "4") {
    return "PaleGoldenRod";
  } else if (orderStatus === "5") {
    return "#ffdab9";
  } else if (orderStatus === "-1") {
    return "#ffdab9";
  } else if (orderStatus === "-2") {
    return "#ffdab9";
  } else return "none";
};

// lấy thời gian hiện tại và sửa dịnh dạng
export const getCurrentTimeString = () => {
  const now = new Date();
  const date = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = ("0" + now.getMinutes()).slice(-2);

  return `${hours}:${minutes} ${date}/${month}/${year}`;
};

// lấy số giờ từ thời điểm hiện tại đến một thời điểm khác (truyền vào dưới dạng string)
export const getDaysDifference = (dateString) => {
  const [time, date] = dateString.split(" ");
  const [hour, minute] = time.slice(0, -1).split(":");
  const [day, month, year] = date.split("/");

  const now = new Date();
  const dateObject = new Date(year, month - 1, day, hour, minute);

  const differenceInTime = now.getTime() - dateObject.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600);

  return Math.abs(Math.round(differenceInDays));
};

// console.log(getCurrentTimeString());
// Output: "18h50 30-12-2023"
// console.log(getDaysDifference("18h50 30-12-2023"));
// Output: <số ngày từ thời điểm hiện tại đến ngày 30-12-2023>

// cắt đoạn string ngắn lại và thêm ...
export const TruncateString = (str, lenInput) => {
  if (str.length > lenInput) {
    return str.substring(0, lenInput) + "...";
  } else {
    return str;
  }
};

// cắt lấy tên từ họ và tên ...
export const TruncateName = (name, lenInput) => {
  let fullName = name.split(" ");
  let Fname = fullName[fullName.length - 1];
  if (Fname.length > lenInput) {
    return Fname.substring(0, lenInput) + "...";
  } else {
    return Fname;
  }
};

// function xử lý số: bỏ dấu [.] hoặc thêm dấu [.] cho số tiền
export const Changedot = (money) => {
  money = money.toString();
  // money = JSON.stringify(money);
  if (money.includes("." || "đ")) {
    return Number(
      money
        .replace(/\s+/g, "") //xoá space
        .replace(/\./g, "") //xoá .
        .replace(/đ/g, "") //xoá đ
    );
  } else {
    let moneyEdit = money
      .replace(/\s+/g, "") //xoá space
      .replace(/\./g, "") //xoá .
      .replace(/đ/g, ""); //xoá đ
    return moneyEdit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  }
};

export const removeDot = (money) => {
  money = money.toString();

  return Number(
    money
      .replace(/\s+/g, "") //xoá space
      .replace(/\./g, "") //xoá .
      .replace(/đ/g, "") //xoá đ
  );
};

const sortPrice = (productList, sortOption) => {
  if (sortOption === 0) {
    // console.log(productList);

    return productList;
  } else if (sortOption === 2) {
    // console.log(productList);

    return productList.slice().sort((a, b) => a.price - b.price);
  } else if (sortOption === 1) {
    // console.log(productList);

    return productList.slice().sort((a, b) => b.price - a.price);
  } else {
    // console.log(productList);

    return productList;
  }
};

const sortPriceFrom = (productList, priceMax) => {
  // console.log("sortPriceFrom");

  if (priceMax === null) {
    return productList; // Trả về mảng gốc nếu price null
  }

  const sortedList = productList.filter((product) => product.price <= priceMax);

  return sortedList;
};

export const HandleFilter = () => {
  // lấy giá trị ô productListInput từ store
  const productListInput = useSelector(
    (state) => state.productReducer.products
  );

  // lấy option sort từ store
  const sortOption = useSelector((state) => state.productReducer.sort) ?? 0;

  // lấy max price sort từ store
  const priceFromValue =
    useSelector((state) => state.productReducer.priceFrom) ?? null;

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state) => state.productReducer.searchFilter) ?? "";

  // sắp xếp thứ tự tăng giảm
  let sortProductList = sortPrice(productListInput, sortOption);

  // sắp xếp chỉ hiển thị các sản phẩm có giá dưới priceFromValue
  let sortProductListFrom = sortPriceFrom(sortProductList, priceFromValue);

  // lấy listProducts lọc theo ô search
  let listSorted = sortProductListFrom.filter((product) =>
    removeAccentsUpperCase(product.name + product.tag + product.sku).includes(
      removeAccentsUpperCase(searchFilter).toUpperCase()
    )
  );
  // console.log(listSorted);
  return listSorted;
};

export const CheckLink = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.log("đường dẫn '", location.pathname, "'"); // Logs link
  }, [location]);

  return location.pathname;
};

// đổi "," trong string thành ", "
export const addSpace = (inputString) => {
  let removeSpace = inputString.toString().replace(/\s+/g, "");
  return removeSpace.replace(/,/g, ", ");
};

// đổi chuỗi có ", " thành mảng cắt bởi dấu phẩy
export const splitArray = (inputString) => {
  let removeSpace = inputString.replace(/\s+/g, "");
  return removeSpace.split(",");
};

const FilterOrders = (orders, filterOption) => {
  let filteredOrders;
  // console.log(orders);
  if (filterOption === 0) {
    filteredOrders = orders;
  } else if (filterOption === 1) {
    filteredOrders = orders.filter((order) =>
      ["0", "1", "2", "4"].includes(order.status)
    );
  } else if (filterOption === 2) {
    filteredOrders = orders.filter((order) =>
      ["-1", "-2", "3", "5"].includes(order.status)
    );
  }

  return filteredOrders;
};

export const HandleFilterOrder = () => {
  // lấy giá trị ô orderList từ store
  const orderList = useSelector((state) => state.orderReducer.orders);

  // lấy option filter từ store
  const filterOption = useSelector((state) => state.orderReducer.filter) ?? 0;

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state) => state.orderReducer.searchFilter) ?? "";

  // lọc theo filter
  let filteredOrders = FilterOrders(orderList, filterOption);
  // console.log(filteredOrders);

  // lấy listorders lọc theo ô search
  let listSorted = filteredOrders.filter((order) =>
    removeAccentsUpperCase(
      getEmailName(order.email) + order.address.name + order.address.phoneNumber
    ).includes(removeAccentsUpperCase(searchFilter).toUpperCase())
  );
  // console.log(listSorted);
  return listSorted;
};

export const HandleFilterUser = () => {
  // lấy giá trị ô userList từ store
  const userList = useSelector((state) => state.userReducer.users);

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state) => state.userReducer.searchFilter) ?? "";

  // lấy listUsers lọc theo ô search
  let listSorted = userList.filter((user) =>
    removeAccentsUpperCase(
      getEmailName(user.email) + user.name + user.phone
    ).includes(removeAccentsUpperCase(searchFilter).toUpperCase())
  );
  return listSorted;
};

// Tách phần trước @ để lấy tên email

const getEmailName = (email) => {
  if (email.includes("@")) {
    const emailParts = email.split("@");
    const emailName = emailParts[0];
    return emailName;
  } else {
    return email;
  }
};

export const HandleFilterMess = () => {
  // lấy giá trị ô messList từ store
  const messList = useSelector((state) => state.messReducer.messs);

  // lấy giá trị ô search
  const searchFilter =
    useSelector((state) => state.messReducer.searchFilter) ?? "";

  // lấy listMesss lọc theo ô search
  let listSorted = messList.filter((mess) =>
    removeAccentsUpperCase(
      getEmailName(mess.email) + mess.name + mess.phone
    ).includes(removeAccentsUpperCase(searchFilter).toUpperCase())
  );
  return listSorted;
};
