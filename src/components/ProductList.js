import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart } from "../actions/cartAction";
import Button from "react-bootstrap/Button";
import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import productApi from "../apis/product.api";
import {
  HandleFilter,
  useGetTagsProducts,
  useGetProductsByTags,
  CheckLink,
} from "../function/functionData";

export default function ProductList() {
  // lấy ra các array là list product từ products trên store theo từng tag
  let productsByTags = useGetProductsByTags();

  const productListStore = useSelector(
    (state) => state.productReducer.products
  );
  let link = null;
  let checkLink = CheckLink();
  let productListDraft = [];
  if (checkLink == "/") {
    productListDraft = productListStore;
  } else {
    link = checkLink
      .substring(1)
      .replace(/\s/g, "")
      .toLocaleLowerCase()
      .toString()
      .trim();
    // productListDraft = productsByTags[link];
  }

  // if (productListDraft.length == 0) {
  //   window.location.reload();
  // }

  const [productDescription, setProductDescription] = useState("");
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState([]);
  const [searchFilterInput, setSearchFilterInput] = useState("");
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortType, setSortType] = useState(0);

  const fetchProducts = async () =>
    // keyword, page, NUMBER_RECORDS_PER_PAGE
    {
      // const navigate = useNavigate();

      await productApi
        .searchProducts({
          name: searchFilter,
          page: currentPage,
          limit: productsPerPage,
          maxPrice: priceFromValue,
          sortType: sortOption,
          category: link,
        })
        .then((data) => {
          setProductList(data.records);
          setTotal(data.total);
        })
        .catch((error) => {
          alert(error);
          if (error.response.status === 401) {
            alert(error.response.statusText);
            // navigate("/products");
          } else {
            alert(error.response.statusText);
          }
        });

      // setSelectedProductIds([]);
    };
  const dispatch = useDispatch();

  // thêm vào giỏ hàng
  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  // Pagination phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [keyWordSearch, setKeyWordSearch] = useState("");

  // lấy giá trị ô search
  let searchFilter =
    useSelector((state) => state.productReducer.searchFilter) ?? "";

  // lấy option sort từ store
  let sortOption = useSelector((state) => state.productReducer.sort) ?? 0;
  // lấy max price sort từ store
  let priceFromValue =
    useSelector((state) => state.productReducer.priceFrom) ?? null;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await setMaxPrice(priceFromValue);
  //     await setSortType(sortOption);
  //     await setSearchFilterInput(searchFilter);
  //     await fetchProducts(
  //       searchFilterInput,
  //       currentPage,
  //       productsPerPage,
  //       priceFromValue,
  //       sortOption
  //     );
  //     await console.log(searchFilter, currentPage, maxPrice, sortType);
  //   };
  //   fetchData();
  // }, [searchFilter, currentPage, priceFromValue, sortOption]);
  useEffect(() => {
    fetchProducts();
    console.log(searchFilter, currentPage, priceFromValue, sortOption, link);
  }, [searchFilter, currentPage, priceFromValue, sortOption, link]);

  // // chạy HandleFilter
  // const { totalProductsDB, productList } = HandleFilter(
  //   // productListDraft,
  //   currentPage,
  //   productsPerPage
  // );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // const [currentProducts, setcurrentProducts] = useState(
  //   productList.slice(indexOfFirstProduct, indexOfLastProduct)
  // );

  // const currentProducts = productList
  // .slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  const renderProducts =
    // currentProducts
    productList.map((product, index) => {
      return (
        <Col>
          <ProductCard key={index} screen={"cardProduct"} product={product} />
        </Col>
      );
    });

  // làm tròn
  const totalPages = Math.ceil(total / productsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // khi 1 trong các biến phụ [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]
  // thay đổi sẽ chạy lại để lấy giá trị mới nhất
  useEffect(() => {
    const description = `Đang hiển thị sản phẩm thứ ${
      indexOfFirstProduct + 1
    } đến ${
      indexOfLastProduct > total ? total : indexOfLastProduct
    } trong tổng số ${total} sản phẩm`;
    setProductDescription(description);
  }, [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]);

  // Pagination phân trang
  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        {renderProducts.length > 0 ? (
          <p id="statusPagination">{productDescription}</p>
        ) : (
          <p id="statusPagination">
            Chúng tôi không có sản phẩm nào giống như bạn đang tìm kiếm
          </p>
        )}

        {totalPages !== 1 && (
          <Pagination id="pagination">
            <Pagination.First
              onClick={() => changePage(1)}
              disabled={currentPage === 1}
            />

            <Pagination.Prev
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => changePage(number)}
                >
                  {number}
                </Pagination.Item>
              )
            )}

            <Pagination.Next
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />

            <Pagination.Last
              onClick={() => changePage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    );
  };

  return (
    <>
      {renderProducts.length > 8 && PaginationSet()}
      <Row xs={1} sm={2} lg={3} xl={3} xxl={4}>
        {renderProducts}
      </Row>
      {PaginationSet()}
    </>
  );
}
