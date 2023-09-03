import { createReducer } from "@reduxjs/toolkit";

const productReducer = createReducer(
  {
    sort: 0,
    priceFrom: null,
    searchFilter: "",
    // products: [
    //   {
    //     id: "a256b54a-71c7-4304-b5c1-cfdd8aebb24f",
    //     name: "Dây Chuyền Gỗ Resin Hồ Quang Xanh Lam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/21ac32/1542615660/il_1140xN.1542615660_1mu1.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/862a8b/3977908583/il_794xN.3977908583_r5oo.jpg",
    //     ],
    //     tag: ["necklace", "blue"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N1",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "f79d80ec-8c0b-4ab2-8bef-dc3bbe7ddddc",
    //     name: "Dây Chuyền Gỗ Resin Trắng Ngọc Trai",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/68f25f/1590520755/il_1140xN.1590520755_44um.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/0285ba/3975842673/il_1140xN.3975842673_c8rs.jpg",
    //     ],
    //     tag: ["necklace", "white"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N2",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "ea2b9590-fda7-4612-bffe-e34991947582",
    //     name: "Dây Chuyền Gỗ Resin Xanh Ngọc",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/18dab6/3617508833/il_794xN.3617508833_gm3t.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/c1205c/3719186320/il_794xN.3719186320_pj26.jpg",
    //     ],
    //     tag: ["necklace", "green"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N3",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "bb148a1c-60ca-41c0-829b-5effecac178c",
    //     name: "Dây Chuyền Gỗ Resin Đổi Màu",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/addba9/4491268608/il_794xN.4491268608_imnj.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/545609/4538637421/il_794xN.4538637421_i9xb.jpg",
    //     ],
    //     tag: ["necklace", "purple"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N4",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "1a17d193-e6da-49ba-9ca7-fb7b08aafac2",
    //     name: "Nhẫn Gỗ Mặt Resin Vàng 24K",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/5fac66/1552146121/il_794xN.1552146121_k00k.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/f8a270/1552138681/il_794xN.1552138681_73ib.jpg",
    //     ],
    //     tag: ["ring", "gold"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R1",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "eac2d8dc-7971-4f9f-a525-de97a7bc421d",
    //     name: "Nhẫn Gỗ Mặt Đá Mắt Rắn Trắng ",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/07daf8/1499004338/il_794xN.1499004338_2ebw.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/c04d45/1498999256/il_794xN.1498999256_bikd.jpg",
    //     ],
    //     tag: ["ring", "white"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R2",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "1fed1bb0-4bce-42d4-aa26-3bcdbaf45513",
    //     name: "Nhẫn Gỗ Mặt Resin Ánh Xanh",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/a27213/4566070643/il_794xN.4566070643_1dan.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/c80ff2/4518686088/il_794xN.4518686088_cwu7.jpg",
    //     ],
    //     tag: ["ring", "green"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R3",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "f3705870-2d0a-4b01-9833-8a53d54ad62b",
    //     name: "Nhẫn Đá Xanh Ánh Vàng Kim",
    //     img: [
    //       "https://i.etsystatic.com/7587351/r/il/b0eff4/4082699057/il_794xN.4082699057_rh0x.jpg",
    //       "https://i.etsystatic.com/7587351/r/il/0185e6/4035052566/il_794xN.4035052566_gdy6.jpg",
    //     ],
    //     tag: ["ring", "gold"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R4",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "d9a2b7a7-9008-4031-8aa3-47e922215fb4",
    //     name: "Nhẫn Gỗ Sọc Resin Ánh Xanh ",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/b9a812/4373259877/il_794xN.4373259877_fss4.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/9fd389/4371855735/il_794xN.4371855735_g8vd.jpg",
    //     ],
    //     tag: ["ring", "green"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R5",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "51868b26-c3d7-49dc-ad24-ce320686e7c2",
    //     name: "Nhẫn Gỗ Mặt Resin Núi Tuyết",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/ba413c/1592852567/il_794xN.1592852567_10qh.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/ad1720/1545396614/il_794xN.1545396614_a6an.jpg",
    //     ],
    //     tag: ["ring", "white", "blue"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R6",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "03bfd85a-3ec1-4989-a561-a335ddf80d67",
    //     name: "Hoa Tai Resin Hồ Quang Ánh Xanh",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/d2df1b/1467325100/il_794xN.1467325100_79ko.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/430ac4/1513525313/il_794xN.1513525313_dwms.jpg",
    //     ],
    //     tag: ["earrings", "green", "blue"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E1",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "afe3d018-395c-442c-9288-430dc1e24503",
    //     name: "Hoa Tai Gỗ Resin Trái Tim Ánh Xanh ",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/06925a/4582778327/il_794xN.4582778327_hw35.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/a3ae2d/4535395834/il_794xN.4535395834_c9yf.jpg",
    //     ],
    //     tag: ["earrings", "green"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E2",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "e5922edd-4568-4b19-a38a-a91f10e3cd87",
    //     name: "Hoa Tai Gỗ Resin Trắng Ngọc Trai",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/5010d1/1599438739/il_794xN.1599438739_3vt6.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/6008fc/3821887108/il_794xN.3821887108_ex64.jpg",
    //     ],
    //     tag: ["earrings", "white"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E3",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "9080026a-20f4-431b-952f-f769c89cfca4",
    //     name: "Hoa Tai Gỗ Resin Trắng Ngọc Trai Ánh Tím",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/8c14e7/4008033761/il_794xN.4008033761_h83w.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/f82d80/3960376380/il_794xN.3960376380_hmgp.jpg",
    //     ],
    //     tag: ["earrings", "purple"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E4",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "d03b49eb-8815-4747-80c0-d04e5d96b8c6",
    //     name: "Hoa Tai Resin Ánh Cam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/dbfe0a/4749360354/il_794xN.4749360354_bmqo.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/9ed834/3973110145/il_794xN.3973110145_8ta8.jpg",
    //     ],
    //     tag: ["earrings", "orange"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E5",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "729d462c-a970-46a2-9aa2-64404532ed7c",
    //     name: "Hoa Tai Gỗ Resin Ánh Cam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/f9ffe6/2423987614/il_794xN.2423987614_89jz.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/42272d/2427715848/il_794xN.2427715848_ol23.jpg",
    //     ],
    //     tag: ["earrings", "orange"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E6",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "4d4ece62-43b2-44d6-a3d0-43a19c9d727b",
    //     name: "Hoa Tai Gỗ Đen Resin Ánh Vàng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/c3cd32/2427834418/il_794xN.2427834418_tt4k.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/1f0744/2427833258/il_794xN.2427833258_5zkf.jpg",
    //     ],
    //     tag: ["earrings", "gold"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E7",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "a9554bd5-79f8-4d99-b5aa-0e2f3c48ce34",
    //     name: "Hoa Tai Gỗ Chữ Nhật Đen Resin Ánh Vàng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/f7b5a9/2475494223/il_794xN.2475494223_czan.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/23bac5/2475493923/il_794xN.2475493923_1mxj.jpg",
    //     ],
    //     tag: ["earrings", "gold"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E8",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "3bfacf44-7a40-4768-b8e1-e41102764a5b",
    //     name: "Hoa Tai Gỗ Resin Trắng Ngọc Trai Ánh Hồng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/bc3b4e/3962720778/il_794xN.3962720778_4y17.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/972328/4010381665/il_794xN.4010381665_lw0m.jpg",
    //     ],
    //     tag: ["earrings", "pink"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E9",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "12ee52d9-beaa-4f23-9b47-45501d18dfe9",
    //     name: "Hoa Tai Ngọc Trai Ánh Hồng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/e63c24/3886813300/il_794xN.3886813300_iryl.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/acc519/3886807284/il_794xN.3886807284_kf77.jpg",
    //     ],
    //     tag: ["earrings", "pink"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E10",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "23ee786b-a7f0-4253-8cd6-007b70aaef3d",
    //     name: "Vòng Tay Gỗ Resin Ánh Lam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/4543b5/2019575109/il_794xN.2019575109_fr9j.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/8fadfc/1972030642/il_794xN.1972030642_ppwl.jpg",
    //     ],
    //     tag: ["bracelet", "blue"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B1",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "1f9ee3be-2169-4a76-80eb-dfd7aea0b784",
    //     name: "Vòng Tay Gỗ Resin Sóng Biển",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/d7abe2/2547503903/il_794xN.2547503903_cl8d.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/eea643/2549671363/il_794xN.2549671363_f9gv.jpg",
    //     ],
    //     tag: ["bracelet", "blue"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B2",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "9ceebf2f-bda6-498e-9cbc-19401af5152c",
    //     name: "Vòng Tay Gỗ Resin Ánh Lục",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/089616/1971992124/il_794xN.1971992124_3f2p.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/a47e48/2019544131/il_794xN.2019544131_2n5z.jpg",
    //     ],
    //     tag: ["bracelet", "green"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B3",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "c83aae2d-380e-4a53-9b50-db91ded99e3f",
    //     name: "Vòng Tay Gỗ Resin Hồ Quang",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/827146/1971990392/il_794xN.1971990392_lvge.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/283bf2/2019544417/il_794xN.2019544417_jplz.jpg",
    //     ],
    //     tag: ["bracelet", "orange"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B4",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "184f61c7-e68b-4d09-8421-5e6c5c48ded5",
    //     name: "Vòng Tay Gỗ Resin Trắng Khói",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/cbcf6e/2586841573/il_794xN.2586841573_7miw.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/af336d/2539192428/il_794xN.2539192428_h68y.jpg",
    //     ],
    //     tag: ["bracelet", "white", "gray"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B5",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "92db63f9-e909-4e22-ac1d-65d8a46f2736",
    //     name: "Vòng Tay Gỗ Resin Trắng Hồng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/d71573/2019637203/il_794xN.2019637203_lq0e.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/fe1452/1972082530/il_794xN.1972082530_juro.jpg",
    //     ],
    //     tag: ["bracelet", "pink", "white"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B6",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "65f22e52-f67e-4727-a433-334dbd18a3cb",
    //     name: "Vòng Tay Gỗ Resin Ánh Tím",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/a2df62/1971893978/il_794xN.1971893978_i95e.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/007b0f/1971887788/il_794xN.1971887788_6z8q.jpg",
    //     ],
    //     tag: ["bracelet", "purple"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B7",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "ee4fdabb-d630-4d53-bb48-7707ffe308dc",
    //     name: "Vòng Tay Gỗ Resin Ánh Lam Sẫm",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/4b166f/1971887528/il_794xN.1971887528_k2x2.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/ffc4bb/1971887622/il_794xN.1971887622_e2bm.jpg",
    //     ],
    //     tag: ["bracelet", "blue"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B8",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "22d82fb6-b5ba-4602-9971-7fccdcc4ece0",
    //     name: "Vòng Tay Gỗ Resin Ánh Cam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/ec9e86/2019227537/il_794xN.2019227537_6hfr.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/5fadad/1971865572/il_794xN.1971865572_6m14.jpg",
    //     ],
    //     tag: ["bracelet", "orange"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B9",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "e8cf0f31-16c6-402c-a02a-9c16655e32fa",
    //     name: "Vòng Tay Gỗ Đen Resin Ánh Vàng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/750fa7/2547524575/il_794xN.2547524575_iayq.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/b45eb9/2549669231/il_794xN.2549669231_b65d.jpg",
    //     ],
    //     tag: ["bracelet", "gold"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B10",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "91938d4f-ba87-4f60-bfbb-f5d5816882fa",
    //     name: "Đồng Hồ Gỗ Resin Biển Xanh 50cm",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/fe8471/3906989417/il_794xN.3906989417_58si.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/c98022/3906985837/il_794xN.3906985837_f2w2.jpg",
    //     ],
    //     tag: ["homeDecor", "blue"],
    //     price: "725000",
    //     comparative: "",
    //     sku: "H1",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "6fd7cbc1-f89b-4e70-b7c2-d453be21eac4",
    //     name: "Thánh Giá Gỗ Resin Biển Xanh 50cm",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/061aa6/4601434565/il_794xN.4601434565_qi5w.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/be8735/4601413451/il_794xN.4601413451_9g2t.jpg",
    //     ],
    //     tag: ["homeDecor", "blue"],
    //     price: "525000",
    //     comparative: "",
    //     sku: "H2",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "4af58088-fbb7-476d-b31e-e2ecac786c18",
    //     name: "Đồng Hồ Gỗ 50cm",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/be5f28/4340298237/il_794xN.4340298237_dz1b.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/22b1f6/4339483033/il_794xN.4339483033_hrzn.jpg",
    //     ],
    //     tag: ["homeDecor", "wood"],
    //     price: "725000",
    //     comparative: "",
    //     sku: "H3",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "00e29b41-3279-4e4a-a27c-d8908be97632",
    //     name: "Tranh Gỗ Resin Hoàng Hôn Treo Tường",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/ad4180/2330717621/il_794xN.2330717621_13t3.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/abe75e/2283109868/il_794xN.2283109868_9x3w.jpg",
    //     ],
    //     tag: ["homeDecor", "wood", "blue", "red"],
    //     price: "625000",
    //     comparative: "780000",
    //     sku: "H4",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "eb8e4c48-d94a-4495-bdfd-6fcaac959b2e",
    //     name: "Tranh Gỗ Resin Biển Xanh Treo Tường",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/9ae655/2301270980/il_794xN.2301270980_iqcf.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/6eb9f4/2348861133/il_794xN.2348861133_jlk9.jpg",
    //     ],
    //     tag: ["homeDecor", "wood", "blue", "green"],
    //     price: "625000",
    //     comparative: "780000",
    //     sku: "H5",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "08fc56f8-a556-4be4-9f06-cf8eaa8d6643",
    //     name: "Dây Chuyền Gỗ Resin Trái Tim Trắng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/f8ec98/3930689440/il_794xN.3930689440_41ez.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/acb44c/3978145303/il_794xN.3978145303_ifr2.jpg",
    //     ],
    //     tag: ["necklace", "white"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N5",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "79f7d5b2-9767-4e12-a81c-70ccf6623b30",
    //     name: "Dây Chuyền Gỗ Resin Thanh Xanh Lam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/dddd31/1301183749/il_794xN.1301183749_eel1.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/4fc0fc/1253937706/il_794xN.1253937706_8z3g.jpg",
    //     ],
    //     tag: ["necklace", "blue"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N6",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "3d0b9e0b-58e5-44a6-a1cd-7cd606303204",
    //     name: "Dây Chuyền Giọt Nước Gỗ Đen Resin Vàng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/f24bf5/2391673509/il_1140xN.2391673509_jj6v.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/faeca1/2391667709/il_1140xN.2391667709_9iqg.jpg",
    //     ],
    //     tag: ["necklace", "black"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N7",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "0c8b314d-2fa6-40cc-bb91-c845ab38e505",
    //     name: "Dây Chuyền Giọt Nước Gỗ Resin Hồng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/b7cdb7/4705125299/il_1140xN.4705125299_hlsc.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/71a1c6/4541877573/il_1140xN.4541877573_460j.jpg",
    //     ],
    //     tag: ["necklace", "pink"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N8",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "ebe86d1f-cae7-49df-95df-706f8d07e892",
    //     name: "Dây Chuyền Gỗ Resin Trái Tim Xanh Lam",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/82af02/3660111206/il_794xN.3660111206_k59w.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/6ecec2/3595581454/il_794xN.3595581454_h52h.jpg",
    //     ],
    //     tag: ["necklace", "blue"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N9",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "023dba90-0f42-44b9-8b01-2ac14891d48e",
    //     name: "Dây Chuyền Gỗ Resin Hồ Quang Xanh Biển",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/836cb5/1761329336/il_794xN.1761329336_ijws.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/548909/1761327672/il_794xN.1761327672_pshi.jpg",
    //     ],
    //     tag: ["necklace", "blue"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N10",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "96244850-b5c6-48a7-9e0d-216ee81aafc7",
    //     name: "Dây Chuyền Gỗ Resin Trắng Hồng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/2ac198/4541817769/il_794xN.4541817769_oy66.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/3fa952/4494450064/il_794xN.4494450064_hxl6.jpg",
    //     ],
    //     tag: ["necklace", "white", "pink"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N11",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "0a032d10-debb-4c29-8a7e-5289134cd2b2",
    //     name: "Dây Chuyền Giọt Nước Gỗ Resin Hồ Quang",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/3da602/3955361266/il_794xN.3955361266_75rj.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/d4d68c/4003022387/il_794xN.4003022387_7qd9.jpg",
    //     ],
    //     tag: ["necklace", "blue"],
    //     price: "150000",
    //     comparative: "320000",
    //     sku: "N12",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "e7723516-1ccd-47de-8898-179b17e30ccc",
    //     name: "Đèn Ngủ Gỗ Resin Rùa Biển",
    //     img: [
    //       "https://i.etsystatic.com/27568489/r/il/1979d1/3416919524/il_794xN.3416919524_omlk.jpg",
    //       "https://i.etsystatic.com/27568489/r/il/abe390/3446392464/il_794xN.3446392464_gscf.jpg",
    //     ],
    //     tag: ["homeDecor", "blue"],
    //     price: "925000",
    //     comparative: "1800000",
    //     sku: "H6",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "a86bb130-b74f-43d5-bfcc-68f0ffdb1f41",
    //     name: "Đèn Ngủ Gỗ Resin Cá Biển",
    //     img: [
    //       "https://i.etsystatic.com/27568489/r/il/c154c3/3394360808/il_794xN.3394360808_go8o.jpg",
    //       "https://i.etsystatic.com/27568489/r/il/782375/3394301482/il_794xN.3394301482_9ij6.jpg",
    //     ],
    //     tag: ["homeDecor", "blue"],
    //     price: "925000",
    //     comparative: "1800000",
    //     sku: "H7",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "c935c1f1-6240-4d83-88c7-9f73c92b2ba5",
    //     name: "Đèn Ngủ Gỗ Resin Thợ Lặn",
    //     img: [
    //       "https://i.etsystatic.com/27568489/r/il/996485/3553248620/il_794xN.3553248620_ermw.jpg",
    //       "https://i.etsystatic.com/27568489/r/il/2e9f94/3553248690/il_794xN.3553248690_f8ml.jpg",
    //     ],
    //     tag: ["homeDecor", "blue"],
    //     price: "925000",
    //     comparative: "1800000",
    //     sku: "H8",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "36931978-4952-437c-ad50-f78259c8c4c9",
    //     name: "Nhẫn Resin Hồ Quang Ánh Xanh Lục",
    //     img: [
    //       "https://i.etsystatic.com/34961063/r/il/25a58f/3797932373/il_794xN.3797932373_nnon.jpg",
    //       "https://i.etsystatic.com/34961063/r/il/8f0dc2/3750339902/il_794xN.3750339902_t060.jpg",
    //     ],
    //     tag: ["ring", "green"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R7",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "7c27c3df-1a32-4991-9d1b-2580d26d86c0",
    //     name: "Nhẫn Resin Hồ Quang Ánh Xanh Lam",
    //     img: [
    //       "https://i.etsystatic.com/31573162/r/il/658a6a/4079659638/il_794xN.4079659638_oisy.jpg",
    //       "https://i.etsystatic.com/31573162/r/il/fd20f1/4127308531/il_794xN.4127308531_fvd9.jpg",
    //     ],
    //     tag: ["ring", "blue"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "R8",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "3151ee80-a191-47db-b5e9-8d32abead014",
    //     name: "Hoa Tai Gỗ Vuông Đen Resin Ánh Vàng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/2afbeb/2475511881/il_794xN.2475511881_qusq.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/fb9095/2427873696/il_794xN.2427873696_49qk.jpg",
    //     ],
    //     tag: ["earrings", "gold"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E11",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "14d69462-ec66-4b85-a109-706d7f0629a3",
    //     name: "Hoa Tai Ngọc Trai Ánh Trắng",
    //     img: [
    //       "https://i.etsystatic.com/12328946/r/il/09512d/1466274410/il_794xN.1466274410_5nah.jpg",
    //       "https://i.etsystatic.com/12328946/r/il/3cbd27/1514504307/il_794xN.1514504307_4pxf.jpg",
    //     ],
    //     tag: ["earrings", "white"],
    //     price: "1800000",
    //     comparative: "2200000",
    //     sku: "E12",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "7644feeb-8085-4279-809c-c58a8ef926b7",
    //     name: "Vòng Tay Gỗ Resin Hoa Dại Xanh Dương",
    //     img: [
    //       "https://i.etsystatic.com/7276853/r/il/7727ae/4109534050/il_794xN.4109534050_lumu.jpg",
    //       "https://i.etsystatic.com/7276853/r/il/e155f5/4237663699/il_794xN.4237663699_hhfg.jpg",
    //     ],
    //     tag: ["bracelet", "blue"],
    //     price: "250000",
    //     comparative: "480000",
    //     sku: "B11",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    //   {
    //     id: "b594eed3-7997-4e30-9203-b37d958699fc",
    //     name: "Vòng Tay Gỗ Resin Hoa Lá ",
    //     img: [
    //       "https://i.etsystatic.com/7276853/r/il/a0d96a/1043942171/il_794xN.1043942171_8qme.jpg",
    //       "https://i.etsystatic.com/7276853/r/il/b52f89/1930959092/il_794xN.1930959092_ua1c.jpg",
    //     ],
    //     tag: ["bracelet"],
    //     price: "450000",
    //     comparative: "",
    //     sku: "B12",
    //     description:
    //       "Sản phẩm được làm thủ công, quá trình gia công tỉ mỉ và hoàn hảo tới từng chi tiết.",
    //   },
    // ],
    searchFilter: "",
    products: [],
  },
  {
    SORT_PRODUCTS: (state, action) => {
      return {
        ...state,
        sort: action.payload,
      };
    },
    SEARCH_BOX: (state, action) => {
      return {
        ...state,
        searchFilter: action.payload,
      };
    },
    SORT_PRICE_FROM: (state, action) => {
      return {
        ...state,
        priceFrom: action.payload,
      };
    },
    EDIT_PRODUCT: (state, action) => {
      // console.log("edit");
      let updatedProduct = state.products.map((product) => {
        if (product.product_id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      return {
        ...state,
        products: updatedProduct,
      };
    },
    ADD_PRODUCT: (state, action) => {
      // console.log("add");
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    },
    DELETE_PRODUCT: (state, action) => {
      let updatedProduct = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        products: updatedProduct,
      };
    },
  }
);

export default productReducer;
