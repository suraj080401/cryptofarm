import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider} from '@material-ui/core'
import React from 'react';
import {useNavigate} from 'react-router';
import {useCryptoState} from '../CryptoContext'

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate(); 
    const darkTheme = createTheme({
        palette: {
            primary:{
                main:"#fff"
            },
            type: "dark",
        },
    })
    const {currency,symobol,setCurrency} = useCryptoState();
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography 
                    onClick={()=> navigate("/")} 
                    className={classes.title}
                    variant='h6'
                    >
                        CryptoFarm
                    </Typography>
                    <Select 
                    value={currency}
                    onChange={(e)=>{setCurrency(e.target.value)}}
                    variant="outlined" 
                    style={{
                        width: 100,
                        height: 40,
                        marginRight: 15
                    }}>
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

const useStyles = makeStyles(()=>({
    title:{
        flex:1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer"
    }
}));
export default Header
