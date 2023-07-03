import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/productAction";
import "../css/ProductCard.css";
import { TruncateString, Changedot } from "../function/functionData";

function ProductCard({ product }) {
  const [currentImg, setCurrentImg] = useState(product.img[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  let flag = true;

  const handleChangeQuantity = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    setCurrentImg(product.img[0]);
  }, [currentImg]);

  // add to cart
  const handleAdd = () => {
    if (JSON.parse(localStorage.getItem("userLogined"))) {
      dispatch(addToCart({ ...product, quantity }));
    }

    // console.log({ ...product, quantity });
  };

  return (
    <Card style={{ width: "310px" }}>
      <Card.Img
        className="productImgThumb"
        variant="top"
        src={product.img[0]}
        // onMouseOver={() => setCurrentImg(product.img[1])}
        // onMouseOut={() => setCurrentImg(product.img[0])}
      />

      <Card.Body>
        <Card.Title>
          <h6>{TruncateString(product.name, 29)}</h6>
        </Card.Title>
        <Badge bg="secondary">{Changedot(product.price)}</Badge>
        <Card.Text>{TruncateString(product.description, 60)}</Card.Text>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            min={1}
          />
          <Button variant="primary" onClick={handleAdd}>
            Thêm
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
