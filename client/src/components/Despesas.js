import React, {useState, useEffect} from 'react';

import DateControll from './dateControll/DateControll';

import Painel from './Painel';

import NovoLancamento from './NovoLancamento';

import Filter from './Filter';

import {calculatePanelDatas} from "../functions/calculosPainel";

import {filterDespesas} from "../functions/filterDespesas";

import Lancamentos from './lancamentos/Lancamentos'

export default function Despesas() { 
    
    const [despesas, setDespesas] = useState([]);
    
    const [despesasFilter, setDespesasFilter] = useState([]);
    
    const [panelDatas, setPanelDatas] = useState({});
    
    const [updateLancamento, setUpdateLancamento] = useState(false);
    
    useEffect(() => {
        const panelDatas = calculatePanelDatas(despesasFilter);
        setPanelDatas(panelDatas);
    }, [despesasFilter])
    
    const handleUpdateLancamento = () => {
        setUpdateLancamento(true);
    }

    const handleDespesas = (despesas) => {
        
        setDespesas(despesas); 
        setDespesasFilter(despesas);

        setUpdateLancamento(false);
        
    }
    const handleDespesasFilter = (value) => {
        
       const despesasFilter = filterDespesas(despesas, value);

       setDespesasFilter(despesasFilter);
        
    }


    

    return (
        <div className="container" style={{width:"width: 80%"}}>
            <p style={{color:"black", fontSize:"2rem"}}>
                <strong>Controle financeiro Pessoal</strong>
            </p>


        <DateControll onUpdateLancamento={updateLancamento} onDespesas={handleDespesas}/>

         <Painel panelDatas={panelDatas}/>   


        <div style={{display:"flex", alignItems:"center", marginBottom:"5%", flexWrap: "wrap", justifyContent:"space-between"}}>
            <Filter onDespesasFilter={handleDespesasFilter}/>
            <NovoLancamento onUpdateLancamentos={handleUpdateLancamento}/>
        </div>

        <Lancamentos onUpdateLancamentos={handleUpdateLancamento} despesasFilter={despesasFilter}/>

        </div>
    )
}
