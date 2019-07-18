import React from 'react';
import { Button } from 'react-bootstrap';
// import { Button, Glyphicon } from "react-bootstrap";

export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => {
  console.log('LoaderButton.props', props);

  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading}

      {!isLoading ? text : loadingText}
    </Button>
  );
};
