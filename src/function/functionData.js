import { useSelector } from "react-redux";

export const removeAccentsUpperCase = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toUpperCase();
};

// Hàm lấy thời gian hiện tại và format thành string
export const getCurrentTimeString = () => {
  const now = new Date();
  const date = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = ("0" + now.getMinutes()).slice(-2);

  return `${hours}h${minutes} ${date}-${month}-${year}`;
};

// Hàm lấy số ngày từ thời điểm hiện tại đến một thời điểm khác (truyền vào dưới dạng string)
export const getDaysDifference = (dateString) => {
  const [time, date] = dateString.split(" ");
  const [hour, minute] = time.slice(0, -1).split("h");
  const [day, month, year] = date.split("-");

  const now = new Date();
  const dateObject = new Date(year, month - 1, day, hour, minute);

  const differenceInTime = now.getTime() - dateObject.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.abs(Math.round(differenceInDays));
};

console.log(getCurrentTimeString()); // Output: "18h50 30-12-2023"
console.log(getDaysDifference("18h50 30-12-2023")); // Output: <số ngày từ thời điểm hiện tại đến ngày 30-12-2023>

export const TruncateString = (str, lenInput) => {
  if (str.length > lenInput) {
    return str.substring(0, lenInput) + "...";
  } else {
    return str;
  }
};
// function xử lý số: bỏ dấu [.] hoặc thêm dấu [.] cho số tiền
export const Changedot = (money) => {
  if (money.includes(".")) {
    let x = money.toString().replace(" đ", "");
    let y = x.toString().replace(".", "");
    let z = y.toString().replace(".", "");
    return z.toString().replace(".", "");
  } else {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  }
};

export const HandleFilter = (productListInput) => {
  const searchFilter =
    useSelector((state) => state.productReducer.searchFilter) ?? "";

  return productListInput.filter((product) =>
    removeAccentsUpperCase(product.name).includes(
      removeAccentsUpperCase(searchFilter).toUpperCase()
    )
  );
};
