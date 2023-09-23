import React from "react";
import {withRouter, useRouter} from "next/router";

import {
    setSessionData,
    makeGatacaIssueOffer,
    addSetToSelection,
    setStepperSteps,
    setEndpoint,
    setBaseUrl,
    setServerSessionId,
    completeDIDAuth,
    setSessionId,
    setServerPort,
    setCredentialToIssueType,
    vcSentToUser,
} from "../store";
import {connect} from "react-redux";

import isMobile from "../utils/isMobile";
import Head from "next/head";
import LayoutNew from "../components/updated/LayoutNew";
import WebsocketComp from "../components/updated/WebSocketComp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

class IssueServiceCard extends React.Component {
    constructor(props) {
        super(props);
        this.onIssueFinished = this.onIssueFinished.bind(this);

        const router = this.props.router;
        const {sessionId} = router.query;
        this.sessionId = sessionId;
        this.dispatch = props.dispatch;
        this.isFetching = props.isFetching;
        this.sessionData = props.sessionData;
        this.googlePlayImg = props.basePath ? `/${props.basePath}/play-store.png` : process.env.BASE_PATH
            ? `/${process.env.BASE_PATH}/play-store.png`
            : "/play-store.png";
        this.appStoreImg = props.basePath ? `/${props.basePath}/app-store.png` : process.env.BASE_PATH
            ? `/${process.env.BASE_PATH}/app-store.png`
            : "/app-store.png";
        this.gatacaImg = props.basePath ? `/${props.basePath}/gataca.png` : process.env.BASE_PATH
            ? `/${process.env.BASE_PATH}/gataca.png`
            : "/gataca.png";
        this.checkSolidImg = props.basePath ? `/${props.basePath}/check-solid.svg` : process.env.BASE_PATH
            ? `/${process.env.BASE_PATH}/check-solid.svg`
            : "/check-solid.svg";
    }

    static async getInitialProps({reduxStore, req, query}) {
        let userData;
        let DIDOk;
        let
            credentialToIssueType = req.credentialToIssueType;

        let sessionId = req ? req.query.sessionId : query.sessionId;
        if (typeof window === "undefined") {
            userData = req.userData;

            reduxStore.dispatch(setEndpoint(req.endpoint));
            let baseUrl = req.baseUrl ? `/${req.baseUrl}/` : "";
            reduxStore.dispatch(setBaseUrl(baseUrl));
            reduxStore.dispatch(setServerSessionId(req.sessionId));
            reduxStore.dispatch(setSessionId(req.sessionId));
            DIDOk = req.DID;
            reduxStore.dispatch(setBaseUrl(req.basePath));
            reduxStore.dispatch(setServerPort(req.port));
            // reduxStore.dispatch(setCredentialToIssueType(credentialToIssueType));
        }

        //this way the userSessionData gets set in all settings
        if (userData) {
            reduxStore.dispatch(setSessionData(userData));
        }
        if (credentialToIssueType) {
            reduxStore.dispatch(setCredentialToIssueType(credentialToIssueType));
        }

        if (sessionId) {
            // console.log(`settting sessionId to ${sessionId}`)
            reduxStore.dispatch(setSessionId(sessionId));
            reduxStore.dispatch(setBaseUrl(req.basePath));
            reduxStore.dispatch(setServerPort(req.port));
        }

        //returned value here is getting mered with the mapstatetoprops
        // mapstatetoprops overrides these values if they match
        return {
            sessionData: userData,
            credentialToIssueType: reduxStore.getState().credentialToIssue,
            qrData: reduxStore.getState().qrData,
            gatacaSesssion: reduxStore.getState().gatacaSession,
            vcSent: false,
            sessionId: reduxStore.getState().sessionId,
            endpoint: reduxStore.getState().endpoint,
            basePath: reduxStore.getState().baseUrl,
            serverPort: reduxStore.getState().serverPort,
        };
    }

    componentDidMount() {
        //sessionId, baseUrl, endpoint, vcType, credentialType, userData,isMobile
        this.props.getGatacaIssueData(
            this.props.sessionId,
            this.props.baseUrl,
            this.props.endpoint,
            this.props.credentialToIssueType,
            this.props.sessionData,
            "eidas",
            isMobile()
        );
    }

    onIssueFinished() {
        this.props.vcSentToUser();
    }

