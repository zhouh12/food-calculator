import React from 'react'
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Badge,
  ProgressBar,
  Breadcrumb,
  ListGroup,
  Table,
  Accordion,
} from 'react-bootstrap'

const ComponentShowcase: React.FC = () => {
  return (
    <>
      {/* Buttons Section */}
      <Row className="mb-4">
        <Col>
          <h5>Buttons & Button Groups</h5>
          <div className="mb-3">
            <Button variant="primary" className="me-2">
              Primary
            </Button>
            <Button variant="secondary" className="me-2">
              Secondary
            </Button>
            <Button variant="success" className="me-2">
              Success
            </Button>
            <Button variant="warning" className="me-2">
              Warning
            </Button>
            <Button variant="danger" className="me-2">
              Danger
            </Button>
            <Button variant="info" className="me-2">
              Info
            </Button>
            <Button variant="light" className="me-2">
              Light
            </Button>
            <Button variant="dark">Dark</Button>
          </div>

          <ButtonGroup className="me-3" role="group" aria-label="Button group">
            <Button variant="outline-primary">Left</Button>
            <Button variant="outline-primary">Middle</Button>
            <Button variant="outline-primary">Right</Button>
          </ButtonGroup>

          <DropdownButton id="dropdown-basic-button" title="Dropdown Button" variant="success">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

      {/* Badges & Progress */}
      <Row className="mb-4">
        <Col md={6}>
          <h5>Badges</h5>
          <div className="mb-3">
            <h6>
              Example heading <Badge bg="secondary">New</Badge>
            </h6>
            <p>
              Notifications <Badge bg="primary">4</Badge> | Messages <Badge bg="success">2</Badge> |{' '}
              Alerts <Badge bg="danger">!</Badge>
            </p>
            <Badge bg="primary" pill>
              Primary
            </Badge>{' '}
            <Badge bg="secondary" pill>
              Secondary
            </Badge>{' '}
            <Badge bg="success" pill>
              Success
            </Badge>{' '}
            <Badge bg="warning" pill>
              Warning
            </Badge>
          </div>
        </Col>

        <Col md={6}>
          <h5>Progress Bars</h5>
          <div className="mb-3">
            <ProgressBar now={60} />
            <ProgressBar variant="success" now={40} className="mt-2" />
            <ProgressBar striped variant="warning" now={75} className="mt-2" />
            <ProgressBar animated now={45} className="mt-2" />
          </div>
        </Col>
      </Row>

      {/* Navigation */}
      <Row className="mb-4">
        <Col>
          <h5>Breadcrumb Navigation</h5>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
            <Breadcrumb.Item active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* List Group */}
      <Row className="mb-4">
        <Col md={6}>
          <h5>List Group</h5>
          <ListGroup>
            <ListGroup.Item active>Active item</ListGroup.Item>
            <ListGroup.Item>Second item</ListGroup.Item>
            <ListGroup.Item>Third item</ListGroup.Item>
            <ListGroup.Item disabled>Disabled item</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={6}>
          <h5>List Group with Badges</h5>
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Inbox
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Sent
              <Badge bg="secondary" pill>
                2
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              Trash
              <Badge bg="danger" pill>
                1
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      {/* Table */}
      <Row className="mb-4">
        <Col>
          <h5>Responsive Table</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Badge bg="success">Active</Badge>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>
                  <Badge bg="warning">Pending</Badge>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>Bird</td>
                <td>@twitter</td>
                <td>
                  <Badge bg="danger">Inactive</Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Accordion */}
      <Row className="mb-4">
        <Col>
          <h5>Accordion</h5>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Accordion Item #3</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </>
  )
}

export default ComponentShowcase
