import { createReducer } from "@reduxjs/toolkit";

const jobReducer = createReducer(
  {
    jobs: JSON.parse(localStorage.getItem("jobs")) ?? [
      {
        id: "75442486-0878-440c-9db1-a7006c25a39f",
        service: "Lập trình viên",
        company: {
          id: "07bba030-1448-4e38-a445-466acb0148fb",
          name: "Microsoft",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
          about:
            "Microsoft là một tập đoàn đa quốc gia của Hoa Kỳ đặt trụ sở chính tại Redmond, Washington; chuyên phát triển, sản xuất, kinh doanh bản quyền phần mềm và hỗ trợ trên diện rộng các sản phẩm và dịch vụ liên quan đến máy tính. Công ty được sáng lập bởi Bill Gates và Paul Allen vào ngày 4 tháng 4 năm 1975. Nếu tính theo doanh thu thì Microsoft là hãng sản xuất phần mềm lớn nhất thế giới.Nó cũng được gọi là 'một trong những công ty có giá trị nhất trên thế giới'",
        },
        incomeFrom: 800,
        incomeTo: 1000,
        location: "Đà Nẵng",
        type: "toàn thời gian",
        postTime: "09-06-2023",
        expire: "09-08-2023",
        applicants: 12,
        employees: 8,
        about:
          "Công việc mong muốn tìm kiếm ứng viên phù hợp, môi trường tuyệt vời với nhiều cơ hội phát triển",
        responsibility: [
          "Phụ trách công việc A",
          "Phụ trách công việc B",
          "Phụ trách công việc C",
        ],
        skill: ["Tiếng Anh", "Giao tiếp tốt", "Kỹ năng làm việc nhóm"],
        request: [
          "Tối thiểu 3 năm kinh nghiệm",
          "Thành thạo ít nhất một ngôn ngữ lập trình trong: Java, C#, Python",
        ],
        benefit: [
          "Nghỉ lễ tết theo quy định",
          "Được đóng BHXH, BHYT",
          "Du lịch tối thiểu 2 lần mỗi năm",
        ],
      },
      {
        id: "132957bd-c34e-4db9-a163-8ad32d126241",
        service: "Thiết kế đồ hoạ",
        company: {
          id: "07bba030-1448-4e38-a445-466acb0148fb",
          name: "Google",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png",
          about:
            "Google LLC ('Công ty TNHH Google') là một công ty công nghệ đa quốc gia của Mỹ, chuyên về các dịch vụ và sản phẩm liên quan đến Internet, bao gồm các công nghệ quảng cáo trực tuyến, công cụ tìm kiếm, điện toán đám mây, phần mềm và phần cứng. Đây được coi là một trong những công ty công nghệ Big Four, cùng với Amazon, Apple và Facebook.",
        },
        incomeFrom: 800,
        incomeTo: 1000,
        location: "Đà Nẵng",
        type: "toàn thời gian",
        postTime: "09-06-2023",
        expire: "09-08-2023",
        applicants: 18,
        employees: 12,
        about:
          "Công việc mong muốn tìm kiếm ứng viên phù hợp, môi trường tuyệt vời với nhiều cơ hội phát triển",
        responsibility: [
          "Phụ trách công việc A",
          "Phụ trách công việc B",
          "Phụ trách công việc C",
        ],
        skill: ["Tiếng Anh", "Thẩm mỹ tốt", "Kỹ năng thuyết trình"],
        request: [
          "Tối thiểu 1 năm kinh nghiệm",
          "Thành thạo Adobe Photoshop, Adobe Illustrator",
        ],
        benefit: [
          "Nghỉ lễ tết theo quy định",
          "Được đóng BHXH, BHYT",
          "Du lịch tối thiểu 2 lần mỗi năm",
        ],
      },

      {
        id: "5c13a7d3-86aa-41d9-8961-d6caef7acbfe",
        service: "Nhân viên Marketing",
        company: {
          id: "8b30648b-757a-4441-9fb1-e9b07f1494b2",
          name: "Facebook",
          logo: "https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_1280.png",
          about:
            "Facebook là một phương tiện truyền thông xã hội và dịch vụ mạng xã hội trực tuyến thành lập vào năm 2004 của Mỹ thuộc sở hữu của Meta Platforms có trụ sở tại Menlo Park, California. Nó được Mark Zuckerberg, cùng với các sinh viên Đại học Harvard và bạn cùng phòng là Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, Chris Hughes sáng lập. Đây được coi là một trong những công ty công nghệ Big Four cùng với Amazon, Apple và Google",
        },
        incomeFrom: 800,
        incomeTo: 1000,
        location: "Đà Nẵng",
        type: "toàn thời gian",
        postTime: "09-06-2023",
        expire: "09-08-2023",
        applicants: 52,
        employees: 9,

        about:
          "Công việc mong muốn tìm kiếm ứng viên phù hợp, môi trường tuyệt vời với nhiều cơ hội phát triển",
        responsibility: [
          "Phụ trách công việc A",
          "Phụ trách công việc B",
          "Phụ trách công việc C",
        ],
        skill: [
          "Tiếng Anh",
          "Tiếng Trung",
          "Kỹ năng làm việc nhóm",
          "Kỹ năng làm việc độc lập",
          "Kỹ năng thuyết trình",
        ],
        request: [
          "Tối thiểu 2 năm kinh nghiệm trong ngành",
          "Từng tham gia tối thiểu 10 chiến dịch marketing vừa và nhỏ",
        ],
        benefit: [
          "Nghỉ lễ tết theo quy định",
          "Được đóng BHXH, BHYT",
          "Du lịch tối thiểu 2 lần mỗi năm",
        ],
      },
      {
        id: "fef25843-4222-4d5e-97ff-ddd9b8497ccb",
        service: "Công việc Demo",
        company: {
          id: "d061cfcd-4141-4b91-a77f-3c8eaf872f81",
          name: "Công ty X",
          about:
            "Công ty X là một tập đoàn đa quốc gia của Việt Nam đặt trụ sở chính tại Hà Nội",
        },
        incomeFrom: 800,
        incomeTo: 1000,
        location: "Đà Nẵng",
        type: "toàn thời gian",
        postTime: "09-06-2023",
        expire: "09-08-2023",
        applicants: 12,
        employees: 8,
        about:
          "Công việc mong muốn tìm kiếm ứng viên phù hợp, môi trường tuyệt vời với nhiều cơ hội phát triển",
        responsibility: [
          "Phụ trách công việc A",
          "Phụ trách công việc B",
          "Phụ trách công việc C",
        ],
        skill: ["Tiếng Anh", "Giao tiếp tốt", "Kỹ năng làm việc nhóm"],
        request: [
          "Tối thiểu 3 năm kinh nghiệm",
          "Thành thạo ít nhất một ngôn ngữ lập trình trong: Java, C#, Python",
        ],
        benefit: [
          "Nghỉ lễ tết theo quy định",
          "Được đóng BHXH, BHYT",
          "Du lịch tối thiểu 2 lần mỗi năm",
        ],
      },
    ],
  },
  {
    SHOW_JOB: (state, action) => {
      // let jobWillShow = state.jobs.find((job) => job.id == action.payload);

      return {
        ...state,
        jobShow: action.payload,
      };
    },
  }
);

export default jobReducer;
