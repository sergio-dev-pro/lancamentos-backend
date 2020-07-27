function filterDespesas(despesas, value){

    const newValue = value.toLowerCase();
        
    
        const despesasFilter = despesas.filter(({description}) => {
           const newDescription = description.toLowerCase();
           
           return newDescription.includes(newValue);
           
                
        
    });

    
    return despesasFilter;
}

export {filterDespesas}