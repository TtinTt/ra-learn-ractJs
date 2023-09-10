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
  prependLocalhost,
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
import productApi from "../../apis/product.api";
function ProductCardAdmin({ render, i, product, setLoading }) {
  const [currentImg, setCurrentImg] = useState(product.img[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState(product);
  const [showConfirmDeleProduct, setShowConfirmDeleProduct] = useState(false);
  const [errors, setErrors] = useState(new Map());

  // let loading = setLoading();
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

  const [valueLink, setValueLink] = useState("");

  const handleAddLink = (event) => {
    if (!valueLink) {
      return;
    }

    const currentImages = newProduct.img || []; // Nếu newProduct.img không tồn tại, sử dụng array rỗng
    console.log(newProduct.img);
    console.log("valueLink", valueLink);
    console.log("new array", [...currentImages, valueLink]);
    if (newProduct.img.length + 1 >= 10) {
      const errors = new Map();
      errors.set("img", "Bạn chỉ có thể tải lên tối đa 10 ảnh.");
      setErrors({ errors });
      return;
    } else {
      const currentImages = newProduct.img || []; // Nếu newProduct.img không tồn tại, sử dụng array rỗng
      const newImages = [...currentImages, valueLink]; // Thêm vào array
      setNewProduct({
        ...newProduct,
        img: newImages,
      });
    }
    setValueLink("");
  };

  const handleChangeProduct = (event) => {
    let key = event.target.ariaLabel;
    if (key === "img") {
      let files = event.target.files;

      if (newProduct.img.length + files.length >= 10) {
        const errors = new Map();
        errors.set("value", "Bạn chỉ có thể tải lên tối đa 10 ảnh.");
        setErrors({ errors });
        return;
      } else {
        const newFiles = Array.from(files); // Tạo array từ danh sách File
        const currentImages = newProduct.img || []; // Nếu newProduct.img không tồn tại, sử dụng array rỗng
        const newImages = currentImages.concat(newFiles); // Nối hai array
        setNewProduct({
          ...newProduct,
          [key]: newImages,
        });
      }
    } else if (key == "tag") {
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
  };

  useEffect(() => {
    console.log(newProduct);
  }, [newProduct]);

  const handleSaveProduct = () => {
    console.log(newProduct);
    const errors = validate(newProduct);

    if (errors.size == 0) {
      setLoading(true);
      // console.log("loading true");

      const formData = new FormData();

      // Thêm các trường thông tin
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("comparative", newProduct.comparative);
      formData.append("description", newProduct.description);

      if (newProduct.sku) {
        formData.append("sku", newProduct.sku);
      }

      if (newProduct.tag) {
        formData.append("tag", newProduct.tag);
      }

      // Thêm các tập tin hoặc URL
      newProduct.img.forEach((item, index) => {
        // Kiểm tra nếu đó là một đối tượng File
        if (item instanceof File) {
          formData.append(`imgFile${index}`, item);
        } else if (typeof item === "string") {
          // Nếu đó là một string, đó là URL
          formData.append(`imgUrl${index}`, item);
        }
      });

      productApi
        .updateProduct(newProduct.product_id, formData)
        .then(() => {
          handleClose();
          // setLoading(true);
          // console.log("loading false");
        })
        .catch((error) => {
          console.log(error.response?.statusText);
        });
      // dispatch(updateEditProduct(newProduct));
    } else {
      console.log(errors);
      setErrors(errors);
    }
    handleClose();
  };

  const handleAddNewProduct = () => {
    console.log(newProduct);
    const errors = validate(newProduct);

    if (errors.size == 0) {
      const formData = new FormData();

      // Thêm các trường thông tin
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("comparative", newProduct.comparative);
      formData.append("description", newProduct.description);

      if (newProduct.sku) {
        formData.append("sku", newProduct.sku);
      }

      if (newProduct.tag) {
        formData.append("tag", newProduct.tag);
      }

      // Thêm các tập tin hoặc URL
      newProduct.img.forEach((item, index) => {
        // Kiểm tra nếu đó là một đối tượng File
        if (item instanceof File) {
          formData.append(`imgFile${index}`, item);
        } else if (typeof item === "string") {
          // Nếu đó là một string, đó là URL
          formData.append(`imgUrl${index}`, item);
        }
      });

      productApi
        .createProduct(formData)
        .then(() => {
          handleClose();
          setLoading(true);
        })
        .catch((error) => {
          console.log(error.response?.statusText);
        });
      // dispatch(updateEditProduct(newProduct));
    } else {
      console.log(errors);
      setErrors(errors);
    }
  };

  // const handleAddNewProduct = () => {
  //   // console.log(newProduct);
  //   dispatch(addProduct(newProduct));
  //   handleClose();
  // };

  const handleDeleteProduct = () => {
    setLoading(true);

    console.log(product.product_id);

    productApi
      .deleteProduct(product.product_id)
      .then(() => {
        setLoading(false);
        handleClose();
        setShowConfirmDeleProduct(false);
      })
      .catch((error) => {
        console.log(error.response?.statusText);
      });
    // dispatch(deleteProduct(product.product_id));
  };

  const validate = (product) => {
    let errors = new Map();

    if (!product.name) {
      errors.set("value", "Tên sản phẩm không hợp lệ.");
    }

    if (!product.price) {
      errors.set("value", "Giá sản phẩm không hợp lệ.");
    }

    if (typeof product.name !== "string") {
      errors.set("value", "Tên sản phẩm không hợp lệ.");
    } else if (product.name.length < 3 || product.name.length > 250) {
      errors.set("value", "Tên sản phẩm chỉ cho phép dài từ 3 tới 250 ký tự.");
    }

    if (product.sku && typeof product.sku !== "string") {
      errors.set("value", "Sku sản phẩm không hợp lệ.");
    } else if (product.sku && product.sku.length > 250) {
      errors.set("value", "Sku sản phẩm không hợp lệ.");
    }

    if (product.description && typeof product.description !== "string") {
      errors.set("value", "Sku sản phẩm không hợp lệ.");
    } else if (product.description && product.description.length > 1000) {
      errors.set("value", "Sku sản phẩm chỉ không hợp lệ.");
    }
    // console.log("errors", errors);
    return errors;
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setErrors(new Map());
    setShow(false);
    setQuantity(1);
    setNewProduct(product);
  };
  const handleShow = () => setShow(true);

  const [indexCarousel, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const renderCarousel = newProduct.img.map((imgItem, indexCarousel) => {
    let imgUrl;

    // Kiểm tra nếu imgItem là một đối tượng File
    if (imgItem instanceof File) {
      imgUrl = URL.createObjectURL(imgItem);
    } else if (typeof imgItem === "string") {
      // Kiểm tra nếu imgItem là một URL
      imgUrl = imgItem.startsWith("http")
        ? imgItem
        : `http://localhost:8000/${imgItem}`;
    }

    return (
      <Carousel.Item key={indexCarousel}>
        <img
          className="productImgLarger d-block w-100"
          alt="Hình ảnh lỗi"
          src={
            imgUrl ||
            "https://img.freepik.com/premium-vector/product-concept-line-icon-simple-element-illustration-product-concept-outline-symbol-design-can-be-used-web-mobile-ui-ux_159242-2076.jpg?w=2000"
          }
        />
      </Carousel.Item>
    );
  });

  const handleDeletePhoto = (indexToRemove) => {
    // Tạo một bản sao của mảng img và xóa phần tử tại indexToRemove
    const updatedImgArray = [...newProduct.img];
    updatedImgArray.splice(indexToRemove, 1);

    // Cập nhật state
    setNewProduct({
      ...newProduct,
      img: updatedImgArray,
    });
  };

  const renderDeletePhotoButton = newProduct.img.map((imgItem, index) => {
    let imgUrl;

    // Kiểm tra nếu imgItem là một đối tượng File
    if (imgItem instanceof File) {
      imgUrl = URL.createObjectURL(imgItem);
    } else if (typeof imgItem === "string") {
      // Kiểm tra nếu imgItem là một URL
      imgUrl = imgItem.startsWith("http")
        ? imgItem
        : `http://localhost:8000/${imgItem}`;
    }

    return (
      <OverlayTrigger
        style={{ width: "320px !importan" }}
        key={"left"}
        placement={"left"}
        overlay={
          <Tooltip id={`tooltip-left`}>
            <p></p>
            <p>Xóa ảnh</p>
          </Tooltip>
        }
      >
        <div
          key={index}
          className="clickDeletePhoto"
          onClick={() => handleDeletePhoto(index)} // Thêm hàm xử lý click vào đây
          style={{
            padding: "10px !important",
          }}
        >
          <img className="imgDeletePhoto" alt="Hình ảnh lỗi" src={imgUrl} />
        </div>
      </OverlayTrigger>
    );
  });

  const PreviewProduct = (product) => {
    return (
      <>
        <OverlayTrigger
          key={"right"}
          placement={"right"}
          overlay={
            <Tooltip id={`tooltip-right`}>
              Xem trước
              <strong> thông tin sản phẩm</strong> hiển thị trên trang mua hàng.
            </Tooltip>
          }
        >
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
                {newProduct.img.length > 0 ? (
                  renderCarousel
                ) : (
                  <img
                    className="productImgLarger d-block w-100"
                    alt="Hình ảnh lỗi"
                    src="https://img.freepik.com/premium-vector/product-concept-line-icon-simple-element-illustration-product-concept-outline-symbol-design-can-be-used-web-mobile-ui-ux_159242-2076.jpg?w=2000"
                  ></img>
                )}
              </Carousel>

              <Card.Body>
                <div
                  className="noWrap"
                  style={{
                    justifyContent: "space-between",
                    gap: "15px",
                    // alignItems: "center",
                  }}
                >
                  <OverlayTrigger
                    key={"right"}
                    placement={"right"}
                    overlay={
                      <Tooltip id={`tooltip-right`}>
                        Xem các sản phẩm tương tự trong bộ sưu tập{" "}
                        <strong>...</strong>{" "}
                      </Tooltip>
                    }
                  >
                    <p
                      className="noWrap"
                      style={{
                        paddingTop: "15px",
                        color: "grey",
                        width: "420px !importan",
                      }}
                      onClick={handleClose}
                    >
                      Tương tự...
                    </p>
                  </OverlayTrigger>
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
                <p className="text-center">{product.description}</p>
              </Card.Text>
            </div>
            <p className="subPreview">(Xem trước sản phẩm)</p>
          </Modal.Body>
        </OverlayTrigger>
      </>
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
                        value={newProduct.product_id}
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
                    <OverlayTrigger
                      style={{ width: "320px !importan" }}
                      key={"left"}
                      placement={"left"}
                      overlay={
                        <Tooltip id={`tooltip-left`}>
                          <p></p>
                          <p>
                            Tag đầu tiên của mỗi sản phẩm sẽ được sử dụng để sắp
                            xếp theo Catalogue.
                          </p>
                          <p>
                            Nếu tag chưa từng tồn tại trước đây, một Catalogue
                            mới sẽ được tạo
                          </p>
                          <p>
                            Các tag viết lần lượt ngăn cách bởi dấu phẩy, không
                            giới hạn số lượng.
                          </p>
                        </Tooltip>
                      }
                    >
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
                    </OverlayTrigger>

                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        Giá bán
                      </InputGroup.Text>
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

                    <OverlayTrigger
                      style={{ width: "320px !importan" }}
                      key={"left"}
                      placement={"left"}
                      overlay={
                        <Tooltip id={`tooltip-left`}>
                          <p></p>
                          <p>
                            Giá so sánh cần lớn hơn Giá bán và tỉ lệ giảm giá
                            được tự động tính khi so sánh với Giá bán.
                          </p>
                        </Tooltip>
                      }
                    >
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
                    </OverlayTrigger>

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

                    <OverlayTrigger
                      style={{ width: "320px !importan" }}
                      key={"left"}
                      placement={"left"}
                      overlay={
                        <Tooltip id={`tooltip-left`}>
                          <p></p>
                          <p>
                            Các file được tải lên sẽ được thêm vào hình ảnh mô
                            tả sản phẩm.
                          </p>
                        </Tooltip>
                      }
                    >
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          Tải lên hình ảnh
                        </InputGroup.Text>
                        {/* <Form.Control
                          as="textarea"
                          // placeholder="Tên của bạn"
                          aria-label="img"
                          aria-describedby="basic-addon1"
                          type="text"
                          value={addSpace(newProduct.img)}
                          onChange={handleChangeProduct}
                        /> */}

                        <Form.Control
                          // disabled
                          aria-label="img"
                          aria-describedby="basic-addon1"
                          type="file"
                          name="avatar"
                          accept="image/png, image/jpeg, image/tif, image/webp"
                          onChange={handleChangeProduct}
                          multiple
                        />
                      </InputGroup>
                    </OverlayTrigger>

                    <OverlayTrigger
                      style={{ width: "320px !importan" }}
                      key={"left"}
                      placement={"left"}
                      overlay={
                        <Tooltip id={`tooltip-left`}>
                          <p></p>
                          <p>
                            Các ảnh sẽ được thêm vào hình ảnh mô tả sản phẩm,
                            chỉ có thể tải lên lần lượt từng liên kết ảnh.
                          </p>
                        </Tooltip>
                      }
                    >
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          Thêm liên kết hình ảnh
                        </InputGroup.Text>
                        <Form.Control
                          // as="textarea"
                          // placeholder="Tên của bạn"
                          aria-label="img"
                          aria-describedby="basic-addon1"
                          type="text"
                          value={valueLink}
                          onChange={(e) => setValueLink(e.target.value)}
                        />
                        <Button
                          className="btn btn-light"
                          onClick={handleAddLink}
                        >
                          Thêm
                        </Button>
                      </InputGroup>
                    </OverlayTrigger>

                    {renderDeletePhotoButton}
                  </InputGroup>
                </Card.Text>
                {show && errors.size !== 0 && (
                  <p
                    className="text-center"
                    style={{ color: "rgb(161, 21, 21)" }}
                  >
                    {errors?.get("value")}
                  </p>
                )}
                <Modal.Footer>
                  <Button variant="light" onClick={handleClose}>
                    Huỷ
                  </Button>

                  <OverlayTrigger
                    style={{ width: "320px !importan" }}
                    key={"left"}
                    placement={"left"}
                    overlay={
                      <Tooltip id={`tooltip-left`}>
                        <p></p>
                        <p>
                          Vui lòng kiểm tra và chắc chắn rằng không có ảnh sản
                          phẩm lỗi trước khi lưu.
                        </p>
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="secondary"
                      onClick={
                        render == "productCard"
                          ? handleSaveProduct
                          : handleAddNewProduct
                      }
                    >
                      {" "}
                      Lưu sản phẩm
                    </Button>
                  </OverlayTrigger>
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
            {product.product_id}{" "}
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
              src={prependLocalhost(currentImg)}
              onMouseOver={() =>
                product.img[1] && setCurrentImg(product.img[1])
              }
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
                    variant="secondary"
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
          variant="light"
          onClick={handleShow}
          style={{
            height: "35px",
            paddingBottom: "-20px",
            marginTop: "5px",
            backgroundColor: "#DDDDDD",
          }}
        >
          Thêm sản phẩm mới
        </Button>
        {modalRender()}
      </>
    );
  }
}

export default ProductCardAdmin;
