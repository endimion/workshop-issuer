import React from "react";
import { connect } from "react-redux";
// import VerifyUserComp from "components/updated/VerifyUserComp.js";
import VerifyEmail from "../components/updated/VerifyEmailComp.js";
import { setSessionId, setEndpoint, setBaseUrl } from "../store.js";
import { v4 as uuidv4 } from "uuid";
const constants = require("../utils/consts.js");

class ValidateEmailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps({ reduxStore, req }) {
    //returned value here is getting mered with the mapstatetoprops
    let sessionId = req?req.sessionId:uuidv4();
    if (typeof window === "undefined") {
      reduxStore.dispatch(setSessionId(req.sessionId));
      reduxStore.dispatch(setBaseUrl(req.basePath));
      // mapstatetoprops overrides these values if they match
      return {
        basePath: req.basePath,
      };
    } else {
      if (sessionId) reduxStore.dispatch(setSessionId(sessionId));
      if (req && req.basePath) reduxStore.dispatch(setBaseUrl(req.basePath));

      return {
        sessionId: reduxStore.getState().sessionId,
        endpoint: reduxStore.getState().endpoint,
        basePath: reduxStore.getState().baseUrl,
      };
    }
  }

  render() {
    return (
      <VerifyEmail
        sessionId={this.props.sessionId}
        basePath={this.props.basePath}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    //these were added to the redux store by verify-user.js
    sessionId: state.sessionId,
    endpoint: state.endpoint,
    basePath: state.baseUrl,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEndPoint: (endpont) => {
      dispatch(setEndpoint(endpoint));
    },
    setBaseUrl: (url) => {
      dispatch(setBaseUrl(url));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ValidateEmailView);
