import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useEffect, useMemo, useState } from "react";
import "../../css/ProductCard.css";
import {
  TruncateString,
  Changedot,
  addSpace,
  splitArray,
  removeDot,
} from "../../function/functionData";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import InputGroup from "react-bootstrap/InputGroup";
import {
  updateEditProduct,
  addProduct,
  deleteProduct,
} from "../../actions/adminAction";

function ProductCardAdmin({ render, i, product }) {
  // console.log(render);
  const [currentImg, setCurrentImg] = useState(product.img[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState(product);
  const [showConfirmDeleProduct, setShowConfirmDeleProduct] = useState(false);

  useEffect(() => {
    setCurrentImg(product.img[0]);
  }, [product]);
  useEffect(() => {
    setNewProduct(product);
  }, [product]);
  const handleChangeQuantity = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  const ConfirmDeleteProduct = () => {
    return (
      <>
        {" "}
        <Button
          variant="danger"
          onClick={handleDeleteProduct}
          style={{ marginRight: "5px !importan" }}
        >
          Xác nhận
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setShowConfirmDeleProduct(false);
          }}
        >
          Huỷ
        </Button>
      </>
    );
  };
  const handleChangeProduct = (event) => {
    let key = event.target.ariaLabel;
    if (key == "tag" || key == "img") {
      setNewProduct({
        ...newProduct,
        [key]: splitArray(event.target.value),
      });
    } else if (key == "comparative" || key == "price") {
      setNewProduct({
        ...newProduct,
        [key]: removeDot(event.target.value),
      });
    } else {
      setNewProduct({
        ...newProduct,
        [key]: event.target.value,
      });
    }

    // console.log(newProduct);
  };

  const handleSaveProduct = () => {
    // console.log(newProduct);
    dispatch(updateEditProduct(newProduct));
    handleClose();
  };
  const handleAddNewProduct = () => {
    // console.log(newProduct);
    dispatch(addProduct(newProduct));
    handleClose();
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product));
    handleClose();
    setShowConfirmDeleProduct(false);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setQuantity(1);
    setNewProduct(product);
  };
  const handleShow = () => setShow(true);

  const [indexCarousel, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const renderCarousel = newProduct.img.map((img, indexCarousel) => {
    return (
      <Carousel.Item>
        <img
          className="productImgLarger d-block w-100"
          alt="Hình ảnh lỗi"
          src={
            img == ""
              ? "https://img.freepik.com/premium-vector/product-concept-line-icon-simple-element-illustration-product-concept-outline-symbol-design-can-be-used-web-mobile-ui-ux_159242-2076.jpg?w=2000"
              : img
          }
        />{" "}
      </Carousel.Item>
    );
  });

  const PreviewProduct = (product) => {
    return (
      <Modal.Body closeButton>
        <Button
          variant="light"
          // onClick={handleClose}
          style={{
            marginBottom: "10px",
            float: "right",
          }}
        >
          X
        </Button>
        <div>
          <Modal.Title>
            <Card.Title>
              <h4
                style={{
                  textAlign: "center",
                }}
              >
                {product.name == "" ? "Tên sản phẩm" : product.name}
              </h4>
            </Card.Title>
          </Modal.Title>

          <Carousel activeIndex={indexCarousel} onSelect={handleSelect}>
            {renderCarousel}
          </Carousel>

          <Card.Body>
            <div>
              <Card.Text>
                <h5
                  style={{
                    padding: "10px 5px 15px 0",
                    textAlign: "right",
                    fontWeight: "600",
                  }}
                >
                  {product.comparative > product.price &&
                    product.price !== 0 && (
                      <>
                        <span
                          style={{
                            paddingLeft: "5px",
                            color: "#dc3545",
                            fontWeight: "200",
                          }}
                        >
                          {"(Giảm giá "}
                          {(
                            100 -
                            (product.price / product.comparative) * 100
                          ).toFixed(0)}
                          {"%)"}
                        </span>
                        <strike
                          style={{
                            paddingLeft: "5px",
                            color: "grey",
                            fontWeight: "200",
                          }}
                        >
                          {Changedot([product.comparative * quantity])}
                        </strike>
                      </>
                    )}{" "}
                  {product.price == 0
                    ? "Giá sản phẩm"
                    : Changedot([product.price * quantity])}
                </h5>
              </Card.Text>
            </div>
            <div id="modalFotter">
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleChangeQuantity}
                min={1}
              />
              <Button
                style={{ width: "300px" }}
                variant="secondary"
                // onClick={handleAdd}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Card.Body>
          <br></br>
          <Card.Text>
            <p>
              {" "}
              {product.description == ""
                ? "Mô tả thông tin sản phẩm"
                : product.description}
            </p>
          </Card.Text>
        </div>
        <p className="subPreview">(Xem trước sản phẩm)</p>
      </Modal.Body>
    );
  };

  const modalRender = () => {
    return (
      <Modal
        // size="lg"
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        // dialogClassName="modal-120w"
        backdrop="static"
      >
        <Modal.Body closeButton>
          <div>
            <Modal.Title>
              <Card.Title>
                <h4
                  style={{
                    textAlign: "center",
                  }}
                >
                  {/* Chỉnh sửa thông tin sản phẩm */}
                </h4>
              </Card.Title>
            </Modal.Title>
            <div className="noWrap">
              <Card.Body>
                <div className="groupPreview">
                  <div className="productPreview">
                    {PreviewProduct(newProduct)}
                  </div>
                </div>
              </Card.Body>
              <Card.Body className="editProductCard">
                {" "}
                <Card.Text>
                  <Card.Title>
                    <Button
                      variant="light"
                      onClick={handleClose}
                      style={{
                        marginBottom: "10px",
                        float: "right",
                      }}
                    >
                      X
                    </Button>{" "}
                    <br></br>
                    <h4
                      style={{
                        textAlign: "left",
                      }}
                    >
                      Thông tin sản phẩm
                    </h4>
                    <hr></hr>
                  </Card.Title>
                  <InputGroup id="user-product" className="mb-3 mx-auto">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
                      <Form.Control
                        // placeholder="Email của bạn"
                        disabled
                        aria-label="id"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={newProduct.id}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                      <Form.Control
                        // placeholder="Tên của bạn"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={newProduct.name}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">SKU</InputGroup.Text>
                      <Form.Control
                        // placeholder="Tên của bạn"
                        aria-label="sku"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={newProduct.sku}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Tag</InputGroup.Text>
                      <Form.Control
                        // placeholder="Tên của bạn"
                        aria-label="tag"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={addSpace(newProduct.tag)}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Giá</InputGroup.Text>
                      <Form.Control
                        // placeholder="Tên của bạn"
                        aria-label="price"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={Changedot(newProduct.price)
                          .toString()
                          .replace(/đ/g, "")}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Giá so sánh
                      </InputGroup.Text>
                      <Form.Control
                        // placeholder="Tên của bạn"
                        aria-label="comparative"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={Changedot(newProduct.comparative)
                          .toString()
                          .replace(/đ/g, "")}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        // placeholder="Tên của bạn"
                        aria-label="description"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={newProduct.description}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Hình ảnh
                      </InputGroup.Text>
                      <Form.Control
                        as="textarea"
                        // placeholder="Tên của bạn"
                        aria-label="img"
                        aria-describedby="basic-addon1"
                        type="text"
                        value={addSpace(newProduct.img)}
                        onChange={handleChangeProduct}
                      />
                    </InputGroup>
                  </InputGroup>
                </Card.Text>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Huỷ
                  </Button>
                  <Button
                    variant="dark"
                    onClick={
                      render == "productCard"
                        ? handleSaveProduct
                        : handleAddNewProduct
                    }
                  >
                    {" "}
                    Lưu sản phẩm
                  </Button>
                </Modal.Footer>
              </Card.Body>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  if (render == "productCard") {
    return (
      <>
        <tr id="adminProductCard">
          <td
            className=" text-center"
            style={{
              width: "10px",
            }}
          >
            {Number(i) + 1}{" "}
          </td>
          <td
            className=" text-left"
            style={{ padding: "0", width: "6rem", verticalAlign: "middle" }}
          >
            {" "}
            <Card.Img
              onClick={handleShow}
              className="productImgThumbSmall"
              variant="top"
              src={currentImg}
              onMouseOver={() => setCurrentImg(product.img[1])}
              onMouseOut={() => setCurrentImg(product.img[0])}
            />
          </td>
          <td>
            {" "}
            <OverlayTrigger
              style={{ width: "320px !importan" }}
              key={"top"}
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-top`}>
                  <strong> {product.name}</strong>
                  <br></br>
                  {product.description}
                </Tooltip>
              }
            >
              <div>
                <Card.Title>
                  <h6
                    style={{
                      textAlign: "left",
                    }}
                  >
                    {TruncateString(product.name, 40)}
                  </h6>
                </Card.Title>
              </div>
            </OverlayTrigger>
          </td>
          <td
            style={{
              width: "120px",
            }}
          >
            <h6
              style={{
                // padding: "10px 5px 15px 0",
                textAlign: "right",
                fontWeight: "600",
              }}
            >
              {" "}
              {Changedot([product.price])}
            </h6>
          </td>
          <td
            style={{
              width: "150px",
            }}
          >
            {Number(product.comparative) >= Number(product.price) && (
              <>
                {" "}
                <strike
                  style={{
                    // paddingLeft: "5px",
                    color: "grey",
                    fontWeight: "200",
                    float: "left",
                  }}
                >
                  {Changedot([product.comparative * quantity])}
                </strike>{" "}
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {"("}
                  {(100 - (product.price / product.comparative) * 100).toFixed(
                    0
                  )}
                  {"%)"}
                </span>
              </>
            )}
          </td>
          <td
            style={{
              textAlign: "center",
              width: "100px",
            }}
          >
            {product.sku}
          </td>
          <td
            style={{
              width: "130px",
            }}
          >
            {product.tag.map((tag, index) => {
              return (
                <Badge bg="secondary" style={{ marginRight: "2px" }}>
                  {tag}
                </Badge>
              );
            })}
          </td>

          <td
            style={{
              width: "150px",
              textAlign: "center",
            }}
          >
            <div
              className="noWrap"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              {showConfirmDeleProduct == false ? (
                <>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{ marginRight: "5px" }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => setShowConfirmDeleProduct(true)}
                    style={{}}
                  >
                    Xoá{" "}
                  </Button>
                </>
              ) : (
                ConfirmDeleteProduct()
              )}
            </div>
          </td>
        </tr>
        {modalRender()}
      </>
    );
  } else if (render == "addProduct") {
    return (
      <>
        {" "}
        <Button
          variant="secondary"
          onClick={handleShow}
          style={{ marginRight: "5px" }}
        >
          Thêm sản phẩm mới
        </Button>
        {modalRender()}
      </>
    );
  }
}

export default ProductCardAdmin;
