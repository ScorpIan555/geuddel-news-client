import React, { Component, Fragment } from 'react';
import { Form, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LoaderButton } from '../presentation';
import style from '../../../public/theme/scss/theme.scss';
import actions from '../../actions';

class Settings extends Component {
  // initialize state for form fields this component will control
  state = {
    isLoading: false,
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    language: '',
    category: ''
  };

  async componentDidMount() {
    try {
      await this.props.getCurrentUserDbInfo;
    } catch (error) {
      console.logl(error);
    }
  }

  handleChange = event => {
    // form input fields whose change is controlled by this container are handled here
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    console.log('event:::', event);
    console.log('event.target:::', event.target);
    console.log('event.target.id:::', event.target.id);
    console.log('event.currentTarget:::', event.currentTarget);
    console.log('event.type:::', event.type);
  };

  validateForm = () => {
    // submit button stays in disabled state until these conditions are TRUE
    return (
      this.state.email.length > 0
      //   this.state.password.length > 0 &&
      //   this.state.password === this.state.confirmPassword
    );
  };

  render() {
    // deconstruct class methods
    let { handleChange, handleSubmit, validateForm } = this;
    // deconstruct properties from state object
    let { email, password, isLoading, confirmPassword } = this.state;

    return (
      <div className="container col-md-5">
        <Card className={style.Aligner}>
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
}

const stateToProps = state => {
  const { topLink, bottomLink } = state.sidebar;
  const { currentUser } = state.auth;
  const userLocation = state.userData;
  const { newsapiResponse, articles } = state.newsfeed;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink,
    currentUser: currentUser,
    userLocation: userLocation,
    newsapiResponse: newsapiResponse,
    articles: articles
  };
};

const dispatchToProps = dispatch => {
  return {
    getCurrentUserDbInfo: () => dispatch(actions.actionGetCurrentUserDbInfo()),
    changeUserPassword: password =>
      dispatch(actions.actionsChangeUserPassword(password)),
    forgotUserPassword: req => dispatch(actions.actionsForgetUserPassword(req))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Settings);
