import React, {useState, useEffect} from 'react';

import Lancamento from './Lancamento';

export default function Lancamentos({onUpdateLancamentos, despesasFilter}) {

    const [lancamentosComponents, setLancamentosComponents] = useState([]);
    

    useEffect(() => {
        estruturarLancamentos();
    }, [despesasFilter]);

    const handleUpdateLancamentos = () => {
        onUpdateLancamentos();
    }


    const estruturarLancamentos = () => {

        const lancamentosOrdenados = despesasFilter.sort((a, b) => a.day - b.day);  

        const lancamentosComponents = lancamentosOrdenados.map(({_id, description, value, category, day, type, yearMonthday } ) => {
           return ( <Lancamento 
            key={_id}
            id ={_id}
            yearMonthday={yearMonthday}
            onUpdateLancamentos={handleUpdateLancamentos}
             description={description}
              value={value}
               category={category}
                day={day}
                type={type} 
                 />)
        }) 

        setLancamentosComponents(lancamentosComponents);
    }

    return (
        <div className="row">
            {
                lancamentosComponents
            }
        </div>
    )
}
