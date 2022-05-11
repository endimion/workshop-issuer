const getTicketData = async (ticketNumber) => {
  console.log(
    "ticketService.js:: looking for ticketNumber:---" + ticketNumber + "---"
  );
  if (
    ticketNumber === "123" ||
    ticketNumber === "XXX" ||
    ticketNumber === "3907025311697"
  ) {
    return {
      code: 200,
      name: "claude",
      surname: "Phil",
      gender: "Male",
      age: "1965-01-01",
      connectedPassengers: [
        {
          name: "Nikos",
          surname: "Triantafyllou",
          gender: "'Male'",
          age: "2007-05-10",
        },
        {
          name: "Katerina",
          surname: "'Ksystra'",
          gender: "'Female'",
          age: "2005-09-11'",
        },
      ],
      isCrew: "false",
      role: "passenger",
      embarkation_port: "pireaus",
      disembarkation_port: "chios",
    };
  }
  if (ticketNumber === "1111" || ticketNumber === "YYY") {
    return {
      code: 200,
      name: "claude",
      surname: "Phil",
      gender: "Male",
      age: "1965-01-02",
      connectedPassengers: null,
      isCrew: "true",
      role: "Captain",
      embarkation_port: "pireaus",
      disembarkation_port: "pireaus",
    };
  }
  return {
    code: 404,
    message: "no such ticket found",
  };
};

const getCrewMemberDetails = async (name, surname, identifier) => {
  //returns true if the user is indeed a crew member
  if (name.toLowerCase() === "claude") {
    return {
      code: 200,
      name: "claude",
      surname: "Phil",
      gender: "Male",
      age: "1965-01-02",
      isCrew: "true",
      role: "Captain",
    };
  }
  return {
    code: 404,
    message: "no such ticket found",
  };
};

export { getTicketData, getCrewMemberDetails };
