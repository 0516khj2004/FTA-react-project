/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer class="ftco-footer ftco-bg-dark ftco-section">
        <div class="container">
          <div class="row mb-5">
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">이용약관</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="pb-1 d-block">개인정보처리방침</a></li>
                  <li><a href="#" class="pb-1 d-block">분쟁조정신청</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4">
                <h2 class="ftco-heading-2">데이터포털 소개</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="pb-1 d-block">Data Search</a></li>
                  <li><a href="#" class="pb-1 d-block">open API</a></li>
                  <li><a href="#" class="pb-1 d-block">Data Store</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md">
              <div class="ftco-footer-widget mb-4 ml-md-4">
                <h2 class="ftco-heading-2">개인정보분야별책임자</h2>
                <ul class="list-unstyled">
                  <li><a href="#" class="pb-1 d-block"></a></li>
                </ul>
              </div>
            </div>
            {/* <div class="row">
            <div class="col-md-12 text-center">
              <p>대구광역시 동구 첨단로 53 (41068) 한국정보화진흥원     대표자 : 채윤병</p>
              <p>사업자등록번호 : 135-82-04900  대표번호 : 1566-0025</p>
              <p>문의시간 : 09:00~18:00 (월~금)   팩스 : 053-230-1929</p>
            </div>
          </div> */}
          </div>
          
        </div>
      </footer>

    );
  }
}

export default Footer;
