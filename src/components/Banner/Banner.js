import React from 'react'
import {Container, makeStyles, Typography} from '@material-ui/core';
import Carosuel from './Carosuel';

const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant="h2"
                style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat"
                }}
                >
                Crypto Farm
                </Typography>
                <Typography
                variant="subtitle2"
                style={{
                    color: "darkgrey",
                    textTransform:"capitalize",
                    fontFamily: "Montserrat"
                }}
                >
                    All information about your favourite CryptoCurrencies.
                </Typography>
            </div>
            <Carosuel/>
            </Container>
        </div>
    )
}
const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: "url(./banner2.jpeg)"
    },
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline:{
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}));
export default Banner
