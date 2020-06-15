import React, { Component } from 'react';
import './Test.css';

import Footer from '../common/Footer'
import './ionicons.min.css';
import './flaticon.css';


import { Link } from 'react-router-dom';

class Test extends Component {
    render() {
        return (
            <div class="wrap">
                <div class="hero-wrap img">
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row d-md-flex no-gutters slider-text align-items-center justify-content-center">
                            <div class="col-md-10 d-flex align-items-center ftco-animate">
                                <div class="text text-center pt-5 mt-md-5">
                                    <p class="mb-4">OPEN API</p>
                                    <h1 class="mb-5">공공데이터를 더욱 쉽게 가공하세요</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="ftco-section ftco-no-pt ftco-no-pb">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="category-wrap">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <Link to="/Detailspublicdata">
                                                <div class="top-category text-center">
                                                    <h3>공공데이터 포털</h3>
                                                    <span class="icon flaticon-accounting"></span>
                                                    <p><span class="number">1051</span> <span>Open position</span></p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div class="col-md-4">
                                            <Link to="/Detailseouldata">
                                                <div class="top-category text-center">
                                                    <h3>서울 열린데이터 광장</h3>
                                                    <span class="icon flaticon-visitor"></span>
                                                    <p><span class="number">818</span> <span>Open position</span></p>
                                                </div>
                                            </Link>
                                        </div>
                                        <div class="col-md-4">
                                            <Link to="/Detailggdata">
                                                <div class="top-category text-center">
                                                    <h3>경기데이터드림</h3>
                                                    <span class="icon flaticon-worldwide"></span>
                                                    <p><span class="number">516</span> <span>Open position</span></p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        );
    }
}

export default Test;