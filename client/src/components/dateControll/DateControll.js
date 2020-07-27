import React, {useState, useEffect} from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {gerarDadosMenu} from './gerarDadosMenu';

import DespesasDataService from '../service/GradeService';


export default function DateControll({onUpdateLancamento, onDespesas}) {

    const [dates, setDates] = useState([]);

    const [buttomPreState, setButtomPreState] = useState(true);
    const [buttomPosState, setButtomPosState] = useState(true);

    const [selectDate, setSelectDate] = useState(0);

    const [menuItem, setMenuItem] = useState([]);
   
    useEffect(() => {
        gerarMenu();
     }, [dates])
    
     useEffect(() => {
        onUpdateLancamento && verificarDate();
     }, [onUpdateLancamento])
    
     
 
     useEffect(() => {
        verificarDate();
         verificarStateButtom();
         
        
     }, [selectDate])
     

     useEffect(() => {

        const dates = gerarDadosMenu();
        setDates(dates);
        
        setSelectDate(1);
         
     }, []);

     // localiza o date pelo id e faz a busca no back-end
     const verificarDate = () => {
         let dateValue = "";
         const date = dates.find(({id, value} )=> {
            if(id === selectDate) {
                
               dateValue =  value;
               
            } 
              
         });

         
        getDespesas(dateValue);

     }

     const getDespesas = async (date) => {
         try {
             const res = await DespesasDataService.get(date);
            onDespesas(res.data);
            
            
         } catch (error) {
             console.log(error);
         }
        
          
     }
 



     const verificarStateButtom = ()=> {
         selectDate === 1 ? setButtomPreState(true) : setButtomPreState(false)
 
        selectDate === 36 ? setButtomPosState(true) : setButtomPosState(false)
     }
     
     const handleChange = (event) => {
         const selectDate = event.target.value;
         
         setSelectDate(selectDate);
     };
 
     const gerarMenu = ()=> {
         const menuItem =  dates.map(({id , valueString}) => {
           return <MenuItem key={id} value={id}>{valueString}</MenuItem>
         });
         setMenuItem(menuItem);
                
     }
     
     return (
         
         <div style={{display:"flex", justifyContent: "center", alignItems:"center", marginBottom:"1%"}} >
             
         
          <div>
              
           <IconButton onClick={() => {
               const id = selectDate - 1;
               setSelectDate(id);
               
           }}
            disabled={buttomPreState} color="primary" aria-label="delete" >
           <ChevronLeftIcon   />
         </IconButton>
  
          </div>
         
         
        <div style={{ marginLeft:"5%", marginRight:"5%"}}>
         <Select
            color="primary"
           labelId="demo-simple-select-label"
           id="demo-simple-select"      
           onChange={handleChange}
           value={selectDate}
         >
           {menuItem}
         </Select></div>
 
         <div>
         <IconButton  onClick={() => {
               const id = selectDate + 1;
               setSelectDate(id);
               
           }} 
           disabled={buttomPosState}  color="primary" aria-label="delete" >
         <ChevronRightIcon    />
         </IconButton>
         </div>
         
         </div>
 
        
     )
}
