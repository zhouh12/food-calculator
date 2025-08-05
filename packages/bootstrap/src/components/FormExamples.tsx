import React, { useState } from 'react'
import { Row, Col, Form, Button, InputGroup, FormControl, Card, Alert } from 'react-bootstrap'

const FormExamples: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
    country: '',
    message: '',
    newsletter: false,
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
    setValidated(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <>
      {showSuccess && (
        <Alert variant="success" className="mb-4">
          Form submitted successfully! Data: {JSON.stringify(formData, null, 2)}
        </Alert>
      )}

      <Row>
        {/* Basic Form */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <Card.Title>Basic Form</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters long.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    name="remember"
                    label="Remember me"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Advanced Form */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <Card.Title>Advanced Form Elements</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Select name="country" value={formData.country} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="de">Germany</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>File input</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    name="newsletter"
                    id="custom-switch"
                    label="Subscribe to newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Range</Form.Label>
                  <Form.Range />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Input Groups */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Input Groups</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>@</InputGroup.Text>
                    <FormControl placeholder="Username" />
                  </InputGroup>
                </Col>

                <Col md={6} className="mb-3">
                  <InputGroup>
                    <FormControl placeholder="Recipient's username" />
                    <InputGroup.Text>@example.com</InputGroup.Text>
                  </InputGroup>
                </Col>

                <Col md={6} className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl placeholder="0.00" />
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup>
                </Col>

                <Col md={6} className="mb-3">
                  <InputGroup>
                    <FormControl placeholder="Search" />
                    <Button variant="outline-secondary" id="button-addon2">
                      Search
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Floating Labels */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Floating Labels</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Floating>
                    <Form.Control id="floatingInput" type="email" placeholder="name@example.com" />
                    <Form.Label htmlFor="floatingInput">Email address</Form.Label>
                  </Form.Floating>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Floating>
                    <Form.Control id="floatingPassword" type="password" placeholder="Password" />
                    <Form.Label htmlFor="floatingPassword">Password</Form.Label>
                  </Form.Floating>
                </Col>

                <Col md={12}>
                  <Form.Floating>
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '100px' }}
                      id="floatingTextarea"
                    />
                    <Form.Label htmlFor="floatingTextarea">Comments</Form.Label>
                  </Form.Floating>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default FormExamples
