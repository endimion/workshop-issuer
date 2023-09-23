import * as React from "react";
import LayoutNew from "./LayoutNew";
//AppBar
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
//Stepper
import Button from "@mui/material/Button";
import Link from "next/link";

//Card

//Forms

//Icons

//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
// List

const VerifyEmail = ({sessionId, basePath}) => {
    console.log("VerifyEmailCom basepath " + basePath)


    let [email, setEmail] = React.useState(null);
    let [isSending, setIsSending] = React.useState(false);
    let [otpSent, setOTPSent] = React.useState(false);
    let [otp, setOTP] = React.useState("");
    let [errorMsg, setErrorMsg] = React.useState(null);
    let [userDetails, setUserDetails] = React.useState(null);
    let [optValidationRes, setOTPValidationRes] = React.useState(true);
    let [optPrompt, setOptPrompt] = React.useState(
        "Please, type the One Time Password sent to your email"
    );
    let [emailPrompt, setEmailPrompt] = React.useState(
        "Please, use the email you registered to the workshop with");

    const top1EM = {marginTop: "1em"};

    React.useEffect(() => {
        setOptPrompt(
            optValidationRes
                ? "Please, type the One Time Password sent to your email"
                : "Wrong OTP provided. Please use the one sent to the address: " + email
        );
    }, [optValidationRes, optPrompt]);

    const checkUserByEmail = (email) => {
        return new Promise((resolve, reject) => {
            let url = basePath ? `/${basePath}/verify-email` : `/verify-email`;
            let options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    email: email,
                }),
            };
            setIsSending(true);
            fetch(url, options)
                .then((response) => response.json())
                .then((userDetailsData) => {
                    // console.log(data);

                    // add user data to session
                    url = basePath ? `/${basePath}/update-session` : `/update-session`;
                    options = {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json;charset=UTF-8",
                        },
                        body: JSON.stringify({
                            sessionId: sessionId,
                            object: {
                                name: userDetailsData.name,
                                surname: userDetailsData.surname,
                                email: email,
                                workshops: userDetailsData.workshops,
                            },
                            variable: "userDetails",
                        }),
                    };
                    setUserDetails(userDetailsData);
                    fetch(url, options)
                        .then((updateData) => {
                            console.log(updateData);
                            resolve(userDetailsData);
                            setIsSending(false);
                        })
                        .catch((err) => {
                            setErrorMsg("Error fetching user registered workshops");
                            reject(err);
                        });
                })
                .catch((err) => {
                    setErrorMsg("Authenticate user is not accepted in any workshop");
                    reject(err);
                });
        });
    };

    const verifyOTP = (otp) => {
        // fetch()
        return new Promise((resolve, reject) => {
            const url = basePath ? `/${basePath}/verify-otp` : `/verify-otp`;
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    otp: otp,
                    sessionId: sessionId,
                }),
            };
            setIsSending(true);
            fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    console.log("verify otp data");
                    console.log(data);
                    setIsSending(false);
                    setOTPValidationRes(data.result);
                    resolve(data);
                })
                .catch((err) => {
                    setErrorMsg("Error validating OTP");
                    reject(error);
                });
        });
    };

    const sendOTP = (email) => {
        // fetch()
        return new Promise((resolve, reject) => {
            const url = basePath ? `/${basePath}/send-otp` : `/send-otp`;
            console.log("sending otp request to : " + basePath + "/send-otp")
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({
                    email: email,
                    sessionId: sessionId,
                }),
            };
            setIsSending(true);
            setOTPSent(true);
            fetch(url, options)
                .then(() => {
                    console.log("OTP sent");
                    resolve(true);
                    setIsSending(false);
                })
                .catch((err) => {
                    setErrorMsg("Error sending OTP to user");
                    reject(err);
                });
        });
    };

    let toRender = errorMsg ? (
        <Box sx={{display: "flex", flexDirection: "row", pt: 4}}>
            <Box sx={{flex: "1 1 auto"}}>{errorMsg}</Box>
        </Box>
    ) : otpSent ? (
        <>
            <TextField
                error={!optValidationRes}
                id="outlined-otp-field"
                label="OTP"
                defaultValue=" "
                value={otp}
                style={top1EM}
                onChange={(event) => {
                    setOTP(event.target.value);
                }}
            />

            <Box sx={{display: "flex", flexDirection: "row", justifyContent:"center", pt: 4}}>
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    onClick={async (event) => {
                        event.preventDefault();
                        let validationJSON = await verifyOTP(otp);
                        if (validationJSON.result) {
                            let userDetails = await checkUserByEmail(email);
                            console.log(userDetails);

                            window.location.href = basePath
                                ? `/${basePath}/select_credential?sessionId=${sessionId}`
                                : `/select_credential?sessionId=${sessionId}`;
                        }
                    }}
                >
                    Verify
                </Button>
            </Box>
        </>
    ) : isSending ? (
        <Box sx={{display: "flex", flexDirection: "row", pt: 4}}>
            <Box sx={{flex: "1 1 auto"}}>Please wait...</Box>
        </Box>
    ) : (
        <>
            <TextField
                id="outlined-email-field"
                label="email"
                defaultValue=""
                style={top1EM}
                onChange={(event) => {
                    setEmail(event.target.value);
                    // console.log(email)
                }}
            />

            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", pt: 4}}>
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        sendOTP(email);
                    }}
                >
                    Continue
                </Button>
            </Box>
        </>
    );

    return (
        <LayoutNew
            home
            activeStep={"1a"}
            accountName={userDetails ? userDetails.name[0] : null}
            name={userDetails ? userDetails.name : null}
            surname={userDetails ? userDetails.surname : null}
            basePath={basePath}
        >
            <div className="content-wrapper">
                <Typography variant="h5">
                    Before we continue, please verify your email
                </Typography>
                <p> {!otpSent?emailPrompt:optPrompt}</p>
                <div className="inner-content">
                    <div>
                        {toRender}
                    </div>
                </div>
            </div>
        </LayoutNew>
    );
};

export default VerifyEmail;
