import React from "react";
import { connect } from "react-redux";
import IndexForm from "../components/updated/IndexForm"
import { setUserDetails, setSessionId, setEndpoint, setBaseUrl } from "../store.js";
const constants = require("../utils/consts.js")

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ reduxStore, req }) {
   
    if (typeof window === "undefined") {
      reduxStore.dispatch(setBaseUrl(req.basePath));
      return {
        basePath: req.basePath
      };
    } else {
        // console.log("QWERQ@#$Q@#$ " + req.basePath)

      return {
        basePath: reduxStore.getState().baseUrl,
      };
    }
  }


  render() {
    return (
      <IndexForm
        basePath={this.props.basePath}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    basePath: state.baseUrl
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBaseUrl: (url) => {
      dispatch(setBaseUrl(url));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);


