import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const CompanyForm = ({ show, onHide, onSubmit, company }) => {
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    logo: 'https://via.placeholder.com/150',
    headquarter: '',
    founded: '',
    description: '',
  });
  const [error, setError] = useState(null);

  React.useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        sector: company.sector,
        logo: company.logo,
        headquarter: company.headquarter,
        founded: company.founded,
        description: company.description || '',
      });
    } else {
      setFormData({
        name: '',
        sector: '',
        logo: 'https://via.placeholder.com/150',
        headquarter: '',
        founded: '',
        description: '',
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sector || !formData.headquarter || !formData.founded) {
      setError('Please fill in all required fields');
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{company ? 'Edit Company' : 'Add New Company'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Company Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sector/Industry *</Form.Label>
            <Form.Control
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Headquarter *</Form.Label>
            <Form.Control
              type="text"
              name="headquarter"
              value={formData.headquarter}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year Founded *</Form.Label>
            <Form.Control
              type="number"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {company ? 'Update Company' : 'Add Company'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CompanyForm;