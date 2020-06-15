import React, { Component } from 'react';
import './Search.css'
import SearchDetail from './SearchDetail'
import axios from 'axios';
import Pagination from "react-js-pagination";
import Footer from '../common/Footer'
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articlesDetails: [],
            activePage: 1,
            totalPages: null,
            itemsCountPerPage: null,
            totalItemsCount: null,
            keyword: ''
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.fetchURL = this.fetchURL.bind(this);
    }

    fetchURL(page) {

        axios.get(`http://localhost:8013/seouldatadb/articles?page=${page}&size=10`)
            .then(response => {

                const totalPages = response.data.totalPages;
                const itemsCountPerPage = response.data.size;
                const totalItemsCount = response.data.totalElements;

                this.setState({ totalPages: totalPages })
                this.setState({ totalItemsCount: totalItemsCount })
                this.setState({ itemsCountPerPage: itemsCountPerPage })

                const results = response.data.content;

                const updatedResults = results.map(results => {

                    var timestamp = new Date(results.pubDate)
                    var dateString = timestamp.toGMTString()
                    return {
                        ...results, dateString
                    }
                });

                this.setState({ articlesDetails: updatedResults });
                console.log(updatedResults);
                console.log(this.state.activePage);
                console.log(this.state.itemsCountPerPage);

            }
            );
    }

    componentDidMount() {
        this.fetchURL(this.state.activePage)
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber })
        this.fetchURL(pageNumber)

    }
    onInputChange = (e) => { // 2. input 태그의 값이 변경 될 때마다 this.state.keyword 값이 변경
        this.setState({
            keyword: e.target.value
        });
    }
    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (articlesDetails) => {
                    return articlesDetails.category.toLowerCase()
                        .indexOf(this.state.keyword.toLowerCase()) > -1;
                }
            );
            return data.map(
                (articlesDetails, i) => {
                    return (<SearchDetail articlesDetails={articlesDetails} key={i} />);
                }
            );
        }
        return (
            <div className="wrap">
                <div class="hero-wrap-detail img">
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row d-md-flex no-gutters slider-text align-items-center justify-content-center">
                            <div class="col-md-10 d-flex align-items-center ftco-animate">
                                <div class="text text-center pt-5 mt-md-5">
                                    <p class="mb-4">HOME > SEARCH</p>
                                    <h1 class="mb-5">DATA SEARCH</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <form action="#" class="subscribe-form">
                        <div class="form-group d-flex">
                            <input type="text" class="form-control" name="keyword"
                                placeholder="Search" aria-label="Search"
                                value={this.state.keyword}
                                onChange={this.onInputChange} />
                            <input type="submit" value="SEARCH" class="submit px-3 "></input>
                        </div>
                    </form>
                    {mapToComponents(this.state.articlesDetails)}
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        hideNavigation
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={10}
                        itemClass='page-item'
                        linkClass='btn btn-light'
                        onChange={this.handlePageChange}
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Search;