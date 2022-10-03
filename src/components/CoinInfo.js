import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useCryptoState} from '../CryptoContext';
import {HistoricalChart} from '../config/api'
import { Line } from "react-chartjs-2";
import SelectButton from '../components/SelectButton';
import { createTheme ,makeStyles,ThemeProvider ,CircularProgress} from '@material-ui/core';
import {chartDays} from '../config/data';
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip,CategoryScale, Legend} from "chart.js";
ChartJS.register(LineElement, PointElement, LinearScale, Title, Legend, Tooltip,CategoryScale);

const CoinInfo = ({coin}) => {
    const classes = useStyles();
    const [flag,setflag] = useState(false);
    const [historicData,setHistoricData] = useState();
    const [days,setDays] = useState(1);
    const {symbol,currency} = useCryptoState();
    const fetchData = async ()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
        setHistoricData(data.prices);
    
    }
    useEffect(()=>{
        fetchData();
    },[currency,days])

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: "#fff",
            },
            type:"dark",
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
        {!historicData ? (
                <CircularProgress style={{color: "gold"}} size={250} thickness={1}/>
            ):
        (
        <>
        <div style={{ height: "100%", width: "100%" }}>
              <Line
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            </div>
            <div style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}>
            {chartDays.map((day)=>(
              <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
         ))}
            </div>
        </>
        )}
        </div>
        </ThemeProvider>
    )
}
const useStyles = makeStyles((theme)=>({
    container:{
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        padding:40,
        [theme.breakpoints.down("md")]:{
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0
        }
    }
}))
export default CoinInfo