    render() {
        let gatacaQRData = this.props.gatacaQR;
        let loaderURL = this.props.baseUrl
            ? this.props.baseUrl + "/loader2.gif"
            : "loader2.gif";

        let mainDiv = <div className='content-wrapper'></div>;

        if (this.props.vcSent)
            mainDiv = (
                <Box align="center">
                    <div className='success-icon-wrapper'>
                        <img className='success-icon' src={this.checkSolidImg} style={{maxWidth: "5rem"}}/>
                    </div>
                    <h2> Credentials Issued! </h2>
                    <div>
                        The Credential you requested has been issued. You will receive a
                        notification in your wallet shortly.
                    </div>
                </Box>
            );

        if (!this.props.vcSent)
            mainDiv = this.props.isFetching ? (
                <Typography sx={{mt: 6, mb: 4}} align="center">
                    Your Credential is being generated, please wait....
                    <Box fontWeight="fontWeightBold" display="inline">
                        <img
                            alt=""
                            src={loaderURL}
                            style={{
                                maxWidth: "15rem",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        />
                    </Box>
                </Typography>
            ) : (
                <div>
                    <h2> Scan with the GATACA Wallet app </h2>
                    <div className="inner-content qr-content">
                        <img
                            className="img-fluid"
                            style={{
                                display: "block",
                                maxHeight: "21rem",
                            }}
                            src={gatacaQRData}
                        />

                        <div className="step-wrapper">
                            <div>
                                Don't have a Wallet yet? Follow the next steps:
                            </div>
                            <div className="step-list">
                                <div className="step-list-item">
                                    <div className="step-list-item-number-wrapper">
                                        <div className="step-list-item-number">1</div>
                                    </div>
                                    <div className="step-list-item-text"> Download the GATACA Wallet app.{" "}
                                        <a href="https://play.google.com/store/apps/details?id=com.gataca.identity">
                                            Play
                                        </a>{" "}
                                        or{" "}
                                        <a href="https://apps.apple.com/us/app/gataca/id1498607616">
                                            App
                                        </a>{" "}
                                        store
                                        <div style={{display: 'flex', marginTop: '1em'}}>
                                            <a href="https://gataca.io/">
                                                <img src={this.gatacaImg}
                                                     style={{maxWidth: '6rem', marginRight: '1rem'}}/>
                                            </a>
                                            <a href="https://play.google.com/store/apps/details?id=com.gataca.identity">
                                                <img src={this.googlePlayImg}
                                                     style={{maxWidth: '5.8rem', marginRight: '1rem'}}/>
                                            </a>
                                            <a href="https://apps.apple.com/us/app/gataca/id1498607616">
                                                <img src={this.appStoreImg} style={{maxWidth: '5rem'}}/>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div className="step-list-item">
                                    <div className="step-list-item-number-wrapper">
                                        <div className="step-list-item-number">2</div>
                                    </div>
                                    <div className="step-list-item-text"> With the GATACA Wallet, scan the QR code on
                                        the left
                                        to accept the Credential on your mobile device.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <WebsocketComp
                            sessionId={this.props.gatacaSession}
                            onIssueFinished={this.onIssueFinished}
                            userData={this.props.sessionData}
                            issueTemplate={this.props.credentialToIssueType}
                        />
                    </div>
                </div>
            );

        return (
            <LayoutNew
                home
                activeStep={3}
                accountName={
                    this.props.sessionData.name
                        ? this.props.sessionData.name[0]
                        : this.props.sessionData.profile.given_name[0]
                }
                basePath={this.props.basePath}
                name={
                    this.props.sessionData.name
                        ? this.props.sessionData.name
                        : this.props.sessionData.profile.given_name
                }
                surname={
                    this.props.sessionData.surname
                        ? this.props.sessionData.surname
                        : this.props.sessionData.profile.family_name
                }
            >
                <Head>
                    <title>ERUA Issuer</title>
                </Head>

                <div className="content-wrapper">
                    {mainDiv}
                </div>

                {}
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
        serverPort: state.serverPort,
        credentialToIssueType: state.credentialToIssue,
        gatacaQR: state.gatacaQR,
        gatacaSession: state.gatacaSession,
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

        getGatacaIssueData: (
            sessionId,
            baseUrl,
            endpoint,
            vcType,
            userData,
            isMobile
        ) => {
            console.log("issue_card.js");
            console.log(vcType);
            dispatch(
                makeGatacaIssueOffer(
                    sessionId,
                    baseUrl,
                    endpoint,
                    vcType,
                    userData,
                    isMobile
                )
            );
        },

        didAuthOK: (uuid) => {
            dispatch(completeDIDAuth(uuid));
        },
        setBaseUrl: (url) => {
            dispatch(setBaseUrl(url));
        },
        setServerPort: (port) => {
            dispatch(setServerPort(port));
        },

        vcSentToUser: () => {
            dispatch(vcSentToUser());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(IssueServiceCard));
