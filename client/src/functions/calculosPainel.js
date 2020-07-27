//Lancamentos
//Receitas: 
//Despesas:  
//Saldo: 

function calculatePanelDatas (datas) {

    let lancamentos = datas.length;
    let saldoStatus = ""; 
    let despesas = [];
    let receitas = [];
    let saldo = 0;
    datas.forEach(data => {
        data.type === '-' ? despesas.push(data.value) : receitas.push(data.value);
    });
    
    const valueDespesa = despesas.reduce((acc, despesa) => {
        return acc + despesa
    },0);
    
    const valueReceita = receitas.reduce((acc, receita) => {
        return acc + receita
    },0);

    saldo = valueReceita - valueDespesa; 
    

        valueReceita > valueDespesa ? saldoStatus = "#43a047"  : saldoStatus = "#d32f2f"

    const panelDatas = {
        valueDespesa,
        valueReceita,
        lancamentos,
        saldo, 
        saldoStatus
    }

    
    return panelDatas;

}

export {calculatePanelDatas}