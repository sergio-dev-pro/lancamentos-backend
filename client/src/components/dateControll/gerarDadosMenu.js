function gerarDadosMenu(){
    const mesesString = [
        {mes : "jan"},
        {mes : "fev"},
        {mes : "mar"},
        {mes : "abr"},
        {mes : "maio"},
        {mes : "jun"},
        {mes : "jul"},
        {mes : "ago"},
        {mes : "set"},
        {mes : "out"},
        {mes : "nov"},
        {mes : "dez"}
    ];

    let meses = [];
    let ano = 2019;
    let ID = 1;
    for(let i = 1; i<= 12; i++){
        let zero = "";
        if(i < 10)  zero = "0" ;
        const object = {
            id: ID,
            value : ano.toString() + "-" + zero+i.toString(),
            valueString : mesesString[i-1].mes + "/" + ano.toString()
        }
        meses.push(object);
        
        ID++;
        if(i == 12){
            i = 0;
            if(ano < 2021){
                
                ano+= 1;
            }else{
                break;
            }
        }
    }
    return meses;
}


export {gerarDadosMenu}