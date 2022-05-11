import React from "react";
import { connect } from "react-redux";
import PairDeviceComp from "components/updated/PairDeviceComp.js";
import SSE from "../components/Sse.js";
import { setUserDetails, setSessionId, setEndpoint } from "../store.js";
import axios from "axios";
import { makeUnsigedJWT } from "../services/jwtService.js";

class PairDeviceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: null,
      deviceAdded: false,
    };
    this.deviceAdded = this.deviceAdded.bind(this);
  }

  static async getInitialProps({ reduxStore, req }) {
    //returned value here is getting mered with the mapstatetoprops

    if (typeof window === "undefined") {
      if (req.userDetails) {
        reduxStore.dispatch(setUserDetails(req.userDetails));
        reduxStore.dispatch(setSessionId(req.sessionId));
        reduxStore.dispatch(setEndpoint(req.session.endpoint));
      }
      // mapstatetoprops overrides these values if they match
      return {
        userDetails: req.userDetails,
      };
    }
    return {
      sessionId: reduxStore.getState().sessionId,
      endpoint: reduxStore.getState().endpoint,
    };
  }

  async deviceAdded() {
    console.log("device added called!!");
    await this.setState({ deviceAdded: true });
  }

  componentDidMount() {
    if (!this.state.qr) {
      let postData = {
        invitation: {
          sessionId: this.props.sessionId,
          userId: this.props.userDetails.eID,
          endpoint: this.props.endpoint + "/add-device",
        },
      };

      axios.post(`/generate-qr`, postData).then(async (response) => {
        // console.log("the response form the QR code generation is")
        // console.log(response.data )
        await this.setState({ qr: response.data });
      });
    }
  }

  render() {
    let sseEndpoint = this.props.baseUrl
      ? `${this.props.baseurl}/${this.props.endpoint}`
      : this.props.endpoint;

    let jwt = makeUnsigedJWT({
      sessionId: this.props.sessionId,
      userId: this.props.userDetails.eID,
      endpoint: this.props.endpoint + "/add-device",
    });
    console.log("the jwt is " + jwt)
    return (
      <>
        <PairDeviceComp
          userDetails={this.props.userDetails}
          sessionId={this.props.sessionId}
          qr={this.state.qr}
          completed={this.state.deviceAdded}
          invite={jwt}
        />
        <SSE
          uuid={this.props.sessionId}
          endpoint={sseEndpoint}
          serverSessionId={this.props.sessionId}
          sealSession={this.props.sessionId}
          deviceAdded={this.deviceAdded}
        />
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(PairDeviceView);
