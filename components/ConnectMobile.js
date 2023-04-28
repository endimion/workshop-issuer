import SSE from "./Sse";
import { Table, Row, Col, Container } from "react-bootstrap";
import HomeButton from "./HomeButton";

const ConnectMobile = (props) => {
  let index = 0;
  const permissions = ["Push Notifications"].map((permission) => {
    index++;
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{permission}</td>
      </tr>
    );
  });

  return (
    <Container>
      <SSE
        uuid={props.uuid}
        serverSessionId={props.serverSessionId}
        sealSession={props.sealSession}
        basePath={props.baseUrl}
        eventEndpoint={props.eventEndpoint}
      />

      <Row>
        <Col>
          <div
            style={{
              margin: "auto",
              width: "50%",
            }}
          >
            <a
              className="btn btn-primary"
              href={encodeURI(`me.uport:req/${props.qrData}`)}
              role="button"
              style={{ marginTop: "3rem" }}
            >
              Connect with uPort
            </a>
          </div>
        </Col>
      </Row>

      <Row>
        <Container>
          <Row>
            <p id="uPortMessage">
              UAegean Issuer Service is requesting to connect with your wallet:
            </p>
            <style jsx>
              {`
                #uPortMessage {
                  margin-top: 2em;
                }
              `}
            </style>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Requested Permission</th>
                </tr>
              </thead>
              <tbody>{permissions}</tbody>
            </Table>
          </Row>

          <Row>
            <HomeButton baseUrl={props.baseUrl} />
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default ConnectMobile;
