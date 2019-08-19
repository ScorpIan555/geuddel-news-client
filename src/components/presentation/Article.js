import React, { Fragment } from 'react';
import { FormatUnixTimestamp } from '../../utils';

export default props => {
  // console.log('Article.props:::', props);
  // console.log('Article.props:::', typeof(props));
  // console.log('Article.props.url:::', props.url);
  // console.log('Article.props.description:::', props.description);
  // console.log('Article.props.urlToImage:::', props.urlToImage);
  // console.log('Article.props.title:::', props.title);
  // console.log('Article.props.title:::', props.source);

  // Convert UNIX Datetime object into UI-friendly format
  // Capture inputs for Date/Time formatting calls
  const unixTimeStamp = props.publishedAt;
  const userLocation = props.userLocation || 'us';
  // Call Date/Time formatting utility functions, based on user's location
  const formattedDate = FormatUnixTimestamp.getUIFormattedDate(
    unixTimeStamp,
    userLocation
  );
  const formattedTime = FormatUnixTimestamp.getUIFormattedTime(unixTimeStamp);
  // Create an object which shows the date and time published, based on user's location
  const published = formattedTime + formattedDate;

  return (
    <Fragment>
      <li className="list-group-item">
        <div className="media align-items-center">
          <a href={props.url} target="_blank" className="mr-4">
            <img
              alt="Image"
              src={props.urlToImage}
              className="rounded avatar avatar-lg"
            />
          </a>
          <div className="media-body">
            <div className="d-flex justify-content-between mb-2">
              <div>
                <a href={props.url} className="mb-1" target="_blank">
                  <h4>{props.title}</h4>
                </a>
                <span>{props.description}</span>
              </div>
            </div>

            <div className="media blog-post-author">
              <div className="media-body">
                <div>
                  <a className="badge badge-secondary badge-pill mb-2" href="#">
                    {props.source}
                  </a>
                </div>
                <small>{props.author}</small>
                <small>{published} </small>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

const localStyles = {
  avatar: {
    borderRadius: '0px',
    width: '0rem',
    height: '5rem'
  }
};
