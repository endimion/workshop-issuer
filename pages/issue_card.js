import React from "react";
import { withRouter, useRouter } from 'next/router';

import {
  setSessionData,
  makeOnlyConnectionRequest,
  addSetToSelection,
  setStepperSteps,
  setEndpoint,
  setBaseUrl,
  setServerSessionId,
  completeDIDAuth,
  setSessionId,
} from "../store";
import { vcTypes } from "../config/vcTypes";
import { connect } from "react-redux";
import PairOrCard from "../components/updated/PairOrCard";
import isMobile from "../utils/isMobile";
import Head from "next/head";
import LayoutNew from "../components/updated/LayoutNew";
import ProceedIssuePrompt from "../components/ProceedIssuePrompt";

class IssueServiceCard extends React.Component {
  constructor(props) {
    super(props);
    this.onConnected= this.onConnected.bind(this);

    const router = this.props.router;
    const { sessionId } = router.query;
    this.sessionId = sessionId;
    this.dispatch = props.dispatch;
    this.isFetching = props.isFetching;
    this.sessionData = props.sessionData;
    this.hasRequiredAttributes =
      props.sessionData !== null && props.sessionData !== undefined;
  }

  static async getInitialProps({ reduxStore, req, query }) {
    let userData;
    let DIDOk;
    let  sessionId = req? req.query.sessionId:query.sessionId
    if (typeof window === "undefined") {
      userData = req.userData;
      reduxStore.dispatch(setEndpoint(req.endpoint));
      let baseUrl = req.baseUrl ? `/${req.baseUrl}/` : "";
      reduxStore.dispatch(setBaseUrl(baseUrl));
      reduxStore.dispatch(setServerSessionId(req.sessionId));
      reduxStore.dispatch(setSessionId(req.sessionId));
      DIDOk = req.DID;
    }

    //this way the userSessionData gets set in all settings
    if (userData) {
      reduxStore.dispatch(setSessionData(userData));
    }
    if (DIDOk) {
      reduxStore.dispatch(completeDIDAuth(sessionId));
    }
    if (sessionId) {
      // console.log(`settting sessionId to ${sessionId}`)
      reduxStore.dispatch(setSessionId(sessionId));
    }

    //returned value here is getting mered with the mapstatetoprops
    // mapstatetoprops overrides these values if they match
    return {
      sessionData: userData,
      qrData: reduxStore.getState().qrData,
      vcSent: false,
      sessionId: reduxStore.getState().sessionId,
      endpoint: reduxStore.getState().endpoint
    };
  }

  componentDidMount() {
    if (!this.props.DID) {
      //if DID auth has not been completed
      this.props.makeConnectionRequest(
        this.props.sessionId,
        this.props.baseUrl,
        this.props.endpoint,
        "eidas",
        isMobile()
      );
    }
  }

  onConnected(){
    console.log("wallet Connected!!")
  }

  render() {
 
    let promptCard = (
      <ProceedIssuePrompt
        hasRequiredAttributes={this.hasRequiredAttributes}
        baseUrl={this.props.baseUrl}
        uuid={this.props.sessionId}
        vcType={vcTypes.kyb}
      />
    );

    let result = (
      <PairOrCard
        qrData={this.props.qrData}
        DID={this.props.DID}
        baseUrl={this.props.baseUrl}
        uuid={this.props.uuid}
        serverSessionId={this.props.serverSessionId}
        card={promptCard}
        vcSent={this.props.vcSent}
        sealSession={this.props.sessionId}
        credQROffer={this.props.credQROffer}
        onConnected={this.onConnected}
        isMobile= {isMobile()}
      />
    );
    return (
      <LayoutNew home activeStep={3}>
        <Head>
          <title>PALAEMON Registration Service</title>
        </Head>
        {result}
      </LayoutNew>
    );
  }
}
function mapStateToProps(state) {
  return {
    isFetching: state.fetching,
    qrData: state.qrData,
    sessionData: state.sessionData,
    userSelection: state.userSelection, // the attributes selected by the user to be included in a VC,
    baseUrl: state.baseUrl,
    DID: state.DID,
    serverSessionId: state.serverSessionId,
    uuid: state.uuid,
    vcSent: state.vcSent,
    sessionId: state.sessionId,
    endpoint: state.endpoint,
    credQROffer: state.credQROffer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEidasToSelection: (set) => {
      dispatch(addSetToSelection(set));
    },
    setSteps: (steps) => {
      dispatch(setStepperSteps(steps));
    },
    setEndPoint: (endpont) => {
      dispatch(setEndpoint(endpoint));
    },

/*
 this.props.makeConnectionRequest(
        this.props.sessionId,
        this.props.baseUrl,
        this.props.endpoint,
        "eidas",
        isMobile()
      );
*/

    makeConnectionRequest: (sessionId, baseUrl, endpoint, vcType, isMobile) => {
      dispatch(makeOnlyConnectionRequest(sessionId, baseUrl,endpoint, vcType, isMobile));
    },
    didAuthOK: (uuid) => {
      dispatch(completeDIDAuth(uuid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IssueServiceCard));
