import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import Modal from 'react-modal';

import CloseIcon from '@material-ui/icons/Close';

import {tratarNewLancamentos} from '../functions/tratarNewLancamentos';

import DespesasDataService from './service/GradeService';

Modal.setAppElement('#root');

const lancamentoInicial = {
    _id: "5f10b39687ec17681885c9f9",
    description: "Compras em padaria",
    value: 37,
    category: "Mercado",
    year: 2020,
    month: 8,
    day: 1,
    yearMonth: "2020-08",
    yearMonthDay: "2020-08-01",
    type: "-"
}

export default function NovoLancamento({onUpdateLancamentos}) {

    const [modalState, setModalState] = useState(false);
    
    const [newLancamento, setNewLancamento] = useState({});
    
    //modal tratamento
    const [newDescription, setNewDescription] = useState("");

    const [newCategory, setNewCategory] = useState("");

    const [newValue, setNewValue] = useState(null);

    const [newDate, setNewDate] = useState("");

    const [newType, setNewType] = useState("");
    
    //erro no modal Dados
    const [typeErro, setTypeErro] = useState("");
    const [erroState, setErroState] = useState(false);

    useEffect(() => {
      setModalState(false);
      const createLancamento = async () => {
       const res = await DespesasDataService.create(newLancamento);

       if(res.status === 200) onUpdateLancamentos();

      } 
      newLancamento !== {} && createLancamento();
      
       
   }, [newLancamento]);


  const executarTratamento = () => {

    const newLancamento = tratarNewLancamentos(newDescription, newCategory, newType, newValue, newDate)
      if(newLancamento.error)  {
        newLancamento.type === "text" && setTypeErro("Erro, preencha todos os campos corretamente")
        newLancamento.type === "date" && setTypeErro("Erro, preencha o campo da data corretamente, com ano entre 2019 e 2021.");
        setErroState(newLancamento.error);
        return;
      }    

      setNewLancamento(newLancamento);

  }
    
   /* "_id": "5f10b39687ec17681885c9f9",
    "description": "Compras em padaria",
    "value": 37,
    "category": "Mercado",
    "year": 2020,
    "month": 8,
    "day": 1,
    "yearMonth": "2020-08",
    "yearMonthDay": "2020-08-01",
    "type": "-"*/

    return (

        <div style={{ float:"right"}}>
        
        <Button onClick={() => setModalState(true) } variant="contained" color="primary">
        
        NOVO LANÇAMENTO
      </Button>

      <Modal style={{
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(189, 189, 189, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '10%',
      left: '35%',
      right: '35%',
      bottom: '20%',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
      padding: '20px'
    }
  }} 
      isOpen={modalState} >
          <div style={{display:"block",alignItems:"center"}}>
       <div style={{display:"flex", justifyContent: "space-between", marginBottom:"3%"}}>
           <h6 ><b>Criar Lançamento</b></h6>
       <Button size="small" style={{float:"right", marginBottom:"5%"}} onClick={() => setModalState(false) } variant="contained" color="secondary">
        <CloseIcon fontSize="small"/>
      </Button>
        </div>
       
       <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", marginBottom:"3%"}}> <p>
      <label>
        <input  onClick={()=> {setNewType("-")}} name="group1" type="radio"  />
        <span style={{color:"black"}}><b>Despesa</b></span>
      </label>
    </p>
    <p>
      <label>
        <input onClick={()=> {setNewType("+")}} name="group1" type="radio" />
        <span style={{color:"black"}}><b>Receita</b></span>    
      </label>
    </p></div>

        <div class="input-field col s6" style={{width:"100%", marginBottom:"1%"}}>
      <input onChange={(e) => {setNewDescription(e.target.value)}}  id="" type="text" class="validate"/>
      <label class="active" for="first_name2">Descriçao</label>
        </div>

        <div class="input-field col s6" style={{width:"100%", marginBottom:"1%"}}>
      <input onChange={(e) => {setNewCategory(e.target.value)}}  id="first_name2" type="text" class="validate"/>
      <label class="active" for="first_name2">Categoria</label>
        </div>

        <div style={{display:"flex", justifyContent: "space-between", marginBottom:"8%"}}>
        <div class="input-field col s6" style={{width:"45%", marginBottom:"1%"}}>
      <input onChange={(e) => {setNewValue(e.target.value)}} id="first_name2" type="number" class="validate" min="0"/>
      <label class="active" for="first_name2">Valor</label>
        </div>

        <div class="input-field col s6" style={{width:"45%", marginBottom:"1%"}}>
      <input onChange={(e) => {setNewDate(e.target.value)}}  id="first_name" type="date" class="validate"/>
      <label class="active" for="first_name2">Date</label>
        </div>
        </div>

        <Button  onClick={() => {executarTratamento()} }
         size="large" 
          variant="contained" 
          color="primary">
        CRIAR 
      </Button>
        </div>


      </Modal>
        
      
      <Modal isOpen={erroState} style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(189, 189, 189, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '35%',
          left: '35%',
          right: '35%',
          bottom: '35%',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
        }
      }}>
        <div style={{ alignItems:"center", justifyContent:"space-around"}}>
        <p style={{fontSize:"1rem",color:"red"}}><b>{typeErro}</b></p>
        <Button  onClick={() => {setErroState(false);} }
       size="small" 
        variant="contained" 
        color="secondary">
      ENTENDI
    </Button>
        </div>
         </Modal>
      
        </div>
    )
}


/*
border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    overflow: auto;
    border-radius: 4px;
    outline: none;*/