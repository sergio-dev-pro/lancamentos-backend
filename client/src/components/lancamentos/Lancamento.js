import React, {useEffect, useState} from 'react';

import Modal from 'react-modal';

import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';

import {tratarNewLancamentos} from '../../functions/tratarNewLancamentos';

import  DespesasDataService from '../service/GradeService';

Modal.setAppElement('#root');

export default function Lancamento({onUpdateLancamentos, id, description, value, category, day, type, yearMonthday }) {

    const [lancamentState, setLancamentState] = useState("");

    const [modalState, setModalState] = useState(false);
    
    const [editLancamento, setEditLancamento] = useState({});
    
    //modal tratamento
    const [editDescription, setEditDescription] = useState("");

    const [editCategory, setEditCategory] = useState("");

    const [editValue, setEditValue] = useState(null);

    const [editDate, setEditDate] = useState("");

    const [editType, setEditType] = useState("");

    //erro
    const [typeErro, setTypeErro] = useState("");
    const [erroState, setErroState] = useState(false);

    useEffect(() => {
      
      
        type === "-" ? setLancamentState("#d32f2f") : setLancamentState("#2e7d32");

    }, [type]);

  
    const executarTratamento = () => {

        const editLancamento = tratarNewLancamentos(editDescription, editCategory, editType, editValue, editDate)
          if(editLancamento.error)  {
            editLancamento.type === "text" && setTypeErro("Erro, preencha todos os campos corretamente")
            editLancamento.type === "date" && setTypeErro("Erro, preencha o campo da data corretamente, com ano entre 2019 e 2021.");
            setErroState(editLancamento.error);
            return;
          }    
    
          setEditLancamento(editLancamento);

          updateLancamento(editLancamento);
    
      }

      const updateLancamento = (editLancamento) => {
        setModalState(false);
        const updateLancamento = async () => {
          const res = await DespesasDataService.update(id , editLancamento);
          console.log(res, "ok")
         if(res.status === 200) onUpdateLancamentos();
        } 
  
        editLancamento !== {} && updateLancamento();
        
      }
    
    const deletarLancamento = async () => {
        const res = await DespesasDataService.remove(id);

        res.status && onUpdateLancamentos();

    }

    const abrirModalEdit = () => {
        setModalState(true);
    }

    return (
        
           <div className="col s12" style={{borderLeft: `4px solid ${lancamentState}` , borderBottom: "0.5px solid black ", alignItems:"center", minHeight:"55px ", display:"flex", borderRadius: '4px', marginBottom:"2%", width:"100%"}} > 
                <p style={{fontSize:"1.2em",  marginRight: '20px'}}> <b>{day < 10 ? "0" +day : day}</b></p>
               
                <div style={{display:"inline-block", alignItems:"center",     display: "grid", width: "70%"}}>
                <div><p style={{fontSize:"1rem", float: "left", margin: '0'}}> <b>{category}</b></p></div>
               <div style={{width:"100%"}}> <p style={{ float: "left", margin: '0'}}> {description}</p></div>

                </div>
                <div style={{ width:"15%", display:"flex"}}><p style={{ color:lancamentState, fontSize:"1.3rem"}}><b>R$ {value}</b> </p></div>
                
                <div  style={{width:"10%", display:"flex", marginLeft:"10%"}}>
                <a onClick={deletarLancamento} className="btn-tiny waves-effect waves-light white"  style={{marginRight:"10px"}}>
                <i  className="material-icons" style={{color:"black", fontSize:"1.1rem"}}>delete</i>
                </a>

                
                <a onClick={abrirModalEdit} className=" waves-effect waves-light white">
                <i className="material-icons" style={{color:"black", fontSize:"1.1rem"}}>edit</i>
                </a>
                
                </div>


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
           <h6 ><b>Editar Lançamento</b></h6>
       <Button size="small" style={{float:"right", marginBottom:"5%"}} onClick={() => setModalState(false) } variant="contained" color="secondary">
        <CloseIcon fontSize="small"/>
      </Button>
        </div>
       
       <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly", marginBottom:"3%"}}> <p>
      <label>
        <input  onClick={()=> {setEditType("-")}} name="group1" type="radio"  />
        <span style={{color:"black"}}><b>Despesa</b></span>
      </label>
    </p>
    <p>
      <label>
        <input onClick={()=> {setEditType("+")}} name="group1" type="radio" />
        <span style={{color:"black"}}><b>Receita</b></span>    
      </label>
    </p></div>

        <div class="input-field col s6" style={{width:"100%", marginBottom:"1%"}}>
      <input value={description} onChange={(e) => {setEditDescription(e.target.value)}}  id="" type="text" class="validate"/>
      <label class="active" for="first_name2">Descriçao</label>
        </div>

        <div class="input-field col s6" style={{width:"100%", marginBottom:"1%"}}>
      <input value={category} onChange={(e) => {setEditCategory(e.target.value)}}  id="first_name2" type="text" class="validate"/>
      <label class="active" for="first_name2">Categoria</label>
        </div>

        <div style={{display:"flex", justifyContent: "space-between", marginBottom:"8%"}}>
        <div class="input-field col s6" style={{width:"45%", marginBottom:"1%"}}>
      <input value={value} onChange={(e) => {setEditValue(e.target.value)}} id="first_name2" type="number" class="validate" min="0"/>
      <label class="active" for="first_name2">Valor</label>
        </div>

        <div class="input-field col s6" style={{width:"45%", marginBottom:"1%"}}>
      <input value={yearMonthday} onChange={(e) => {setEditDate(e.target.value)}}  id="first_name" type="date" class="validate"/>
      <label class="active" for="first_name2">Date</label>
        </div>
        </div>

        <Button  onClick={() => {executarTratamento()} }
         size="large" 
          variant="contained" 
          color="primary">
        EDITAR
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
