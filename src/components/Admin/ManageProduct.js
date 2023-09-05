import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Changedot,
  getCurrentTimeString,
  CheckLink,
} from "../../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import NavbarFilter from "../NavbarFilter";
import Modal from "react-bootstrap/Modal";
import { HandleFilter } from "../../function/functionData";
import "../../css/Cart.css";
import ProductCardAdmin from "./ProductCardAdmin";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import productApi from "../../apis/product.api";
export default function ManageProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productListStore = useSelector(
    (state) => state.productReducer.products
  );
  let link = CheckLink();
  // lấy giá trị ô search
  let searchFilter =
    useSelector((state) => state.productReducer.searchFilter) ?? "";
  const [loading, setLoading] = useState(false);

  // const productList = HandleFilter(productListStore);
  const [productList, setProductList] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  // lấy option sort từ store
  let sortOption = useSelector((state) => state.productReducer.sort) ?? 0;
  // lấy max price sort từ store
  let priceFromValue =
    useSelector((state) => state.productReducer.priceFrom) ?? null;

  // Pagination phân trang
  const productsPerPage = 10;

  const fetchProducts = async () =>
    // keyword, page, NUMBER_RECORDS_PER_PAGE
    {
      // const navigate = useNavigate();
      // !loading && setLoading(true);

      await productApi
        .searchProducts({
          name: searchFilter,
          page: currentPage,
          limit: productsPerPage,
          maxPrice: priceFromValue,
          sortType: sortOption,
          category: null,
        })
        .then((data) => {
          console.log("data.records product", data.records);
          setProductList(data.records);
          setTotal(data.total);
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
          setLoading(false);
        });

      // setSelectedProductIds([]);
    };

  console.log("loading", loading);
  useEffect(() => {
    fetchProducts();
    console.log(
      searchFilter,
      currentPage,
      priceFromValue,
      sortOption,
      link,
      loading
    );
  }, [loading, searchFilter, currentPage, priceFromValue, sortOption, link]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // const currentProducts = productList.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  const renderProducts = productList.map((product, index) => {
    return (
      <ProductCardAdmin
        key={index}
        render={"productCard"}
        i={index}
        product={product}
        setLoading={setLoading}
      />
    );
  });

  // làm tròn
  const totalPages = Math.ceil(total / productsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // khi 1 trong các biến phụ [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]
  // thay đổi sẽ chạy lại để lấy giá trị tất cả
  useEffect(() => {
    const description = `${indexOfFirstProduct + 1} - ${
      indexOfLastProduct > total ? total : indexOfLastProduct
    } trong ${total} sản phẩm`;
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
            Không có sản phẩm nào giống như bạn đang tìm kiếm
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

  let draftProduct = {
    id: null,
    // uuidv4(),
    name: "",
    img: [],
    tag: [],
    price: "",
    comparative: "",
    sku: "",
    description: "",
  };

  // const [draftProduct, setDraftProduct] = useState({
  //   id: uuidv4(),
  //   name: "",
  //   img: [""],
  //   tag: [],
  //   price: "",
  //   comparative: "",
  //   sku: "",
  //   description: "",
  // });

  // useEffect(() => {
  //   setDraftProduct({
  //     id: uuidv4(),
  //     name: "",
  //     img: [""],
  //     tag: [],
  //     price: "",
  //     comparative: "",
  //     sku: "",
  //     description: "",
  //   });
  // }, [renderProducts]);

  return (
    <>
      <NavbarFilter />
      {/* {renderProducts.length > 8 && PaginationSet()} */}
      {renderProducts.length !== 0 && (
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th
                className="text-left position-relative"
                colSpan={2}
                style={{ padding: "auto" }}
              >
                <h6
                  className="position-relative"
                  style={{
                    top: "13px",
                    padding: "auto",
                    display: "inline-block",
                  }}
                >
                  {" "}
                  Thông tin sản phẩm{" "}
                </h6>

                <span style={{ float: "right" }}>
                  <ProductCardAdmin
                    key={0}
                    render={"addProduct"}
                    i={0}
                    product={draftProduct}
                    setLoading={setLoading}
                  />
                </span>
              </th>
              <th className="text-center">Giá</th>
              <th className="text-center">Giá so sánh</th>
              <th className="text-center">SKU</th>
              <th className="text-center">TAG</th>
              <th className="text-center"></th>
            </tr>
          </thead>

          {loading ? (
            <h5 className="text-center msgCartTop">Loading...</h5>
          ) : (
            <tbody>{renderProducts}</tbody>
          )}
        </Table>
      )}
      {PaginationSet()}{" "}
    </>
  );
}
