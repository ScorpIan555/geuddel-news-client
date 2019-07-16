import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';


class Login extends Component {
    state = {
        isLoading: false,
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: '',
        newUser: null
    };

    handleChange = event => {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        // destructure and assgin from state object
        let { email, password } = this.state;

        this.setState({ isLoading: true });

        try {
            let user = {
                username: email,
                password: password
            }
            // make redux call
            await this.props.createUser(user);
            let newUser = this.props.user.currentUser;
            this.setState({ newUser });

        } catch (error) {
            console.log('error', error);
            alert(error);
        }
        this.setState({ isLoading: false });
    }


    render() {
        let { handleChange, handleSubmit} = this;
        let { email, password } = this.state;

        return (
            <div className="Login">
                <div className="container col-md-5">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div id="email" className="form-group" variant="large">
                                <div className="form-label">Email</div>
                                <div className="form-control"
                                    type="email"
                                     value={email}
                                     onChange={handleChange}
                                 />
                            </div>
                            <div id="password" className="form-group" variant="large">
                                <div className="form-label">Password</div>
                                <div className="form-control"
                                    type="password"
                                     value={password}
                                     onChange={handleChange}
                                 />
                            </div>
                            <button className="btn-lg" type="submit" text="Log In" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}



const stateToProps = (state) => {
    return {
  
    }
}

const dispatchToProps = (dispatch) => {
    return {
        createUser: (...params) => dispatch(actions.actionCreateUser(...params)),
        confirmUser: (...params) => dispatch(actions.actionConfirmUser(...params)),
        signInUser: (...params) => dispatch(actions.actionSignInUser(...params))
    }
}

export default connect(stateToProps, dispatchToProps)(Login);