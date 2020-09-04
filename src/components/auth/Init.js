import React, { Component } from "react";
import { Carousel } from "antd";
import page1 from "../../assets/images/page1.jpg";
import page2 from "../../assets/images/page2.jpg";
import page3 from "../../assets/images/page3.jpg";
import { Link } from "react-router-dom";

class Init extends Component {
  render() {
    const contentStyle = {
      height: "500px",
      width: "1000px",
      margin: "0 auto",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79",
    };

    return (
      <div>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <Link to="/register" onClick={this.props.afterInit}>
                <img style={contentStyle} src={page1} />
              </Link>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Link to="/register" onClick={this.props.afterInit}>
                <img style={contentStyle} src={page2} />
              </Link>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <Link
                to="/register"
                onClick={() => {
                  this.props.afterInit();
                  this.props.switchToNGO();
                }}
              >
                <img style={contentStyle} src={page3} />
              </Link>
            </h3>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Init;
