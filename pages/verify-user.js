import React from "react";
import { connect } from "react-redux";
import VerifyUserComp from "components/updated/VerifyUserComp.js";
import { setUserDetails, setSessionId, setEndpoint } from "../store.js";

class VerifyUserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: null,
      medical_condnitions: null,
      isNextEnabled: false,
      error: null,
    };
    this.handleContinue = this.handleContinue.bind(this);
  }

  static async getInitialProps({ reduxStore, req }) {
    //returned value here is getting mered with the mapstatetoprops
    let sessionId = req.sessionId;
    if (typeof window === "undefined") {
      //store the userDetails to the store to be able to fetche form other views in the future
      if (req.userDetails) {
        reduxStore.dispatch(setUserDetails(req.userDetails));
        reduxStore.dispatch(setSessionId(req.sessionId));
        reduxStore.dispatch(setEndpoint(req.endpoint));
      }
      // mapstatetoprops overrides these values if they match
      return {
        userDetails: req.userDetails,
      };
    } else {
      if (sessionId) {
        reduxStore.dispatch(setSessionId(sessionId));
      }
      return {
        sessionId: reduxStore.getState().sessionId,
        endpoint: reduxStore.getState().endpoint,
      };
    }
  }

  handleContinue(event) {
    console.log("hey");
    event.preventDefault();
    console.log(this.props.userDetails);
    window.location.href = `/issue_card?sessionId=${this.props.sessionId}`;
  }

  render() {
    return (
      <VerifyUserComp
        userDetails={this.props.userDetails}
        sessionId={this.props.sessionId}
        handleContinue={this.handleContinue}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.userStoreDetails, //these were added to the redux store by verify-user.js
    sessionId: state.sessionId,
    endpoint: state.endpoint,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEndPoint: (endpont) => {
      dispatch(setEndpoint(endpoint));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyUserView);
