import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { inputSearchBox } from "../actions/productAction";
import { useEffect, useState } from "react";
import "./../css/CarouselProduct.css";
import Image from "react-bootstrap/Image";

import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
  Changedot,
} from "../function/functionData";
import UserButton from "./UserButton";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function CarouselProduct() {
  let link = CheckLink();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getRandomElement = (array) => {
    if (array.length === 0) {
      return null; // Trả về null nếu array rỗng
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  // lấy list không trùng lặp tag đầu tiên của mỗi sản phẩm
  let tagsProducts = useGetTagsProducts();

  // lấy ra các array là list product từ products trên store theo từng tag
  let productsByTags = useGetProductsByTags();

  const carouselItem = tagsProducts.map((tag) => {
    // lấy ra các phần tử ngẫu nhiên của array chứa các sản phẩm theo từng tag
    let productShow = getRandomElement(productsByTags[tag.toString()]);

    // console.log(productShow);
    return (
      <Carousel.Item key={productShow.id} className="CarouselItem">
        <ProductCard screen={productShow.img[0]} product={productShow} />
        <Carousel.Caption>
          <h4 className="CarouselProductText">{productShow.name}</h4>
          <h4 className="CarouselProductText ">
            {Changedot([productShow.price])}
            {productShow.comparative > productShow.price && (
              <>
                {" "}
                <strike
                  style={{
                    paddingLeft: "5px",
                    color: "#DADADA",
                    fontWeight: "400",
                  }}
                >
                  {Changedot([productShow.comparative])}
                </strike>
                <span
                  style={{
                    paddingLeft: "5px",
                    color: "#FFA500",
                    fontWeight: "400",
                  }}
                >
                  {"(Giảm giá "}
                  {(
                    100 -
                    (productShow.price / productShow.comparative) * 100
                  ).toFixed(0)}
                  {"%)"}
                </span>
              </>
            )}
          </h4>
          {/* <p className="CarouselProductText">
            {TruncateString(productShow.description, 100)}
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  const cataloguelItem = tagsProducts.map((tag) => {
    // lấy ra các phần tử ngẫu nhiên của array chứa các sản phẩm theo từng tag
    let productShow = getRandomElement(productsByTags[tag.toString()]);
    let urlLink = "/" + tag;
    let lastItem = productShow.img.length - 1;
    return (
      <div
        href={urlLink}
        onClick={() => {
          navigate(urlLink);
        }}
        className="imgCatalogue"
        style={{
          backgroundImage: `url(${productShow.img[lastItem]})`,
        }}
      >
        <p>Bộ sưu tập</p>
        <h4>{tag.toLocaleUpperCase()}</h4>
      </div>
    );
  });

  return (
    <div id="bundleCarouselAndCatalouge">
      <Carousel
        fade
        id="carouselScreen"
        activeIndex={index}
        onSelect={handleSelect}
      >
        {carouselItem}
      </Carousel>

      <div id="catalogueScreen"> {cataloguelItem}</div>
    </div>
  );
}

export default CarouselProduct;
