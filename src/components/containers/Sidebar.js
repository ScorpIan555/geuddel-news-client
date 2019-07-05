import React from 'react';

export default props => {
  return (
    <div className="col-12 col-md-auto mb-5">
      <form className="mb-4">
        <input
          className="form-control"
          placeholder="Search"
          type="text"
          name="search-table"
        />
      </form>
      <nav className="nav flex-md-column">
        <a href="#" className="nav-link active">
          All
        </a>
        <a href="#" className="nav-link">
          Health &amp; Fitness
        </a>
        <a href="#" className="nav-link">
          Lifestyle
        </a>
        <a href="#" className="nav-link">
          Music
        </a>
        <a href="#" className="nav-link">
          Technology
        </a>
        <a href="#" className="nav-link">
          Productivity
        </a>
        <a href="#" className="nav-link">
          Shopping
        </a>
      </nav>
    </div>
  );
};
