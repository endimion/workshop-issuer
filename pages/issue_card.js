import React from "react";
import axios from "axios";
import {
  setSessionData,
  makeOnlyConnectionRequest,
  addSetToSelection,
  setStepperSteps,
  setEndpoint,
  setBaseUrl,
  setServerSessionId,
  completeDIDAuth,
  setEidasUriPort,
  setEidasRedirectUri,
  setSessionId,
} from "../store";
import { vcTypes } from "../config/vcTypes";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import MyStepper from "../components/Stepper";
import HomeButton from "../components/HomeButton";
import IssueVCButton from "../components/IssueVCButton";
import PairOrCard from "../components/updated/PairOrCard";
import ConnectMobile from "../components/ConnectMobile";
import isMobile from "../utils/isMobile";
import Head from "next/head";
import LayoutNew from "../components/updated/LayoutNew";
import ProceedIssuePrompt from "../components/ProceedIssuePrompt";

class IssueServiceCard extends React.Component {
  constructor(props) {
    super(props);
    this.onConnected= this.onConnected.bind(this);

    this.dispatch = props.dispatch;
    this.isFetching = props.isFetching;
    this.sessionData = props.sessionData;
    this.hasRequiredAttributes =
      props.sessionData !== null && props.sessionData !== undefined;
  }

  static async getInitialProps({ reduxStore, req }) {
    let userData;
    let DIDOk;
    let  sessionId = req.sessionId;
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
      />
    );
    return (
      <LayoutNew home activeStep={3}>
        <Head>
          <title>Grids VC Issuer</title>
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
    makeConnectionRequest: (sessionId, baseUrl, vcType, isMobile) => {
      dispatch(makeOnlyConnectionRequest(sessionId, baseUrl, vcType, isMobile));
    },
    didAuthOK: (uuid) => {
      dispatch(completeDIDAuth(uuid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueServiceCard);
