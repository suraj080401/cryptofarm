import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import axios from 'axios';
import {useCryptoState} from "../CryptoContext";
import {makeStyles,TableBody,TableHead, TableRow, TableCell, Container, createTheme,ThemeProvider,Typography,TextField, Table, TableContainer, LinearProgress} from "@material-ui/core";
import {useNavigate} from 'react-router';
import {numberWithCommas} from './Banner/Carosuel';
import {Pagination} from "@material-ui/lab";

const CoinsTable = () => {
    const [coins,setCoins] = useState([]);
    const [searchList,setSearchList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page,setPage] = useState(1);
    const navigate = useNavigate(); 
    const {currency,symbol} = useCryptoState();
    const classes = useStyles();


    const fetchCoins =  async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setSearchList(data);
        console.log(coins);
        setLoading(false);
    }

    useEffect(()=>{
        fetchCoins();
    },[currency])

    const darkTheme = createTheme({
        palette: {
            primary:{
                main:"#fff"
            },
            type: "dark",
        },
    })
    
    const handleSearch = (str)=>{
        setSearchList(coins)
        if(search.length === 0){
            setSearchList(coins);
        }
        else{
            const temp = [];
            coins.forEach((coin)=>{
                console.log(coin.name)
                if(coin.name.toLowerCase().includes(str.toLowerCase()||
                   coin.symbol.toLowerCase().includes(str.toLowerCase()))){
                      console.log(coin.name)
                      temp.push(coin);
                  }
            })
            setSearchList(temp);
        }
    }
    
    return (
        <ThemeProvider theme={darkTheme}>
         <Container style={{textAlign: "center"}}>
             <Typography 
             variant="h4"
             style={{margin: 18, fontFamily: "Montserrat"}}
             >
             Cryptocurrency Prices by Market Cap
             </Typography>
             <TextField 
             label="Search For a Crypto Currency.."
             variant="outlined"
             style={{marginBottom:20,width:"100%"}}
             onChange={(e)=>{setSearch(e.target.value)}}
             onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      console.log(search);
                      handleSearch(search);
                    }
                }}
              />
             <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor : "gold"}}/>
                    ):
                    (
                        <>
                        <Table>
                            <TableHead style={{backgroundColor: "#EEBC1D"}}>
                            <TableRow>
                            {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                    <TableCell
                                    style={{
                                    color: "black",
                                    fontWeight: "700", 
                                    fontFamily: "Montserrat"
                                    }}
                                    key={head}
                                    align={head === "Coin" ? "" : "right"}
                                    >
                                    {head}
                                    </TableCell>
                            ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {searchList
                            .slice((page-1)*10,(page-1)*10+10).map((row)=>{
                              const profit = row.price_change_percentage_24h > 0;
                              return (
                                  <TableRow
                                  onClick={()=> navigate(`/coins/${row.id}`)}
                                  className={classes.row}
                                  key={row.name}>
                                  <TableCell component='th' scope='row' style={{display:"flex",gap:15}}>
                                  <img
                                      src={row?.image}
                                      alt={row.name}
                                      height="50"
                                      style={{marginBottom:10}}
                                  />
                                  <div style={{display: "flex" , flexDirection: "column"}}>
                                   <span style={{
                                       textTransform: "uppercase",
                                       fontSize: 22
                                   }}>
                                   {row.symbol}
                                   </span>
                                   <span style={{color: "darkgrey"}}>
                                   {row.name}
                                   </span>
                                  </div>
                                  </TableCell>
                                  <TableCell align="right">
                                   {symbol}{" "}
                                   {numberWithCommas(row.current_price.toFixed(2))}
                                  </TableCell>
                                  <TableCell
                                  align = "right"
                                  style={{
                                      color: profit>0 ? "rgb(14,203,129)": "red",
                                      fontWeight: 500,
                                  }}
                                  >
                                  {profit && "+"}
                                  {row.price_change_percentage_24h.toFixed(2)}%
                                  </TableCell>
                                  <TableCell align="right">
                                  {symbol}{" "}
                                  {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                  </TableCell>
                                  </TableRow>
                              )
                            })}
                            </TableBody>
                        </Table>
                        </>
                    )
                } 
             </TableContainer>
             <Pagination
                 style={{
                     padding:20,
                     width: "100%",
                     display: "flex",
                     justifyContent: "center"
                 }}
                 classes={{ul:classes.pagination}}
                 count={(searchList?.length/10).toFixed(0)}
                 onChange={(_,value)=>{
                     setPage(value)
                     window.scroll(0,450);
                 }}
             />
         </Container>
        </ThemeProvider>
    )
}

const useStyles = makeStyles(()=>({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "#131111"
        },
        fontFamily: "Montserrat",
        height: 53
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color: "gold"
        },
    }
}));

export default CoinsTable
// https://www.glassdoor.co.in/Job/india-software-engineer-jobs-SRCH_IL.0,5_IN115_KO6,23.htm?jobType=internship&remoteWorkType=1