import React, { useState } from 'react';
import { executeQuery } from '../services/apiHandlerService';
import './QueryMaster.css';

const QueryMaster = () => {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuery = async () => {
    try {
      setIsSubmitting(true);
      const response = await executeQuery(query);
      if (response.success) {
        alert('Query Executed Successfully!!!');
      }
    } catch (error) {
      console.error('Error executing query:', error);
      alert('Error executing query');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuery();
  };

  return (
    <div className="flex-center position-ref full-height">
      <div className="content">
        <h5 className="title">Query Master</h5>
        <form id="queryFrm" name="queryFrm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter The Query *</label>
            <textarea
              className="form-control"
              rows="10"
              id="rawQuery"
              name="rawQuery"
              placeholder="Query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
          <div className="">
            <input
              type="submit"
              className="form-control btn"
              name="btnFrm"
              id="btnFrm"
              value="Execute Statement"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QueryMaster;
