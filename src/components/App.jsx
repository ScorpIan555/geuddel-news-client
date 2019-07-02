import React, { Component } from "react";;
// import { connect } from "react-redux";

class App extends Component {
    render() {
        return(
            <div>
            
            
            <div className="navbar-container">
                <div className="bg-dark navbar-dark" data-sticky="top">
                    <div className="container">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand" href="index.html">
                        <img alt="Wingman" src="assets/img/logo-white.svg" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="icon-menu h4"></i>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <a href="index.html" className="nav-link">Overview</a>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown">Pages</a>
                            <div className="dropdown-menu" aria-labelledby="pagesDropdown">

                                <a className="dropdown-item" href="pages-landing.html">
                                <span className="h6 mb-0">Landing Pages</span>
                                <p className="text-small text-muted">Showcase your product in style</p>
                                </a>

                                <div className="dropdown-divider"></div>

                                <a className="dropdown-item" href="pages-app.html">
                                <span className="h6 mb-0">App Pages</span>
                                <p className="text-small text-muted">Build detailed, functional web apps</p>
                                </a>

                                <div className="dropdown-divider"></div>

                                <a className="dropdown-item" href="pages-inner.html">
                                <span className="h6 mb-0">Inner Pages</span>
                                <p className="text-small text-muted">Complete your online presence</p>
                                </a>

                            </div>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="componentsDropdown" role="button" data-toggle="dropdown">Components</a>
                            <div className="dropdown-menu" aria-labelledby="componentsDropdown">

                                <a className="dropdown-item" href="components-bootstrap.html">Bootstrap</a>

                                <a className="dropdown-item" href="components-wingman.html">Wingman</a>

                            </div>
                            </li>
                        </ul>
                        <form className="form-inline col p-0 pl-md-2 pr-md-3">
                            <input className="form-control w-100" type="search" placeholder="Search" aria-label="Search" />
                        </form>

                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle dropdown-toggle-no-arrow p-lg-0" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img alt="Image" src="assets/img/avatar-male-3.jpg" className="avatar avatar-xs" />
                                <span className="badge badge-danger">8</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="#">Notifications <span className="badge badge-danger">8</span></a>
                                <a className="dropdown-item" href="#">Profile</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Settings</a>
                                <a className="dropdown-item" href="#">Groups</a>
                                <a className="dropdown-item" href="#">Log out</a>
                            </div>
                            </li>
                        </ul>

                        </div>
                        
                    </nav>
                    </div>
                    
                </div>
                </div>


                <div className="main-container">
                <section className="bg-dark space-sm">
                    <div className="main-carousel" data-flickity='{ "cellAlign": "center", "contain": true, "prevNextButtons": false, "pageDots":false, "wrapAround":true, "autoPlay":5000, "imagesLoaded":true }'>

                    <div className="carousel-cell col-9 col-md-8 col-lg-5 text-center">
                        <a href="#" className="d-block mb-3">
                        <img alt="Image" src="assets/img/graphic-product-bench.jpg" className="img-fluid rounded" />
                        </a>
                        <span className="h6">Bench - Accounting for creative people</span>
                    </div>

                    <div className="carousel-cell col-9 col-md-8 col-lg-5 text-center">
                        <a href="#" className="d-block mb-3">
                        <img alt="Image" src="assets/img/graphic-product-kin.jpg" className="img-fluid rounded" />
                        </a>
                        <span className="h6">Kin - The digital fashion assistant</span>
                    </div>

                    <div className="carousel-cell col-9 col-md-8 col-lg-5 text-center">
                        <a href="#" className="d-block mb-3">
                        <img alt="Image" src="assets/img/graphic-product-paydar.jpg" className="img-fluid rounded" />
                        </a>
                        <span className="h6">Paydar - Location based touch payments</span>
                    </div>

                    <div className="carousel-cell col-9 col-md-8 col-lg-5 text-center">
                        <a href="#" className="d-block mb-3">
                        <img alt="Image" src="assets/img/graphic-product-pitstop.jpg" className="img-fluid rounded" />
                        </a>
                        <span className="h6">Pitstop - Browser-based project management</span>
                    </div>

                    </div>
                </section>
                <section>
                    <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-auto mb-5">
                        <form className="mb-4">
                            <input className="form-control" placeholder="Search" type="text" name="search-table" />
                        </form>
                        <nav className="nav flex-md-column">
                            <a href="#" className="nav-link active">All</a>
                            <a href="#" className="nav-link">Health &amp; Fitness</a>
                            <a href="#" className="nav-link">Lifestyle</a>
                            <a href="#" className="nav-link">Music</a>
                            <a href="#" className="nav-link">Technology</a>
                            <a href="#" className="nav-link">Productivity</a>
                            <a href="#" className="nav-link">Shopping</a>
                        </nav>
                        </div>
                        
                        <div className="col">
                        <div className="card card-sm">
                            <div className="card-header d-flex bg-secondary justify-content-between align-items-center">
                            <div>
                                <h6>Featured Products</h6>
                            </div>
                            <form className="d-flex align-items-center">
                                <span className="mr-2 text-muted text-small text-nowrap">Sort by:</span>
                                <select className="custom-select">
                                <option value="alpha">Alphabetical</option>
                                <option value="old-new" selected>Newest</option>
                                <option value="new-old">Popular</option>
                                <option value="recent">Recently Updated</option>
                                </select>
                            </form>
                            </div>
                            <ul className="list-group list-group-flush">

                            <li className="list-group-item">
                                <div className="media align-items-center">
                                <a href="#" className="mr-4">
                                    <img alt="Image" src="assets/img/graphic-product-sidekick-thumb.jpg" className="rounded avatar avatar-lg" />
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
                                        <button className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="SidekickButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-dots-three-horizontal"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="SidekickButton">
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Share</a>
                                        <a className="dropdown-item" href="#">Comment</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Report</a>
                                        </div>
                                    </div>
                                    </div>
                                    <a className="badge badge-secondary badge-pill mb-2" href="#">Health &amp; Fitness</a>
                                    <div className="text-small">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="icon-heart"></i> 221</li>
                                        <li className="list-inline-item"><i className="icon-message"></i> 14</li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="media align-items-center">
                                <a href="#" className="mr-4">
                                    <img alt="Image" src="assets/img/graphic-product-pitstop-thumb.jpg" className="rounded avatar avatar-lg" />
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
                                        <button className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="PitstopButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-dots-three-horizontal"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="PitstopButton">
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Share</a>
                                        <a className="dropdown-item" href="#">Comment</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Report</a>
                                        </div>
                                    </div>
                                    </div>
                                    <a className="badge badge-secondary badge-pill mb-2" href="#">Productivity</a>
                                    <div className="text-small">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="icon-heart"></i> 90</li>
                                        <li className="list-inline-item"><i className="icon-message"></i> 34</li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="media align-items-center">
                                <a href="#" className="mr-4">
                                    <img alt="Image" src="assets/img/graphic-product-pipeline-thumb.jpg" className="rounded avatar avatar-lg" />
                                </a>
                                <div className="media-body">
                                    <div className="d-flex justify-content-between mb-2">
                                    <div>
                                        <a href="#" className="mb-1">
                                        <h4>pipeline.js</h4>
                                        </a>
                                        <span>Snappy UI interaction library with flexible API</span>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="pipeline.jsButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-dots-three-horizontal"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="pipeline.jsButton">
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Share</a>
                                        <a className="dropdown-item" href="#">Comment</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Report</a>
                                        </div>
                                    </div>
                                    </div>
                                    <a className="badge badge-secondary badge-pill mb-2" href="#">Development</a>
                                    <div className="text-small">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="icon-heart"></i> 84</li>
                                        <li className="list-inline-item"><i className="icon-message"></i> 25</li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="media align-items-center">
                                <a href="#" className="mr-4">
                                    <img alt="Image" src="assets/img/graphic-product-paydar-thumb.jpg" className="rounded avatar avatar-lg" />
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
                                        <button className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="PaydarButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-dots-three-horizontal"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="PaydarButton">
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Share</a>
                                        <a className="dropdown-item" href="#">Comment</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Report</a>
                                        </div>
                                    </div>
                                    </div>
                                    <a className="badge badge-secondary badge-pill mb-2" href="#">Productivity</a>
                                    <div className="text-small">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="icon-heart"></i> 253</li>
                                        <li className="list-inline-item"><i className="icon-message"></i> 19</li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="media align-items-center">
                                <a href="#" className="mr-4">
                                    <img alt="Image" src="assets/img/graphic-product-kin-thumb.jpg" className="rounded avatar avatar-lg" />
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
                                        <button className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="KinButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-dots-three-horizontal"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="KinButton">
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Share</a>
                                        <a className="dropdown-item" href="#">Comment</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Report</a>
                                        </div>
                                    </div>
                                    </div>
                                    <a className="badge badge-secondary badge-pill mb-2" href="#">Lifestyle</a>
                                    <div className="text-small">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="icon-heart"></i> 84</li>
                                        <li className="list-inline-item"><i className="icon-message"></i> 21</li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="media align-items-center">
                                <a href="#" className="mr-4">
                                    <img alt="Image" src="assets/img/graphic-product-bench-thumb.jpg" className="rounded avatar avatar-lg" />
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
                                        <button className="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="BenchButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-dots-three-horizontal"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-sm" aria-labelledby="BenchButton">
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Share</a>
                                        <a className="dropdown-item" href="#">Comment</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#">Report</a>
                                        </div>
                                    </div>
                                    </div>
                                    <a className="badge badge-secondary badge-pill mb-2" href="#">Productivity</a>
                                    <div className="text-small">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><i className="icon-heart"></i> 373</li>
                                        <li className="list-inline-item"><i className="icon-message"></i> 62</li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </li>

                            </ul>
                        </div>
                        </div>
                        
                        <div className="col-lg-3">
                        <div data-sticky="top">
                            <div className="card card-borderless bg-secondary">
                            <a className="card-body" href="#">
                                <div className="d-flex justify-content-between mb-3">
                                <img alt="Image" src="assets/img/logo-w-gradient.svg" />
                                <span className="title-decorative">Sponsor</span>
                                </div>
                                <span className="h6">A robust suite of styled elements and pages</span>
                            </a>
                            </div>
                            
                            <div className="card">
                            <div className="card-body">
                                <h6>Never miss an update ✌</h6>
                                <form>
                                <div className="form-group mb-2">
                                    <input type="email" placeholder="Email Address" name="subscribeEmail" className="form-control" />
                                    <small>No spam, we promise.</small>
                                </div>
                                <button type="submit" className="btn btn-block btn-primary">Subscribe</button>
                                </form>
                            </div>
                            </div>
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
                            <a href="#"><i className="socicon-twitter"></i></a>
                            </li>
                            <li className="list-inline-item">
                            <a href="#"><i className="socicon-facebook"></i></a>
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

export default App;