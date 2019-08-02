import React, { Component, Fragment } from "react";
import { Form, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { LoaderButton } from "../presentation";
import style from '../../../public/theme/scss/theme.scss';
import actions from '../../actions';

class Settings extends Component {
    // initialize state for form fields this component will control
    state = {
        isLoading: false,
        email: "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
        country: "",
        language: "",
        category: "",
    };

    async componentDidMount() {

        try {
            await this.props.getCurrentUserDbInfo
        } catch (error) {
            console.logl(error);
        }
    }

    handleChange = event => {
        // form input fields whose change is controlled by this container are handled here
        console.log('eventtargetvalue:::', event.target.id)
        console.log('eventtargetvalue:::', event.target.value)
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    handleSubmit = async event => {
        event.preventDefault();

        console.log('event:::', event);
        console.log('event.target:::', event.target);
        console.log('event.target.id:::', event.target.id);
        console.log('event.currentTarget:::', event.currentTarget);
        console.log('event.type:::', event.type);

        if(event.target.id === 'userSettings') {
            await this.props.updateUserData();
        }
        if(event.target.id === 'changePassword') {
            let currentUser = this.props.currentUser;
            let { oldPassword, confirmPassword } = this.state;
            let changePasswordRequest = {
                currentUser,
                oldPassword,
                confirmPassword
            }
            await this.props.changeUserPassword(changePasswordRequest);
        }

    }

    validateChangeSettingsForm = () => {
        // submit button stays in disabled state until these conditions are TRUE
        return (
          this.state.email.length > 0
        //   this.state.password.length > 0 &&
        //   this.state.password === this.state.confirmPassword
        );
      }

    validateChangePasswordForm = () => {
        // submit button stays in disabled state until these conditions are TRUE
        return (
        //   this.state.email.length > 0 && 
        //   this.state.password.length > 0 &&
          this.state.password === this.state.confirmPassword
        );
      }


    render() {
    // deconstruct class methods
     let { handleChange, handleSubmit, validateChangeSettingsForm, validateChangePasswordForm } = this;
     // deconstruct properties from state object
     let { email, password, oldPassword, country, language, category, isLoading, confirmPassword } = this.state;

     let { currentUser } = this.props;
    
    return (
      <div className="container col-md-5">
        <Card className={style.Aligner} >
            <Card.Body>
                <form onSubmit={handleSubmit} id="userSettings">
                
                <Form.Group controlId="country" variant="large">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    value={country}
                    onChange={handleChange}
                    type="country"
                    />
                </Form.Group>
                <Form.Group controlId="language" variant="large">
                    <Form.Label>Preferred Language</Form.Label>
                    <Form.Control
                    value={language}
                    onChange={handleChange}
                    type="language"
                    />
                </Form.Group>
                <Form.Group controlId="category" variant="large">
                    <Form.Label>Favorite Category</Form.Label>
                    <Form.Control
                    value={category}
                    onChange={handleChange}
                    type="category"
                    />
                </Form.Group>
                <LoaderButton
                    block
                    className="btn-lg"
                    disabled={!validateChangeSettingsForm()}
                    type="submit"
                    isLoading={isLoading}
                    text="Update Info"
                    loadingText="Updating up…"
                />
                </form>
                </Card.Body>
            </Card>
        <Card className={style.Aligner} >
            <Card.Body>
                <form onSubmit={handleSubmit} id="changePassword">
               
                <Form.Group controlId="oldPassword" variant="large">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                    value={oldPassword}
                    onChange={handleChange}
                    type="password"
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
                    disabled={!validateChangePasswordForm()}
                    type="submit"
                    isLoading={isLoading}
                    text="Change Password"
                    loadingText="Submitting new password..."
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
    const userLocation = state.userLocation;
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
      changeUserPassword: (data) => dispatch(actions.actionChangeUserPassword(data)),
      updateUserData: (data) => dispatch(actions.actionsUpdateUserDbData(data))
    };
  };

export default connect(stateToProps, dispatchToProps)(Settings);