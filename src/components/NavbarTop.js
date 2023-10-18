import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputSearchBox } from "../actions/productAction";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
  useClearLogined,
} from "../function/functionData";
import UserButton from "./UserButton";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";
import { loginUser } from "../actions/userAction";
import { loginAdmin } from "../actions/adminAction";
import productApi from "../apis/product.api";
function NavbarTop() {
  let link = CheckLink();
  // let userLogined = null;
  const clearLogined = useClearLogined();
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let APIKey = localStorage.getItem("X-API-Key");
  let APIKeyAdmin = localStorage.getItem("X-API-Key-Admin");
  console.log(APIKey, APIKeyAdmin);
 
  useEffect(() => {
    if ((APIKey = null)) {
      dispatch(loginUser(null));
    }
    if ((APIKeyAdmin = null)) {
      dispatch(loginAdmin(null));
    }
    
    authApi
      .getAuth()
      .then((response) => {
        console.log("response", response);
        // Kiểm tra nếu response có user
        if (response.user?.user_id && response.user?.status == 1) {
          dispatch(loginUser(response.user));
          if (link == "/login" || link == "/register" || link == "/resetPass") {
            navigate("/");
          }
        } else {
          // window.location.reload();
          // Xóa X-API-Key nếu không có user trong phản hồi
          clearLogined("user");

          console.log("link is", link);

          if (
            link == "/cart" ||
            link == "/profile" || //
            link == "/changePass" || //
            link == "/order"
          ) {
            navigate("/login");
          }
        }

        // Kiểm tra nếu response có admin
        if (response.admin?.admin_id) {
          dispatch(loginAdmin(response.admin));
        } else {
          // Xóa X-API-Key-Admin nếu không có admin trong phản hồi
          clearLogined("admin");
        }
        console.log("verify:", response);
      })
      .catch((error) => {
        console.log("Lỗi là", error);
        if (error.response.data.error == "Không thể xác thực người dùng.") {
          clearLogined("user");
          if (
            link == "/cart" ||
            link == "/profile" || //
            link == "/changePass" || //
            link == "/order"
          ) {
            navigate("/login");
          }
        } else if (
          error.response.data.error == "Không thể xác thực quản trị viên."
        ) {
          clearLogined("admin");
        } else {
          clearLogined("all");
          if (
            link == "/cart" ||
            link == "/profile" || //
            link == "/changePass" || //
            link == "/order"
          ) {
            navigate("/login");
          }
        }
      });
  }, [link]);

  let cartUserLogined = useSelector(
    (state) => state.userReducer.userLogined?.cart
  );

  useEffect(() => {
    console.log("userLogined", userLogined);
    if (userLogined && userLogined.user_id) {
      userApi
        .updateUser(userLogined.user_id, { cart: userLogined.cart })
        .then(() => {
          // navigate('/admin/users');
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            // alert(error.response?.statusText);
            // navigate("/login");
          } else {
            console.log(error.response?.statusText);
          }
        });
    } else {
      console.log("userLogined is null or user_id is missing");
    }
  }, [cartUserLogined]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // lấy list không trùng lặp tag đầu tiên của mỗi sản phẩm
  // let tagsProducts = useGetTagsProducts();
  const getTag = async () => {
    // const navigate = useNavigate();
    // setLoading(true);

    await productApi
      .getTag({})
      .then((data) => {
        console.log("1-lấy các tag", data.tags);
        // setValue(data.maxPrice);
        // setMinPrice(data.minPrice);
        // setMaxPrice(data.maxPrice);
        setTagsProducts(data.tags);
        console.log("data.tags", data.tags);
        // setLoading(false);
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
  const carouselItem = tagsProducts.map((tag) => {
    let urlLink = "/" + tag;
    return (
      <NavDropdown.Item href={urlLink}>
        {tag.toLocaleUpperCase()}{" "}
      </NavDropdown.Item>
    );
  });

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbar-top"
      style={{ zIndex: "800" }}
    >
      <Link to="/">
        <div className="logo-set-small">
          <img
            id="icon-logo"
            style={{ width: "100px", height: "60px", marginLeft: "10px" }}
            src={logo}
            alt="cozy"
          />
        </div>
      </Link>

      <Container fluid>
        {/* <Navbar.Brand href="#">Bộ sưu tập:</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <Nav.Link href="/aboutUs">Về chúng tôi</Nav.Link>
            <Nav.Link href="/aboutProduct">Sản phẩm</Nav.Link>
            <Nav.Link href="/contactUs">Liên hệ</Nav.Link>

            <NavDropdown title="Bộ sưu tập" id="navbarScrollingDropdown">
              {carouselItem}
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Navbar.Brand className="d-flex">
            <UserButton link={link} />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
