import React, { useState } from 'react'
import { Button, Modal, Row, Col, Card, Form, Alert } from 'react-bootstrap'

const ModalExample: React.FC = () => {
  const [showBasic, setShowBasic] = useState(false)
  const [showLarge, setShowLarge] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleFormSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData)
    setShowForm(false)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <Row>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Basic Modal</Card.Title>
              <Card.Text>Simple modal with header, body, and footer.</Card.Text>
              <Button variant="primary" onClick={() => setShowBasic(true)} className="mt-auto">
                Launch Modal
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Large Modal</Card.Title>
              <Card.Text>Modal with custom size and scrollable content.</Card.Text>
              <Button variant="success" onClick={() => setShowLarge(true)} className="mt-auto">
                Large Modal
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Form Modal</Card.Title>
              <Card.Text>Modal containing a form with validation.</Card.Text>
              <Button variant="info" onClick={() => setShowForm(true)} className="mt-auto">
                Form Modal
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Confirm Modal</Card.Title>
              <Card.Text>Confirmation dialog with custom styling.</Card.Text>
              <Button variant="warning" onClick={() => setShowConfirm(true)} className="mt-auto">
                Confirm Action
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Basic Modal */}
      <Modal show={showBasic} onHide={() => setShowBasic(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Basic Modal Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is a basic modal example using React Bootstrap. You can include any content here,
            including text, images, forms, or other components.
          </p>
          <Alert variant="info">
            <strong>Pro tip:</strong> Modals are great for displaying important information without
            navigating away from the current page.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBasic(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowBasic(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Large Modal */}
      <Modal show={showLarge} onHide={() => setShowLarge(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Large Modal with Scrollable Content</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <h5>Scrollable Content</h5>
          <p>
            This is a large modal with scrollable content. When the content is too long, the modal
            body becomes scrollable while keeping the header and footer fixed.
          </p>

          {/* Generate some content to make it scrollable */}
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mb-3">
              <h6>Section {i + 1}</h6>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLarge(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Form Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton className="bg-warning text-dark">
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <i
                className="bi bi-exclamation-triangle-fill text-warning"
                style={{ fontSize: '3rem' }}
              ></i>
            </div>
            <h5>Are you sure?</h5>
            <p className="text-muted">
              This action cannot be undone. Please confirm that you want to proceed.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="outline-secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              console.log('Action confirmed!')
              setShowConfirm(false)
            }}
          >
            Confirm Action
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalExample
