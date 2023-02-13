import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import TicketInfoForm from "../components/updated/TicketInfoForm";
import CrewInfoForm from "../components/updated/CrewInfoForm";

import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { ConstructionOutlined } from "@mui/icons-material";

class TicketInfoView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.userDetails);

    this.state = {
      isNextEnabled: false,
      ticketNumber: props.userDetails["Ticket Number"],
      email: props.userDetails.email,
      phone_number: props.userDetails.msisdn,
      postal_address: undefined,
      emergency_contact_details: undefined,
      country_of_residence: undefined,
      medical_condnitions: props.userDetails.health_status,
      mobility_issues: props.userDetails.mobility_status,
      pregnency_data: props.userDetails.pregnency_status,
      open: false,
      error: null,
      isCrew: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.stringNotEmpty = this.stringNotEmpty.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    // this.handleFetchCrewMember = this.handleFetchCrewMember.bind(this);

    console.log(this.state);
  }

  //TBD change this as we do not update all these data to the DB

  async handleContinue(event) {
    event.preventDefault();
    console.log("tickectInfo.js:: handleContinue::");
    console.log(this.props.userDetails)
    let userProfileForDB = {
      name: this.props.userDetails.Name,
      surname: this.props.userDetails.Surname,
      identifier: this.props.userDetails.eID,
      gender: this.props.userDetails.Gender,
      age: this.props.userDetails.Birthdate,
      connectedPassengers: [],
      //*************************** */
      embarkation_port: this.props.userDetails.embarkation_port,
      disembarkation_port: this.props.userDetails.disembarkation_port,
      //************ */
      ticketNumber: this.state.ticketNumber,
      email: this.state.email,
      phone_number: this.state.phone_number,
      postal_address: this.state.postal_address,
      emergency_contact_details: this.state.emergency_contact_details,
      country_of_residence: this.state.country_of_residence,
      medical_condnitions: this.state.medical_condnitions,
      mobility_issues: this.state.mobility_issues,
      pregnency_data: this.state.pregnency_data,
      preferred_language: this.state.preferred_language,
      // *****************
      isCrew: this.props.userDetails.Role != "passenger",
      role: this.props.userDetails.Role,
      bracelet: this.props.userDetails.bracelet,
    };

    axios
      .post("/storeUser", {
        userDetails: userProfileForDB,
        sessionId: this.props.sessionId,
      })
      .then(async (response) => {
        // console.log(response);
        if (response.status === 200) {
          await this.setState({
            open : true,
          });
          window.location.href = `/issue_card?sessionId=${this.props.sessionId}`;
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // async handleFetchCrewMember(event) {
  //   event.preventDefault();
  //   const postData = {
  //     name: this.props.userDetails.Name,
  //     surname: this.props.userDetails.Surname,
  //     identifier: this.props.userDetails.Identifier,
  //   };

  //   console.log("wiill post data");
  //   console.log(postData);

  //   this.setState({ error: null });
  //   axios
  //     .post("/getCrewDetails", postData)
  //     .then((response) => {
  //       console.log("getCrewDetails.js:: handleFetchCrewMember::");
  //       // console.log(response.data);
  //       let fetchedUser = response.data;
  //       if (
  //         fetchedUser.name.toUpperCase() === this.props.userDetails.Name &&
  //         fetchedUser.surname.toUpperCase() === this.props.userDetails.Surname
  //       ) {
  //         let userProfileForDB = {
  //           name: this.props.userDetails.Name,
  //           surname: this.props.userDetails.Surname,
  //           identifier: this.props.userDetails.Identifier,
  //           gender: fetchedUser.gender,
  //           age: fetchedUser.age,
  //           //*************************** */
  //           isCrew: true,
  //           emergency_duty: this.state.emergency_duty,
  //           role: this.state.role,
  //           preferred_language: this.state.preferred_language,
  //           country_of_residence: this.state.country_of_residence,
  //           //************ */
  //           email: this.state.email,
  //           phone_number: this.state.phone_number,
  //           postal_address: this.state.postal_address,
  //         };
  //         console.log(userProfileForDB);
  //         axios
  //           .post("/storeUser", {
  //             userDetails: userProfileForDB,
  //             sessionId: this.props.sessionId,
  //           })
  //           .then((response) => {
  //             // console.log(response);
  //             if (response.status === 200) {
  //               window.location.href = `/issue_card?sessionId=${this.props.sessionId}`;
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       } else {
  //         this.setState({
  //           error:
  //             "Authenticated user does not match the details of the provided Ticket",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({
  //         error:
  //           "No matching Tickets found. Please, verify the provided ticket number",
  //       });
  //     });
  // }

  async handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name + " " + value);
    // setInputs(values => ({...values, [name]: value}))
    if (name === "isCrew") {
      await this.setState({
        [name]: !this.state.isCrew,
      });
    } else {
      if (name === "preferred_language") {
        if (this.state.preferred_language === undefined) {
          this.state.preferred_language = [];
        }
        await this.setState({ preferred_language: [value] });
      } else {
        await this.setState({
          [name]: value,
        });
      }
    }
    // console.log(`tick ${this.state.ticketNumber}`)
    // console.log(`email ${this.state.email}`)
    // console.log(`phone ${this.state.phone_number}`)
    // console.log(`country ${this.state.country_of_residence}`)
    // console.log(`med ${this.state.medical_condnitions}`)
    // console.log(`mob ${this.state.mobility_issues}`)
    // console.log(`preg ${this.state.pregnency_data}`)
    if (this.stringNotEmpty(this.state.ticketNumber) &&
       this.stringNotEmpty(this.state.email) &&
       this.stringNotEmpty(this.state.phone_number) &&
       this.stringNotEmpty(this.state.country_of_residence) &&
       this.stringNotEmpty(this.state.medical_condnitions) &&
       this.stringNotEmpty(this.state.mobility_issues) &&
       this.stringNotEmpty(this.state.pregnency_data)
       && this.stringNotEmpty(this.state.preferred_language)

    ){ // || this.state.isCrew) {
      this.setState({
        isNextEnabled: true,
      });
    } else {
      this.setState({
        isNextEnabled: false,
      });
    }

    if (this.state.crew) {
      this.setState({
        inputsDisabled: true,
      });
    }
  }

  stringNotEmpty(s) {
    if (s) {
      let result = s.length > 0 || s ==="";
      // console.log(`not empty ${s}:: ${result}`);

      return result;
    }
    return false;
  }

  render() {
    let errorMessage = this.state.error ? (
      <Alert severity="error">{this.state.error}</Alert>
    ) : (
      ""
    );

    if (this.state.isCrew) {
      return (
        <CrewInfoForm
          handleChange={this.handleChange}
          isNextEnabled={this.state.isNextEnabled}
          // handleClick={this.handleFetchCrewMember}
          sessionId={this.props.sessionId}
          errorMessage={errorMessage}
          inputsDisabled={this.state.inputsDisabled}
          medical_condnitions={this.state.medical_condnitions}
          checked={this.state.isCrew}
        />
      );
    } else {
      return (
        <TicketInfoForm
          handleChange={this.handleChange}
          isNextEnabled={this.state.isNextEnabled}
          handleClick={this.handleContinue}
          sessionId={this.props.sessionId}
          errorMessage={errorMessage}
          inputsDisabled={this.state.inputsDisabled}
          medical_condnitions={this.state.medical_condnitions}
          userDetails={this.props.userDetails}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    test: "Test",
    userDetails: state.userStoreDetails, //these were added to the redux store by verify-user.js
    sessionId: state.sessionId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(TicketInfoView);
