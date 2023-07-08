import { createReducer } from "@reduxjs/toolkit";

const orderReducer = createReducer(
  {
    filter: 0,
    searchFilter: "",
    orders: [
      {
        email: "demoUser1@gmail.com",
        id: "20604dc5-33f4-4f15-aa14-aeee7c9584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 06/07/2023",
        status: "0",
      },
      {
        email: "demoUser2@gmail.com",
        id: "3ac39be7-b4e0-444d-a6bb-f31f96267c8f",
        cart: [
          {
            id: "a256b54a-71c7-4304-b5c1-cfdd8aebb24f",
            name: "Dây Chuyền Gỗ Resin Hồ Quang Xanh Lam",
            img: [
              "https://i.etsystatic.com/12328946/r/il/21ac32/1542615660/il_1140xN.1542615660_1mu1.jpg",
              "https://i.etsystatic.com/12328946/r/il/862a8b/3977908583/il_794xN.3977908583_r5oo.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "f79d80ec-8c0b-4ab2-8bef-dc3bbe7ddddc",
            name: "Dây Chuyền Gỗ Resin Trắng Ngọc Trai",
            img: [
              "https://i.etsystatic.com/12328946/r/il/68f25f/1590520755/il_1140xN.1590520755_44um.jpg",
              "https://i.etsystatic.com/12328946/r/il/0285ba/3975842673/il_1140xN.3975842673_c8rs.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "ea2b9590-fda7-4612-bffe-e34991947582",
            name: "Dây Chuyền Gỗ Resin Xanh Ngọc",
            img: [
              "https://i.etsystatic.com/12328946/r/il/18dab6/3617508833/il_794xN.3617508833_gm3t.jpg",
              "https://i.etsystatic.com/12328946/r/il/c1205c/3719186320/il_794xN.3719186320_pj26.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "11:08 05/07/2023",
        status: "1",
      },
      {
        email: "demoUser3@gmail.com",
        id: "33c0ecdf-ab9f-444d-a4d5-faf32d1974bf",
        cart: [
          {
            id: "f79d80ec-8c0b-4ab2-8bef-dc3bbe7ddddc",
            name: "Dây Chuyền Gỗ Resin Trắng Ngọc Trai",
            img: [
              "https://i.etsystatic.com/12328946/r/il/68f25f/1590520755/il_1140xN.1590520755_44um.jpg",
              "https://i.etsystatic.com/12328946/r/il/0285ba/3975842673/il_1140xN.3975842673_c8rs.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "bb148a1c-60ca-41c0-829b-5effecac178c",
            name: "Dây Chuyền Gỗ Resin Đổi Màu",
            img: [
              "https://i.etsystatic.com/12328946/r/il/addba9/4491268608/il_794xN.4491268608_imnj.jpg",
              "https://i.etsystatic.com/12328946/r/il/545609/4538637421/il_794xN.4538637421_i9xb.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "1a17d193-e6da-49ba-9ca7-fb7b08aafac2",
            name: "Nhẫn Gỗ Mặt Resin Vàng 24K",
            img: [
              "https://i.etsystatic.com/12328946/r/il/5fac66/1552146121/il_794xN.1552146121_k00k.jpg",
              "https://i.etsystatic.com/12328946/r/il/f8a270/1552138681/il_794xN.1552138681_73ib.jpg",
            ],
            tag: ["Ring"],
            price: "250000",
            comparative: "480000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "09:19 04/07/2023",
        status: "2",
      },
      {
        email: "demoUser1@gmail.com",
        id: "15a5fa04-36bb-4f97-85c4-5ee9e565d913",
        cart: [
          {
            id: "08fc56f8-a556-4be4-9f06-cf8eaa8d6643",
            name: "Dây Chuyền Gỗ Resin Trái Tim Trắng",
            img: [
              "https://i.etsystatic.com/12328946/r/il/f8ec98/3930689440/il_794xN.3930689440_41ez.jpg",
              "https://i.etsystatic.com/12328946/r/il/acb44c/3978145303/il_794xN.3978145303_ifr2.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "eb8e4c48-d94a-4495-bdfd-6fcaac959b2e",
            name: "Tranh Gỗ Resin Biển Xanh Treo Tường",
            img: [
              "https://i.etsystatic.com/12328946/r/il/9ae655/2301270980/il_794xN.2301270980_iqcf.jpg",
              "https://i.etsystatic.com/12328946/r/il/6eb9f4/2348861133/il_794xN.2348861133_jlk9.jpg",
            ],
            tag: ["HomeDecor"],
            price: "625000",
            comparative: "780000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "12:19 03/07/2023",
        status: "-1",
      },
      {
        email: "demoUser3@gmail.com",
        id: "23604dc5-33f4-4f19-aa14-aeee7c9584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 06/05/2023",
        status: "3",
      },
      {
        email: "demoUser3@gmail.com",
        id: "23604dc5-33f4-4f19-aa14-aeee7c7584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 06/02/2023",
        status: "-2",
      },
      {
        email: "demoUser2@gmail.com",
        id: "236057c5-33f4-4f19-aa14-aeee7c9584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Nguyễn Văn Bảo",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 02/02/2023",
        status: "4",
      },
      {
        email: "demoUser2@gmail.com",
        id: "23604dc5-33f4-4f19-aa14-aeee7c7582b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 12/01/2023",
        status: "-1",
      },
      {
        email: "demoUser1@gmail.com",
        id: "25604dc5-33f4-4f15-aa14-aeee7c9584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Hoàng Thanh Mai",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 06/07/2023",
        status: "0",
      },
      {
        email: "demoUser2@gmail.com",
        id: "3pc38be7-b4e0-444d-a6bb-f31f96267c8f",
        cart: [
          {
            id: "a256b54a-71c7-4304-b5c1-cfdd8aebb24f",
            name: "Dây Chuyền Gỗ Resin Hồ Quang Xanh Lam",
            img: [
              "https://i.etsystatic.com/12328946/r/il/21ac32/1542615660/il_1140xN.1542615660_1mu1.jpg",
              "https://i.etsystatic.com/12328946/r/il/862a8b/3977908583/il_794xN.3977908583_r5oo.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "f79d80ec-8c0b-4ab2-8bef-dc3bbe7ddddc",
            name: "Dây Chuyền Gỗ Resin Trắng Ngọc Trai",
            img: [
              "https://i.etsystatic.com/12328946/r/il/68f25f/1590520755/il_1140xN.1590520755_44um.jpg",
              "https://i.etsystatic.com/12328946/r/il/0285ba/3975842673/il_1140xN.3975842673_c8rs.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "ea2b9590-fda7-4612-bffe-e34991947582",
            name: "Dây Chuyền Gỗ Resin Xanh Ngọc",
            img: [
              "https://i.etsystatic.com/12328946/r/il/18dab6/3617508833/il_794xN.3617508833_gm3t.jpg",
              "https://i.etsystatic.com/12328946/r/il/c1205c/3719186320/il_794xN.3719186320_pj26.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "11:08 05/07/2023",
        status: "1",
      },
      {
        email: "demoUser3@gmail.com",
        id: "34c0ecdf-ab9f-444d-a4d5-faf32d1974bf",
        cart: [
          {
            id: "f79d80ec-8c0b-4ab2-8bef-dc3bbe7ddddc",
            name: "Dây Chuyền Gỗ Resin Trắng Ngọc Trai",
            img: [
              "https://i.etsystatic.com/12328946/r/il/68f25f/1590520755/il_1140xN.1590520755_44um.jpg",
              "https://i.etsystatic.com/12328946/r/il/0285ba/3975842673/il_1140xN.3975842673_c8rs.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "bb148a1c-60ca-41c0-829b-5effecac178c",
            name: "Dây Chuyền Gỗ Resin Đổi Màu",
            img: [
              "https://i.etsystatic.com/12328946/r/il/addba9/4491268608/il_794xN.4491268608_imnj.jpg",
              "https://i.etsystatic.com/12328946/r/il/545609/4538637421/il_794xN.4538637421_i9xb.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "1a17d193-e6da-49ba-9ca7-fb7b08aafac2",
            name: "Nhẫn Gỗ Mặt Resin Vàng 24K",
            img: [
              "https://i.etsystatic.com/12328946/r/il/5fac66/1552146121/il_794xN.1552146121_k00k.jpg",
              "https://i.etsystatic.com/12328946/r/il/f8a270/1552138681/il_794xN.1552138681_73ib.jpg",
            ],
            tag: ["Ring"],
            price: "250000",
            comparative: "480000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "09:19 04/07/2023",
        status: "2",
      },
      {
        email: "demoUser1@gmail.com",
        id: "15a5fa08-36bb-4f97-85c4-5ee9e565d913",
        cart: [
          {
            id: "08fc56f8-a556-4be4-9f06-cf8eaa8d6643",
            name: "Dây Chuyền Gỗ Resin Trái Tim Trắng",
            img: [
              "https://i.etsystatic.com/12328946/r/il/f8ec98/3930689440/il_794xN.3930689440_41ez.jpg",
              "https://i.etsystatic.com/12328946/r/il/acb44c/3978145303/il_794xN.3978145303_ifr2.jpg",
            ],
            tag: ["Necklace"],
            price: "150000",
            comparative: "320000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
          {
            id: "eb8e4c48-d94a-4495-bdfd-6fcaac959b2e",
            name: "Tranh Gỗ Resin Biển Xanh Treo Tường",
            img: [
              "https://i.etsystatic.com/12328946/r/il/9ae655/2301270980/il_794xN.2301270980_iqcf.jpg",
              "https://i.etsystatic.com/12328946/r/il/6eb9f4/2348861133/il_794xN.2348861133_jlk9.jpg",
            ],
            tag: ["HomeDecor"],
            price: "625000",
            comparative: "780000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 1,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "12:19 03/07/2023",
        status: "-1",
      },
      {
        email: "demoUser3@gmail.com",
        id: "23604dc5-33f4-4f19-aa14-aeoo7c9584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 06/05/2023",
        status: "3",
      },
      {
        email: "demoUser3@gmail.com",
        id: "23604dc5-33f4-4f19-pp14-aeee7c7584b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 06/02/2023",
        status: "-2",
      },
      {
        email: "demoUser2@gmail.com",
        id: "236057c5-33f4-4f19-aa14-aeee7c5684b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 02/02/2023",
        status: "4",
      },
      {
        email: "demoUser2@gmail.com",
        id: "23604dc5-33f4-4f19-aa14-atte7c7582b9",
        cart: [
          {
            id: "afe3d018-395c-442c-9288-430dc1e24503",
            name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
            img: [
              "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
              "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
            ],
            tag: ["EarRings"],
            price: "1800000",
            comparative: "2200000",
            sku: "",
            description:
              "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
            quantity: 4,
          },
        ],
        address: {
          name: "Trần Trọng Tín",
          address: "01 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
          phoneNumber: "0999999999",
          note: "",
        },
        date: "2:34 12/01/2023",
        status: "-1",
      },
    ],
  },
  {
    CREATE_ORDER: (state, action) => {
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    },
    CANCEL_ORDER: (state, action) => {
      let updatedOrder = state.orders.map((order) => {
        if (order.id === action.payload) {
          return { ...order, status: "-1" };
        }
        return order;
      });

      return {
        ...state,
        orders: updatedOrder,
      };
    },
    UPDATE_STATUS_ORDER: (state, action) => {
      let updatedOrder = state.orders.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload;
        }
        return order;
      });

      return {
        ...state,
        orders: updatedOrder,
      };
    },
    FILTER_ORDER: (state, action) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
    SEARCH_ORDER: (state, action) => {
      return {
        ...state,
        searchFilter: action.payload,
      };
    },
  }
);

export default orderReducer;
