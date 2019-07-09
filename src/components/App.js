import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav } from './presentation';
import { Sidebar } from './containers';
import actions from '../actions';

class App extends Component {
    state = {};

    componentDidMount() {
        console.log('App.componentDidMount()', this);
    }

    handleClick = event => {
        console.log('Click');
        let data = {
            isItWorking: 'yes, it is working'
        };
        this.props.test(data);
    }
    
    render() {
        // desconstruct and assign class methods
        let { handleClick } = this;
        // deconstruct and assign props to be passed into the sidebar component
        let { sidebarTop, sidebarBottom } = this.props;
        // create childProps object to be passed into sidebar component
        const sidebarChildProps = {
            sidebarTop,
            sidebarBottom,
            handleClick
        };

        return (
        <div className="container">
            <Nav />
            
            <div className="main-container">
            
            <section>
                <div className="container">
                <div className="row">


                <Sidebar props={sidebarChildProps} />




                    <div className="col">
                    <div className="card card-sm">
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="media align-items-center">
                            <a href="#" className="mr-4">
                                <img
                                alt="Image"
                                src="assets/img/graphic-product-sidekick-thumb.jpg"
                                className="rounded avatar avatar-lg"
                                />
                            </a>
                            <div className="media-body">
                                <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <a href="#" className="mb-1">
                                    <h4>Sidekick</h4>
                                    </a>
                                    <span>Holistic fitness tracking</span>
                                </div>
                                <div className="dropdown">
                                    <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow"
                                    type="button"
                                    id="SidekickButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                    <i className="icon-dots-three-horizontal" />
                                    </button>
                                    <div
                                    className="dropdown-menu dropdown-menu-sm"
                                    aria-labelledby="SidekickButton"
                                    >
                                    <a className="dropdown-item" href="#">
                                        Save
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Share
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Comment
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">
                                        Report
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <a
                                className="badge badge-secondary badge-pill mb-2"
                                href="#"
                                >
                                Health &amp; Fitness
                                </a>
                                <div className="text-small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <i className="icon-heart" /> 221
                                    </li>
                                    <li className="list-inline-item">
                                    <i className="icon-message" /> 14
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="media align-items-center">
                            <a href="#" className="mr-4">
                                <img
                                alt="Image"
                                src="assets/img/graphic-product-pitstop-thumb.jpg"
                                className="rounded avatar avatar-lg"
                                />
                            </a>
                            <div className="media-body">
                                <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <a href="#" className="mb-1">
                                    <h4>Pitstop</h4>
                                    </a>
                                    <span>Browser-based project management</span>
                                </div>
                                <div className="dropdown">
                                    <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow"
                                    type="button"
                                    id="PitstopButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                    <i className="icon-dots-three-horizontal" />
                                    </button>
                                    <div
                                    className="dropdown-menu dropdown-menu-sm"
                                    aria-labelledby="PitstopButton"
                                    >
                                    <a className="dropdown-item" href="#">
                                        Save
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Share
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Comment
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">
                                        Report
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <a
                                className="badge badge-secondary badge-pill mb-2"
                                href="#"
                                >
                                Productivity
                                </a>
                                <div className="text-small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <i className="icon-heart" /> 90
                                    </li>
                                    <li className="list-inline-item">
                                    <i className="icon-message" /> 34
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="media align-items-center">
                            <a href="#" className="mr-4">
                                <img
                                alt="Image"
                                src="assets/img/graphic-product-pipeline-thumb.jpg"
                                className="rounded avatar avatar-lg"
                                />
                            </a>
                            <div className="media-body">
                                <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <a href="#" className="mb-1">
                                    <h4>pipeline.js</h4>
                                    </a>
                                    <span>
                                    Snappy UI interaction library with flexible
                                    API
                                    </span>
                                </div>
                                <div className="dropdown">
                                    <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow"
                                    type="button"
                                    id="pipeline.jsButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                    <i className="icon-dots-three-horizontal" />
                                    </button>
                                    <div
                                    className="dropdown-menu dropdown-menu-sm"
                                    aria-labelledby="pipeline.jsButton"
                                    >
                                    <a className="dropdown-item" href="#">
                                        Save
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Share
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Comment
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">
                                        Report
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <a
                                className="badge badge-secondary badge-pill mb-2"
                                href="#"
                                >
                                Development
                                </a>
                                <div className="text-small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <i className="icon-heart" /> 84
                                    </li>
                                    <li className="list-inline-item">
                                    <i className="icon-message" /> 25
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="media align-items-center">
                            <a href="#" className="mr-4">
                                <img
                                alt="Image"
                                src="assets/img/graphic-product-paydar-thumb.jpg"
                                className="rounded avatar avatar-lg"
                                />
                            </a>
                            <div className="media-body">
                                <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <a href="#" className="mb-1">
                                    <h4>Paydar</h4>
                                    </a>
                                    <span>Location based touch payments</span>
                                </div>
                                <div className="dropdown">
                                    <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow"
                                    type="button"
                                    id="PaydarButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                    <i className="icon-dots-three-horizontal" />
                                    </button>
                                    <div
                                    className="dropdown-menu dropdown-menu-sm"
                                    aria-labelledby="PaydarButton"
                                    >
                                    <a className="dropdown-item" href="#">
                                        Save
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Share
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Comment
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">
                                        Report
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <a
                                className="badge badge-secondary badge-pill mb-2"
                                href="#"
                                >
                                Productivity
                                </a>
                                <div className="text-small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <i className="icon-heart" /> 253
                                    </li>
                                    <li className="list-inline-item">
                                    <i className="icon-message" /> 19
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="media align-items-center">
                            <a href="#" className="mr-4">
                                <img
                                alt="Image"
                                src="assets/img/graphic-product-kin-thumb.jpg"
                                className="rounded avatar avatar-lg"
                                />
                            </a>
                            <div className="media-body">
                                <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <a href="#" className="mb-1">
                                    <h4>Kin</h4>
                                    </a>
                                    <span>The digital fashion assistant</span>
                                </div>
                                <div className="dropdown">
                                    <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow"
                                    type="button"
                                    id="KinButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                    <i className="icon-dots-three-horizontal" />
                                    </button>
                                    <div
                                    className="dropdown-menu dropdown-menu-sm"
                                    aria-labelledby="KinButton"
                                    >
                                    <a className="dropdown-item" href="#">
                                        Save
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Share
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Comment
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">
                                        Report
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <a
                                className="badge badge-secondary badge-pill mb-2"
                                href="#"
                                >
                                Lifestyle
                                </a>
                                <div className="text-small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <i className="icon-heart" /> 84
                                    </li>
                                    <li className="list-inline-item">
                                    <i className="icon-message" /> 21
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </li>

                        <li className="list-group-item">
                            <div className="media align-items-center">
                            <a href="#" className="mr-4">
                                <img
                                alt="Image"
                                src="assets/img/graphic-product-bench-thumb.jpg"
                                className="rounded avatar avatar-lg"
                                />
                            </a>
                            <div className="media-body">
                                <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <a href="#" className="mb-1">
                                    <h4>Bench</h4>
                                    </a>
                                    <span>Accounting for creative people</span>
                                </div>
                                <div className="dropdown">
                                    <button
                                    className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow"
                                    type="button"
                                    id="BenchButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    >
                                    <i className="icon-dots-three-horizontal" />
                                    </button>
                                    <div
                                    className="dropdown-menu dropdown-menu-sm"
                                    aria-labelledby="BenchButton"
                                    >
                                    <a className="dropdown-item" href="#">
                                        Save
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Share
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Comment
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">
                                        Report
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <a
                                className="badge badge-secondary badge-pill mb-2"
                                href="#"
                                >
                                Productivity
                                </a>
                                <div className="text-small">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <i className="icon-heart" /> 373
                                    </li>
                                    <li className="list-inline-item">
                                    <i className="icon-message" /> 62
                                    </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            <footer className="footer-short">
                <div className="container">
                <hr />
                <nav className="row justify-content-between align-items-center">
                    <div className="col-auto">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                        <a href="#">
                            <img alt="Image" src="assets/img/logo-gray.svg" />
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">Overview</a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">Documentation</a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">Changelog</a>
                        </li>
                    </ul>
                    </div>

                    <div className="col-auto text-sm-right">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                        <a href="#">
                            <i className="socicon-twitter" />
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">
                            <i className="socicon-facebook" />
                        </a>
                        </li>
                    </ul>
                    </div>
                </nav>

                <div className="row">
                    <div className="col">
                    <small>&copy; 2019 Medium Rare All Rights Reserved</small>
                    </div>
                </div>
                </div>
            </footer>
            </div>
        </div>
        );
    }
}

const stateToProps = state => {
  const { topLink, bottomLink } = state.sidebar;

  return {
    sidebarTop: topLink,
    sidebarBottom: bottomLink
  };
};

const dispatchToProps = dispatch => {
  return {
    test: (data) => dispatch(actions.actionTest(data))
  };
};

export default connect(stateToProps, dispatchToProps)(App);
