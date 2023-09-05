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
import productApi from "../apis/product.api";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  // fetchProductsByTags,
  Changedot,
  prependLocalhost,
} from "../function/functionData";
import UserButton from "./UserButton";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function CarouselProduct() {
  let link = CheckLink();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  const getTag = async () => {
    // const navigate = useNavigate();
    setLoading(true);

    await productApi
      .getTag({})
      .then((data) => {
        console.log("1-lấy các tag", data.tags);
        // setValue(data.maxPrice);
        // setMinPrice(data.minPrice);
        // setMaxPrice(data.maxPrice);
        setTagsProducts(data.tags);
        fetchProductsByTags(data.tags);
        console.log("data.tags", data.tags);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
          // navigate("/products");
        } else {
          console.log(error.response?.statusText);
        }
      });

    // setSelectedProductIds([]);
  };
  const [tagsProducts, setTagsProducts] = useState([]);

  useEffect(() => {
    getTag();
  }, []);

  // useEffect(() => {
  //   fetchProductsByTags();
  // }, [tagsProducts]);

  // lấy list không trùng lặp tag đầu tiên của mỗi sản phẩm
  // let tagsProducts = useGetTagsProducts();

  // lấy ra các array là list product từ products trên store theo từng tag

  const fetchProductsByTags = async (listCatalogueByTag) => {
    console.log("listCatalogueByTag", listCatalogueByTag);

    const promises = listCatalogueByTag.map(async (tag) => {
      try {
        const data = await productApi.searchProducts({
          name: "",
          page: 1,
          limit: 8,
          maxPrice: null,
          sortType: 0,
          category: tag,
        });
        return { tag, data: data.records };
      } catch (error) {
        console.log(error);
        if (error.response && error.response?.status === 401) {
          console.log(error.response?.statusText);
        } else {
          console.log(error.response?.statusText);
        }
        return null; // hoặc return { tag, data: null } tùy thuộc vào cách bạn muốn xử lý
      }
    });

    const results = await Promise.all(promises);
    const resultMap = {};
    results.forEach(({ tag, data }) => {
      if (data) {
        resultMap[tag] = data;
      }
    });

    setProductsByTags(resultMap);
    console.log("result", resultMap);
  };

  const [productsByTags, setProductsByTags] = useState({});

  // let productsByTags = fetchProductsByTags();

  // lấy ra các array là list product từ products trên store theo từng tag

  const carouselItem = tagsProducts.map((tag) => {
    if (loading) {
      return <h5 className="text-center msgCartTop">Loading...</h5>;
    } else {
      const productsForTag = productsByTags[tag.toString().toLowerCase()];

      // Thêm điều kiện kiểm tra
      if (!productsForTag || productsForTag.length === 0) {
        return null; // Không trả về gì cả nếu không có sản phẩm cho tag này
      }
      // const productsForTag = fetchProducts(tag.toString().toLowerCase());
      let productShow = getRandomElement(productsForTag);

      if (!productShow) {
        return null; // Không trả về gì nếu không có sản phẩm được chọn
      }
      // console.log(productShow);
      if (productShow && productsByTags) {
        return (
          <Carousel.Item key={productShow.id} className="CarouselItem">
            <ProductCard
              screen={prependLocalhost(productShow.img[0])}
              product={productShow}
            />
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
      } else {
        return null;
      }
    }
  });

  const cataloguelItem = tagsProducts.map((tag) => {
    if (loading) {
      return <h5 className="text-center msgCartTop">Loading...</h5>;
    } else {
      const productsForTag = productsByTags[tag.toString().toLowerCase()];

      // Thêm điều kiện kiểm tra
      if (!productsForTag || productsForTag.length === 0) {
        return null; // Không trả về gì cả nếu không có sản phẩm cho tag này
      }

      let productShow = getRandomElement(productsForTag);

      if (!productShow) {
        return null; // Không trả về gì nếu không có sản phẩm được chọn
      }
      if (productsForTag && productsForTag.length > 0) {
        productShow = getRandomElement(productsForTag);
      }
      let urlLink = "/" + tag;
      let lastItem = productShow.img.length - 1;
      if (productShow && productsByTags) {
        return (
          <div
            href={urlLink}
            onClick={() => {
              navigate(urlLink);
            }}
            className="imgCatalogue"
            style={{
              backgroundImage: `url(${prependLocalhost(
                productShow.img[lastItem]
              )})`,
            }}
          >
            <p>Bộ sưu tập</p>
            <h4>{tag.toLocaleUpperCase()}</h4>
          </div>
        );
      } else {
        return null;
      }
    }
  });

  if (loading && productsByTags) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
  } else {
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
}

export default CarouselProduct;
