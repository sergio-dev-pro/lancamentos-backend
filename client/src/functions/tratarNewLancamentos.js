function tratarNewLancamentos(description, category, type, value, date ){
    
    let messageError = {
      error: true,
      type: "date"  
    } 
    
    //tratamento descripition 
    const tratarDescription = ()=> {
    let stateDescription = false;
        let newDescription = description.trim();
        newDescription = newDescription.replace(",", ".");
        newDescription !== "" && isNaN(newDescription) !== false ? stateDescription = true : stateDescription = false ; 
        if(stateDescription) return  {description}
        messageError.type = "text"
        
        return messageError;   
        
    }
    //tratamento category
    const tratarCategory = ()=> {
    let stateCategory = false;
        let newCategory = category.trim();
        newCategory = newCategory.replace(",", ".");
        newCategory !== "" && isNaN(newCategory) !== false ? stateCategory= true : stateCategory = false ; 
        
        if(stateCategory) return { category};

        messageError.type = "text"
        return messageError;
        
    }


    //tratamento type
    const tratarType = ()=> {
    let stateType = false;
        type !== "" ? stateType = true : stateType = false ; 
        if(stateType) return { type};

        messageError.type = "text"
        return messageError;
        
    }


    //tratamento value 
    const tratarValue = ()=> {
    let stateValue = false;
        value !== "" && isNaN(value) === false ? stateValue = true : stateValue = false ; 
        if(stateValue) return { value: +value}

        messageError.type = "text"
        return messageError;

        
    }



    //tratamento da data
    
    const tratarDate = (date) => {

        let stateDia = false;
        const dateDia = date.substr(8);
        dateDia != "" ? stateDia = true : stateDia = false
        
        let stateMes = false;
        const dateMes = date.substr(5,2) ;
        dateMes != "" ? stateMes = true : stateMes = false
        
        
        let stateAno = false;
        const dateAno = date.substr(0,4) ;
        dateAno >= 2019 && dateAno <= 2021 && dateAno != "" ? stateAno = true : stateAno = false
        
        if(stateAno === true && stateDia === true && stateMes === true) {

            const dateTratada = {
            year: +dateAno ,
            month: +dateMes,
            day: +dateDia,
            yearMonth: dateAno + "-" + dateMes,
            yearMonthDay:  dateAno + "-" + dateMes + "-" + dateDia
        }
        return dateTratada;

        }
        return messageError;


        
    } 

    const newDescriptionObject =  tratarDescription();
    if(newDescriptionObject.error) return newDescriptionObject;
    
    const newCategoryObject =  tratarCategory();
    if(newCategoryObject.error) return newCategoryObject;
    
    const newTypeObject =  tratarType();
    if(newTypeObject.error) return newTypeObject;
    
    const newValueObject =  tratarValue();
    if(newValueObject.error) return newValueObject;
    
    
   
   const newDateObject = tratarDate(date); 
    if(newDateObject.error) return newDateObject;


    
               const newLancamento = () => {
                   const lancamento = {
                    ...newDescriptionObject,
                    ...newCategoryObject,
                    ...newTypeObject,
                    ...newValueObject,
                    ...newDateObject
                   }

                   return lancamento;
               }
    
    const lancamento = newLancamento();

    return lancamento;
    
} 


/*
        _id: "5f10b39687ec17681885c9f9",
        description: "Compras em padaria",
        value: 37,
        category: "Mercado",
        year: 2020,
        month: 8,
        day: 1,
        yearMonth: "2020-08",
        yearMonthDay: "2020-08-01",
        type: "-"*/

export {tratarNewLancamentos}