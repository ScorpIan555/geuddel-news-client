import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export default ({ props }) => {
  console.log('Sidebar.props', props);
  const sidebarTop = props.sidebarTop;
  const sidebarBottom = props.sidebarBottom;
  const handleClick = props.handleClick;

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
        {sidebarBottom.map((link, i) => {
          let topic = sidebarBottom[i].name.toLowerCase();

          return (
            <div
              key={i * Math.random() * 100000000}
              href={`/topic/${topic}`}
              className="nav-link"
            >
              <i className="material-icons mr-1">
                {props.sidebarBottom[i].icon}
              </i>

              <LinkContainer
                to={`/topic/${topic}`}
                activeClassName="active"
                name={sidebarBottom[i].nam}
                onClick={handleClick}
              >
                <a className="ml-1">{sidebarBottom[i].name}</a>
              </LinkContainer>
            </div>
          );
        })}
      </nav>
    </div>
  );
};
