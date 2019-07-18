import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { LoaderButton } from "../presentation";
import actions from '../../actions';
import style from '../../../public/theme/scss/theme.scss';

class Login extends Component {
    state = {
      isLoading: false,
      email: "",
      password: ""
    };

  validateForm = () => {
    console.log('validateForm - this.state:::', this.state);
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    // form input fields are components controlled by this container
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      // destructure state object
      let { email, password } = this.state;
      // create data object to fit AWS Auth module specs (username & password)
      let user = {
        username: email,
        password
      };
      await this.props.signInUser(user);

    
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');

    } catch (e) {

      alert(e.message);

      this.setState({ isLoading: false });
    }
  }


  render() {
    // deconstruct class methods
    let { handleChange, handleSubmit, validateForm } = this;
    // deconstruct properties from state object
    let { email, password, isLoading } = this.state;

    return (
      <div className="container col-md-5">
        <Card className={style.Aligner} >
          <Card.Body>
            <form onSubmit={handleSubmit}>
            <Form.Group controlId="email" variant="large">
              <Form.Label className="label login-form-label">Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password" variant="large">
              <Form.Label className="label login-form-label">Password</Form.Label>
              <Form.Control
                value={password}
                onChange={handleChange}
                type="password"
              />
            </Form.Group>
            <LoaderButton
              block
              className="btn-lg"
              disabled={!validateForm()}
              type="submit"
              isLoading={isLoading}
              text="Login"
              loadingText="Loggin in…"
            >
              Login
            </LoaderButton>
          </form>
          </Card.Body>
        </Card>

      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    // user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {

    signInUser: (...params) => dispatch(actions.actionSignInUser(...params))
  }
}

export default connect(stateToProps, dispatchToProps)(Login)