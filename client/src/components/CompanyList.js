import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import CompanyForm from './CompanyForm';
import companyService from '../services/companyService';
import AuthContext from '../context/AuthContext';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const { isAdmin, authTokens } = useContext(AuthContext);

  useEffect(() => {
    fetchCompanies();
  }, [searchTerm]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await companyService.getCompanies(searchTerm);
      setCompanies(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddCompany = () => {
    setCurrentCompany(null);
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
    setCurrentCompany(company);
    setShowModal(true);
  };

  const handleDeleteCompany = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyService.deleteCompany(id, authTokens.token);
        fetchCompanies();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = async (companyData) => {
    try {
      if (currentCompany) {
        await companyService.updateCompany(currentCompany._id, companyData, authTokens.token);
      } else {
        await companyService.addCompany(companyData, authTokens.token);
      }
      setShowModal(false);
      fetchCompanies();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Top Bangladeshi Companies</h2>
      
      {isAdmin && (
        <Button variant="primary" onClick={handleAddCompany} className="mb-3">
          Add New Company
        </Button>
      )}

      <CompanyForm
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSubmit}
        company={currentCompany}
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Headquarter</th>
            <th>Founded</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td>
                <img
                  src={company.logo}
                  alt={company.name}
                  style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                />
              </td>
              <td>{company.name}</td>
              <td>{company.sector}</td>
              <td>{company.headquarter}</td>
              <td>{company.founded}</td>
              {isAdmin && (
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEditCompany(company)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCompany(company._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyList;