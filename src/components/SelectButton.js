import { makeStyles } from '@material-ui/core';
import React from 'react';

const SelectButton = ({ children, selected, onClick }) => {
    const classes = useStyles();
  return (
    <span onClick={onClick} 
    className={classes.selectButton}
     style={{
        border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      width: "22%",
      margin :5
     }}>
      {children}
    </span>
  );
};

const useStyles = makeStyles({
   selectButton:{
    '&:hover': {
        backgroundColor: "gold",
        color: "black",
      },
   }
})
export default SelectButton;