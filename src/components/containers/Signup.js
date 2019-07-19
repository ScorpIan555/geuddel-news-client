import React, { Component } from "react";
import { Form, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { LoaderButton } from "../presentation";
import style from '../../../public/theme/scss/theme.scss';
import actions from '../../actions';


 class Signup extends Component {
    // initialize state for form fields this component will control
    state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      wasError: false
    };

  componentDidMount() {
    console.log('Signup.componentDidMount() :::', this.props);
    console.log('Signup.componentDidMount() :::', this.state);
  }

 
  validateForm = () => {
    // submit button stays in disabled state until these conditions are TRUE
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm = () => {
    // submit button stays in disabled state until this condition is TRUE
    console.log('confirmationCode:::', this.state.confirmationCode);
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    // form input fields whose change is controlled by this container are handled here
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    // prevent default submit event/action
    event.preventDefault();
    // destructure state object
    let { email, password, wasError, newUser } = this.state;
    // trigger submit button's async-only state from initialization of async call until a value is returned
    this.setState({ isLoading: true });
    // async call
    try {
      // state fields controlled by this container are packaged to be passed into async function
      let user = {
        username: email,
        password
      };
      // async redux action called from here 
      await this.props.createUser(user)
              .then(res => {
                console.log('res', res)
                if(res == undefined) {
                  this.setState({
                    wasError: true
                  });
                }
              })
              .catch(err => { 
                console.log('err', err);
                this.setState({
                  wasError: true
                });
              });
      // response to async redux call flows from redux cycle into this component's props
      //  capture the new current user value to be used locally and passed into component's state to trigger rerender
      // let newUser = this.props.currentUser;
      console.log('signup.this', this);

    } catch (e) {
      console.log('error.this', this);
      console.log('e::::', e);
      // inform user of error during signup process
      alert(e);
      // this tells the component not to render the confirmation form because their was an error in the Signup process
      this.setState({
        wasError: true
      });
    }

    // 
    if(this.state.wasError === true) {
      this.setState({
        newUser: null
      })
    }// 
    if(this.state.wasError === false) {
      this.setState({
        newUser: 'new user created'
      })
    }
    console.log('signup finished:::', this);
    // with async redux action/call now complete, exit loader button's async-only state
    this.setState({ isLoading: false });
  }
  

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    // async call
    try {
      // destructure state object
      let { email, password, confirmationCode } = this.state;
      // state fields controlled by this container are packaged to be passed into async function
      let user = {
        username: email,
        confirmationCode: confirmationCode || null,
        password: password || null
      }

      await this.props.confirmUser(user);

      await this.props.signInUser(user);

      this.props.userHasAuthenticated(true);

      this.props.history.push("/");

    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm = () => {
    // deconstruct class methods
    let { handleChange, validateConfirmationForm, handleConfirmationSubmit } = this;
    // deconstruct properties from state object
    let { isLoading, confirmationCode } = this.state;

    return (
      <div className="container col-md-5">
      <Card className="" >
        <Card.Body>
          <form onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" variant="large">
              <Form.Label>Confirmation Code</Form.Label>
              <Form.Control
                autoFocus
                type="tel"
                value={confirmationCode}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">Please check your email for the code.</Form.Text>
            </Form.Group>
            <LoaderButton
              block
              className="btn-lg"
              disabled={!validateConfirmationForm()}
              type="submit"
              isLoading={isLoading}
              text="Verify"
              loadingText="Verifying…"
            />
          </form>
          </Card.Body>
        </Card>

      </div>
    );
  }

  renderForm = () => {
     // deconstruct class methods
     let { handleChange, handleSubmit, validateForm } = this;
     // deconstruct properties from state object
     let { email, password, isLoading, confirmPassword } = this.state;
    
    return (
      <div className="container col-md-5">
      <Card className={style.Aligner} >
        <Card.Body>
            <form onSubmit={handleSubmit}>
              <Form.Group controlId="email" variant="large">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
            </Form.Group>
              <Form.Group controlId="password" variant="large">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handleChange}
                  type="password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" variant="large">
                <Form.Label>Confirm A Password</Form.Label>
                <Form.Control
                  value={confirmPassword}
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
                text="Signup"
                loadingText="Signing up…"
              />
            </form>
            </Card.Body>
        </Card>

      </div>
    );
  }

  render() {
     // deconstruct class methods
     let { renderForm, renderConfirmationForm } = this;
     // deconstruct properties from state object
     let { newUser } = this.state;

    return (
      <div className="Signup">
        {newUser === null
          ? renderForm()
          : renderConfirmationForm()}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    user: state.user,
    currentUser: state.currentUser
  }
}

const dispatchToProps = (dispatch) => {
  return {
    createUser: (...params) => dispatch(actions.actionCreateUser(...params)),
    confirmUser: (...params) => dispatch(actions.actionConfirmUser(...params)),
    signInUser: (...params) => dispatch(actions.actionSignInUser(...params)),
  }
}

export default connect(stateToProps, dispatchToProps)(Signup);