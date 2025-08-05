import React, { useState } from 'react'
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Button,
  Alert,
  Card,
  Badge,
  Spinner,
} from 'react-bootstrap'
import ComponentShowcase from './components/ComponentShowcase'
import FormExamples from './components/FormExamples'
import ModalExample from './components/ModalExample'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <>
      {/* Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">React Bootstrap Demo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#components">Components</Nav.Link>
              <Nav.Link href="#forms">Forms</Nav.Link>
              <Nav.Link href="#layout">Layout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* Header */}
        <Row className="mb-5">
          <Col>
            <h1 className="display-4 text-center mb-3">
              React Bootstrap Demo
              <Badge bg="secondary" className="ms-2">
                v18
              </Badge>
            </h1>
            <p className="lead text-center">
              A comprehensive showcase of React Bootstrap components built with React 18, Vite 6,
              and Bootstrap 5
            </p>
          </Col>
        </Row>

        {/* Alert Example */}
        {showAlert && (
          <Alert variant="info" dismissible onClose={() => setShowAlert(false)} className="mb-4">
            <Alert.Heading>Welcome to React Bootstrap!</Alert.Heading>
            <p>
              This is a dismissible alert demonstrating React Bootstrap's Alert component. It
              integrates seamlessly with React's state management.
            </p>
          </Alert>
        )}

        {/* Quick Actions */}
        <Row className="mb-5">
          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Quick Start</Card.Title>
                <Card.Text>
                  Explore pre-built Bootstrap components ready for React applications.
                </Card.Text>
                <Button variant="primary">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Documentation</Card.Title>
                <Card.Text>
                  Learn how to integrate React Bootstrap components into your projects.
                </Card.Text>
                <Button variant="outline-secondary">View Docs</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Component Showcase */}
        <div className="demo-section">
          <h3>Component Showcase</h3>
          <ComponentShowcase />
        </div>

        {/* Form Examples */}
        <div className="demo-section">
          <h3>Form Examples</h3>
          <FormExamples />
        </div>

        {/* Modal Example */}
        <div className="demo-section">
          <h3>Modal Example</h3>
          <ModalExample />
        </div>

        {/* Footer */}
        <footer className="mt-5 pt-4 border-top">
          <Row>
            <Col md={6}>
              <p className="text-muted">Built with React 18, Vite 6, and React Bootstrap</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="text-muted">© 2024 React Bootstrap Demo</p>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  )
}

export default App
