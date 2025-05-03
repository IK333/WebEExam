import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search by company name or sector..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default SearchBox;