import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import TicketInfoForm from "../components/updated/TicketInfoForm";
import CrewInfoForm from "../components/updated/CrewInfoForm";

import Alert from "@mui/material/Alert";

class TicketInfoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNextEnabled: false,
      ticketNumber: null,
      email: "",
      phone_number: "",
      postal_address: "",
      emergency_contact_details: "",
      country_of_residence: undefined,
      medical_condnitions: undefined,
      mobility_issues: undefined,
      pregnency_data: undefined,

      error: null,
      isCrew: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.stringNotEmpty = this.stringNotEmpty.bind(this);
    this.handleFetchTicket = this.handleFetchTicket.bind(this);
    this.handleFetchCrewMember = this.handleFetchCrewMember.bind(this);
  }

  async handleFetchTicket(event) {
    event.preventDefault();
    const postData = {
      ticktetNumber: this.state.ticketNumber,
      sessionId: this.props.sessionId,
    };
    // this.setState({ error: null });
    axios
      .post("/getTicketInfo", postData)
      .then((response) => {
        console.log("tickectInfo.js:: handleFetchTicket::");
        console.log(response.data);
        let fetchedUser = response.data;
        if (
          fetchedUser.name.toUpperCase() === this.props.userDetails.Name &&
          fetchedUser.surname.toUpperCase() === this.props.userDetails.Surname
        ) {
          let userProfileForDB = {
            name: this.props.userDetails.Name,
            surname: this.props.userDetails.Surname,
            identifier: this.props.userDetails.Identifier,
            gender: fetchedUser.gender,
            age: fetchedUser.age,
            connectedPassengers: fetchedUser.connectedPassengers,
            //*************************** */
            embarkation_port: fetchedUser.embarkation_port,
            disembarkation_port: fetchedUser.disembarkation_port,
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
            isCrew: fetchedUser.isCrew,
            role: fetchedUser.role,
          };

          axios
            .post("/storeUser", {
              userDetails: userProfileForDB,
              sessionId: this.props.sessionId,
            })
            .then((response) => {
              // console.log(response);
              if (response.status === 200) {
                window.location.href = `/issue_card?sessionId=${this.props.sessionId}`;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.setState({
            error:
              "Authenticated user does not match the details of the provided Ticket",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error:
            "No matching Tickets found. Please, verify the provided ticket number",
        });
      });
  }

  async handleFetchCrewMember(event) {
    event.preventDefault();
    const postData = {
      name: this.props.userDetails.Name,
      surname: this.props.userDetails.Surname,
      identifier: this.props.userDetails.Identifier,
    };

    console.log("wiill post data")
    console.log(postData)

    this.setState({ error: null });
    axios
      .post("/getCrewDetails", postData)
      .then((response) => {
        console.log("getCrewDetails.js:: handleFetchCrewMember::");
        // console.log(response.data);
        let fetchedUser = response.data;
        if (
          fetchedUser.name.toUpperCase() === this.props.userDetails.Name &&
          fetchedUser.surname.toUpperCase() === this.props.userDetails.Surname
        ) {
          let userProfileForDB = {
            name: this.props.userDetails.Name,
            surname: this.props.userDetails.Surname,
            identifier: this.props.userDetails.Identifier,
            gender: fetchedUser.gender,
            age: fetchedUser.age,
            //*************************** */
            isCrew: true,
            emergency_duty: this.state.emergency_duty,
            role: this.state.role,
            preferred_language: this.state.preferred_language,
            country_of_residence: this.state.country_of_residence,
            //************ */
            email: this.state.email,
            phone_number: this.state.phone_number,
            postal_address: this.state.postal_address,
          };
          console.log(userProfileForDB)
          axios
            .post("/storeUser", {
              userDetails: userProfileForDB,
              sessionId: this.props.sessionId,
            })
            .then((response) => {
              // console.log(response);
              if (response.status === 200) {
                window.location.href = `/issue_card?sessionId=${this.props.sessionId}`;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.setState({
            error:
              "Authenticated user does not match the details of the provided Ticket",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error:
            "No matching Tickets found. Please, verify the provided ticket number",
        });
      });
  }

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

    if (this.stringNotEmpty(this.state.ticketNumber) || this.state.isCrew) {
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
      let result = s.length > 0;
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
          handleClick={this.handleFetchCrewMember}
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
          handleClick={this.handleFetchTicket}
          sessionId={this.props.sessionId}
          errorMessage={errorMessage}
          inputsDisabled={this.state.inputsDisabled}
          medical_condnitions={this.state.medical_condnitions}
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
