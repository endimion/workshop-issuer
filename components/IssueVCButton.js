import { Button } from "react-bootstrap";
import React from "react";
import { connect } from "react-redux";
import { requestVC } from "../store";
import isMobile from "../utils/isMobile";
import IssueVCButtonUI from "../components/CustomButtons/IssueVCButton"

class IssueVCButton extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.session = props.session;
    this.hasRequiredAttributes = props.hasRequiredAttributes;
    this.vcIssuanceEndpoint = props.vcIssuanceEndpoint;
    this.vcType= props.vcType
    this.click = this.click.bind(this);
  }

  componentDidMount() {}

  click() {
    const vcType = this.props.vcType;
    // console.log("issueVCButton:: click called with " + this.props.uuid)
    // let url = this.props.baseUrl
    //   ? `${this.props.baseUrl}/issueVC`
    //   : `/issueVC`;
    let url = "issueVC"
    console.log(
      `will send request for ${url} with  type ${vcType} isMobile ${isMobile()}`
    );
    this.props.requestVC(`${url}`, vcType, this.props.uuid, isMobile());
  }

  render() {
    return (
      <IssueVCButtonUI
        variant="primary"
        disabled={!this.props.hasRequiredAttributes}
        onClick={this.click}
        color="primary" size="lg" 
      />
       
      // </Link>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.sessionStatus
  };
}

const mapDispatchToProps = dispatch => {
  return {
    requestVC: (url,vcType, uuid, isMobile) => {
      dispatch(requestVC(url, vcType, uuid, isMobile));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueVCButton);
