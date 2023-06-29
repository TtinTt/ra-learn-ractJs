import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showJob } from "../actions/jobAction";
import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import "../css/JobList.css";
import Badge from "react-bootstrap/Badge";

export default function JobList() {
  const jobList = useSelector((state) => state.jobReducer.jobs);
  const searchFilter =
    useSelector((state) => state.jobReducer.searchFilter) ?? "";
  const dispatch = useDispatch();

  // console.log(jobList);

  const handleSetJobShow = (job) => {
    dispatch(showJob(job));
  };

  //   show job đầu tiên trong list
  useEffect(() => {
    handleSetJobShow(jobList[0]);
  }, []);

  const removeAccentsUpperCase = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toUpperCase();
  };

  const jobs = jobList.map((job, index) => {
    return (
      (removeAccentsUpperCase(job.service).includes(
        removeAccentsUpperCase(searchFilter).toLowerCase()
      ) ||
        removeAccentsUpperCase(job.company.name).includes(
          removeAccentsUpperCase(searchFilter).toLowerCase()
        )) && (
        <ListGroup defaultActiveKey="#link1">
          <ListGroup.Item action onClick={() => handleSetJobShow(job)}>
            <Card.Img
              id="jobLogo"
              className="m-r-3"
              variant="left"
              src={
                job.company.logo ??
                "https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01d787b5e5b0001ebb6bb/0x0.png"
              }
            />
            <Card.Body style={{ display: "inlineBlock" }}>
              <Card.Title>{job.service}</Card.Title>
              <Card.Text>
                <h6>{job.company.name.toUpperCase()}</h6>

                <Badge bg="secondary">
                  {job.incomeFrom}- {job.incomeTo}$
                </Badge>
                <ListGroup variant="flush">
                  <ListGroup.Item>{job.location}</ListGroup.Item>
                  <ListGroup.Item> Công việc {job.type}</ListGroup.Item>
                  {/* <ListGroup.Item> {job.postTime}</ListGroup.Item> */}
                  <ListGroup.Item> Hết hạn {job.expire}</ListGroup.Item>
                </ListGroup>
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </ListGroup.Item>
        </ListGroup>
      )
    );
  });

  return <>{jobs}</>;
}
