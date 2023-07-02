import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/productAction";
import "../css/ProductCard.css";
import { TruncateString, Changedot } from "../function/functionData";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleChangeQuantity = (event) => {
    const value = Number(event.target.value);

    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAdd = () => {
    dispatch(addToCart(product, quantity));
  };

  const [currentImg, setCurrentImg] = useState(product.img[0]);

  return (
    <Card style={{ width: "310px" }}>
      <Card.Img
        className="productImgThumb"
        variant="top"
        src={currentImg}
        onMouseOver={() => setCurrentImg(product.img[1])}
        onMouseOut={() => setCurrentImg(product.img[0])}
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
