import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useEffect, useMemo, useState } from "react";
import { addToCart } from "../actions/cartAction";
import "../css/ProductCard.css";
import { TruncateString, Changedot, CheckLink } from "../function/functionData";
import { Link, useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch, useSelector } from "react-redux";
import "./../css/CarouselProduct.css";

function ProductCard({ screen, product }) {
  const [currentImg, setCurrentImg] = useState(product.img[0]);
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let link = CheckLink();

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentImg(product.img[0]);
  }, [product]);

  // let flag = true;

  const handleChangeQuantity = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // add to cart
  const handleAdd = () => {
    if (userLogined !== null) {
      dispatch(addToCart({ ...product, quantity }));
    } else {
      navigate("/login");
    }
    setShow(false);

    setQuantity(1);
    // console.log({ ...product, quantity });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setQuantity(1);
  };
  const handleShow = () => setShow(true);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const renderCarousel = product.img.map((img, index) => {
    return (
      <Carousel.Item>
        <img className="productImgLarger d-block w-100" src={img} />{" "}
      </Carousel.Item>
    );
  });
  return (
    <>
      {screen !== "cardProduct" ? (
        <div
          onClick={handleShow}
          style={{ backgroundImage: `url(${screen})` }}
          className="CarouselProductCard"
        >
          {/* <> {console.log(screen)}</> */}
        </div>
      ) : (
        <Card style={{ width: "310px" }}>
          <div>
            <Card.Img
              onClick={handleShow}
              className="productImgThumb"
              variant="top"
              src={currentImg}
              onMouseOver={() => {
                let item = 1;
                if (product.img.length < 2) {
                  item = 0;
                }
                setCurrentImg(product.img[item]);
              }}
              onMouseOut={() => setCurrentImg(product.img[0])}
            />
          </div>
          <Card.Body>
            <div onClick={handleShow}>
              <OverlayTrigger
                style={{ width: "320px !importan" }}
                key={"top"}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <strong>{product.name} </strong>
                    <br></br>
                    {product.description + " Click để xem thông tin sản phẩm."}
                  </Tooltip>
                }
              >
                <div>
                  <Card.Title>
                    <h6
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {TruncateString(product.name, 29)}
                    </h6>
                  </Card.Title>
                  <Card.Text>
                    <h6
                      style={{
                        paddingLeft: "5px",
                        color: "#258635",
                        textAlign: "center",
                      }}
                    >
                      {Changedot([product.price])}
                      {product.comparative > product.price && (
                        <>
                          {" "}
                          <strike
                            style={{
                              paddingLeft: "5px",
                              color: "grey",
                              fontWeight: "400",
                            }}
                          >
                            {Changedot([product.comparative])}
                          </strike>
                          <span
                            style={{
                              paddingLeft: "5px",
                              color: "#dc3545",
                              fontWeight: "400",
                            }}
                          >
                            {"(Giảm "}
                            {(
                              100 -
                              (product.price / product.comparative) * 100
                            ).toFixed(0)}
                            {"%)"}
                          </span>
                        </>
                      )}
                    </h6>
                  </Card.Text>
                  {/* <Card.Text>{TruncateString(product.description, 50)}</Card.Text> */}
                </div>
              </OverlayTrigger>
            </div>
            <div
              className="noWrap"
              style={{
                justifyContent: "center",
                gap: "3px",
                alignItems: "center",
              }}
            >
              {link == "/" && (
                <OverlayTrigger
                  style={{ width: "320px !importan" }}
                  key={"right"}
                  placement={"right"}
                  overlay={
                    <Tooltip id={`tooltip-right`}>
                      Xem các sản phẩm tương tự trong bộ sưu tập{" "}
                      <strong> {product.tag[0].toUpperCase()}</strong>{" "}
                    </Tooltip>
                  }
                >
                  <Link to={"/" + product.tag[0].toLowerCase()}>
                    <p
                      style={{
                        paddingTop: "5px",
                      }}
                    >
                      Tương tự...
                    </p>
                  </Link>
                </OverlayTrigger>
              )}

              <Button
                variant="light"
                onClick={handleAdd}
                style={{
                  float: "right",
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* MODAL___________________________________ */}
      {/* MODAL___________________________________ */}
      {/* MODAL___________________________________ */}
      <Modal
        // size="lg"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Body closeButton>
          <Button
            variant="light"
            onClick={handleClose}
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
                  {product.name}
                </h4>
              </Card.Title>
            </Modal.Title>

            <Carousel activeIndex={index} onSelect={handleSelect}>
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
                    {product.comparative > product.price && (
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
                    {Changedot([product.price * quantity])}
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
                  onClick={handleAdd}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>
            </Card.Body>
            <br></br>
            <Card.Text>
              <p>{product.description}</p>
            </Card.Text>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductCard;
