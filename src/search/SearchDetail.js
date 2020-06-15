import React, { Component } from 'react';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class SearchDetail extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-md-12 ftco-animate">
                    {/* {apilistinfo && apilistinfo.map((table, index) => ( */}
                    <div className="job-post-item p-4 d-block d-lg-flex align-items-center" >
                        <div className="one-third mb-4 mb-md-0">
                            <div className="job-post-item-header align-items-center">
                                <span className="subadge">{this.props.articlesDetails.location}</span>
                                <h2 className="mr-3 text-black">{this.props.articlesDetails.category}</h2>
                            </div>
                            <div className="job-post-item-body d-block d-md-flex">
                                <div className="mr-3">{this.props.articlesDetails.info}</div>
                            </div>
                            <div class="job-post-item-body-detail d-block d-md-flex">
                                <FontAwesomeIcon  icon={faPencilAlt} size="1x"/>&nbsp;
                                <div><span> 수정일: {this.props.articlesDetails.modifyInfo}&nbsp;&nbsp;&nbsp;</span></div>
                                <FontAwesomeIcon icon={faUserTie} size="1x"/>&nbsp;
                                <div><span> 제공부서: {this.props.articlesDetails.providerdepInfo}</span></div>
                            </div>
                            <div class="one-forth ml-auto d-flex align-items-center mt-4 md-md-0">
                                <a href={`${this.props.articlesDetails.url}`} target='_blank' class="btn btn-primary py-3">다운로드</a>
                            </div>
                        </div>
                    </div>
                    {/* ))} */}
                </div>
            </div>
        );
    }
}

export default SearchDetail;