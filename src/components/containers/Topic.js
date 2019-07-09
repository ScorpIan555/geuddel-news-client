import React, { Component } from 'react'
import { connect } from 'react-redux';

class Topic extends Component {
    state = {};

    render() {
        return(
            <div> Topic Component</div>
        );
    }
}

const stateToProps = {

};

const dispatchToProps = {}

export default connect(stateToProps, dispatchToProps)(Topic);