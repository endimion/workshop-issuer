import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Stepper from "components/Stepper.js";

import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <Header
                absolute
                color="primary"
                brand="NextJS Material Kit"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    // backgroundImage: "url('/img/bg7.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                }}
            >
                <div className={classes.container}>
                    <GridContainer justifyContent="center">
                        <GridItem xs={12} sm={4} md={10}>
                            <Card className={classes[cardAnimaton]}>
                                {/*<form className={classes.form}>*/}
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Form Title</h4>
                                        <Stepper steps={[{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'},
                                            {title: 'Step Four'}, {title: 'Step Five'}, {title: 'Step Six'},
                                            {title: 'Step Seven'}, {title: 'Step Eight'} ] } activeStep={ 3 }  />

                                        {/*<div className={classes.socialLine}>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fab fa-twitter"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fab fa-facebook"} />
                                            </Button>
                                            <Button
                                                justIcon
                                                href="#pablo"
                                                target="_blank"
                                                color="transparent"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className={"fab fa-google-plus-g"} />
                                            </Button>
                                        </div>*/}
                                        {/*<Stepper />*/}
                                    </CardHeader>
                                    <p className={classes.divider}>In order to build your KYB profile, first provide your company’s details below, and then click the “Retrieve Data” button. This will result in an eIDAS eID authentication.</p>
                                    <CardBody>
                                        <h4 className={classes.textLeft }>
                                            Company Details Form
                                        </h4>
                                        <GridContainer>

                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Company Name"
                                                id="companyName"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                handleChange={props.handleChange}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Company Country"
                                                id="companyCountry"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                handleChange={props.handleChange}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="LEI"
                                                id="lei"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                handleChange={props.handleChange}
                                            />
                                        </GridItem>
                                        </GridContainer>
                                        <h4 className={classes.textLeft}>
                                            Representative Form
                                        </h4>
                                        <GridContainer>

                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Name"
                                                    id="name"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <People className={classes.inputIconsColor} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    handleChange={props.handleChange}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="Surname"
                                                    id="surname"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <People className={classes.inputIconsColor} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    handleChange={props.handleChange}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    labelText="email"
                                                    id="email"
                                                    formControlProps={{
                                                        fullWidth: true,
                                                    }}
                                                    inputProps={{
                                                        type: "email",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Email className={classes.inputIconsColor} />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    handleChange={props.handleChange}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        {/*<CustomInput
                                            labelText="First Name..."
                                            id="first"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Email..."
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "email",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Email className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Password"
                                            id="pass"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off",
                                            }}
                                        />*/}
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button color="primary" size="lg">
                                            Retrieve
                                        </Button>
                                    </CardFooter>
                               {/* </form>*/}
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
