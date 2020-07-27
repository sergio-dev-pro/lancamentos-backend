import React from 'react'

export default function Painel({panelDatas}) {

    const {valueReceita, valueDespesa, saldo, lancamentos, saldoStatus} = panelDatas
    
    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:" space-between", marginBottom:"3%", flexWrap: "wrap"}}>

            <p ><b>Lançamentos: {lancamentos}</b></p>
            <p ><b>Receitas: <strong style={{color:"#2e7d32"}}><b>R$ {valueReceita}</b></strong></b></p> 
            <p ><b>Despesas: <strong style={{color:"#d32f2f "}}><b>R$ {valueDespesa}</b></strong></b></p> 
            <p ><b>Saldo: <strong style={{color:saldoStatus }}><b>R$ {saldo}</b></strong></b></p> 
            
        </div>
    )
}
