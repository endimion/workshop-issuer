const mongoose = require("mongoose");
const constants = require("../utils/consts")
const mongoURI = constants.MONGO
  ? constants.MONGO
  : "mongodb+srv://root:root@cluster0.vtgm8.mongodb.net/KYB_CUSTODIAN?retryWrites=true&w=majority";
mongoose.connect(mongoURI).catch((error) => console.log(error));

const KYBSchema = new mongoose.Schema({
  legal_name: { type: String, default: "" },
  legal_person_identifier: { type: String, default: "" },
  jurisdiction_code: { type: String, default: "" },
  business_role: { type: String, default: "" },
  address: { type: String, default: "" },
  lei: { type: String, default: "" },
  vat_registration: { type: String, default: "" },
  birthdate: { type: String, default: "" },
  trading_status: { type: String, default: "" },
  given_name: { type: String, default: "" },
  family_name: { type: String, default: "" },
  personal_number: { type: String, default: "" },
  sub_jurisdiction: { type: String, default: "" },
});

const Kyb = mongoose.model("public_entry", KYBSchema);

module.exports = Kyb;
