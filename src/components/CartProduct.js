import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, changeQuantity } from "../actions/cartAction";
import { Changedot } from "../function/functionData";
function CartProduct() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let cart = userLogined.cart;
  const dispatch = useDispatch();
  let total = 0;
  cart.forEach((product) => {
    total = total + product.price * product.quantity;
  });
  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   console.log("LOGOUT");
  // };

  // // lấy dữ liệu search
  // const handleGetInput = async (event) => {
  //   dispatch(inputSearchBox(event.target.value));
  // };
  const handleChange = (e, id) => {
    const quantity = Number(e.target.value);

    if (quantity > 0) {
      dispatch(changeQuantity(id, quantity));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th colSpan={2}>Thông tin sản phẩm</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td className="p-0" style={{ width: "60px", height: "60px" }}>
                <img
                  style={{ width: "60px", height: "60px", object: "cover" }}
                  src={item.img[0]}
                ></img>
              </td>
              <td>{item.name}</td>
              <td>{Changedot(item.price)}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, item.id)}
                />
              </td>
              <td>{Changedot([item.price * item.quantity])}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>Tổng giá đơn hàng</td>
          <td>{Changedot([total])}</td>
        </tr>
      </tfoot>
    </Table>
  );
}

export default CartProduct;
