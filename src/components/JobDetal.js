import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showJob } from "../actions/jobAction";
import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import "../css/JobDetal.css";
import Badge from "react-bootstrap/Badge";

export default function JobDetal() {
  const jobShow = useSelector((state) => state.jobReducer.jobShow) ?? {
    id: "",
    service: "",
    company: {
      id: "",
      name: "",
      logo: "",
      about: "",
    },
    incomeFrom: "",
    incomeTo: "",
    location: "",
    type: "",
    postTime: "",
    expire: "",
    applicants: "",
    employees: "",
    about: "",
    responsibility: [""],
    skill: [""],
    request: [""],
    benefit: [""],
  };

  const dispatch = useDispatch();

  // console.log("hi", jobShow);
  return (
    <>
      <ListGroup className="detalJob">
        <ListGroup.Item>
          <Card.Body style={{ display: "inlineBlock" }}>
            <Card.Title>
              <h2>
                {jobShow.service}{" "}
                <Badge bg="secondary">
                  Thu nhập từ {jobShow.incomeFrom}-{jobShow.incomeTo}$
                </Badge>
              </h2>
            </Card.Title>
            <p>
              {jobShow.company.name.toUpperCase() +
                " · " +
                jobShow.location +
                " · Công việc " +
                jobShow.type +
                " · Tuyển dụng từ " +
                jobShow.postTime +
                " · Hết hạn " +
                jobShow.expire}
            </p>
            <Button variant="warning">Ứng tuyển</Button>{" "}
            <Button variant="primary">Lưu</Button>
            <hr />
            <Card.Title>Tổng quan</Card.Title>
            <Card.Text>
              <>{jobShow.about}</>
            </Card.Text>
            <Card.Title>Nội dung công việc:</Card.Title>
            <Card.Text>
              <ul>
                {jobShow.responsibility.map((skill, index) => {
                  return <li>{skill}</li>;
                })}
              </ul>
            </Card.Text>
            <Card.Title>Kỹ năng cần có:</Card.Title>
            <Card.Text>
              <ul>
                {jobShow.skill.map((skill, index) => {
                  return <li>{skill}</li>;
                })}
              </ul>
            </Card.Text>
            <Card.Title>Yêu cầu công việc:</Card.Title>
            <Card.Text>
              <ul>
                {jobShow.request.map((skill, index) => {
                  return <li>{skill}</li>;
                })}
              </ul>
            </Card.Text>
            <Card.Title>Quyền lợi:</Card.Title>
            <Card.Text>
              <ul>
                {jobShow.benefit.map((skill, index) => {
                  return <li>{skill}</li>;
                })}
              </ul>
            </Card.Text>
            <hr />
            <Card.Img
              id="jobLogo"
              className="m-r-3"
              variant="left"
              src={
                jobShow.company.logo ??
                "https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01d787b5e5b0001ebb6bb/0x0.png"
              }
            />
            <Card.Title>
              Thông tin về {jobShow.company.name.toUpperCase()}
              <span>
                <Button variant="secondary">Xem thêm</Button>
              </span>
            </Card.Title>
            <Card.Text>{jobShow.company.about} </Card.Text>
          </Card.Body>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
