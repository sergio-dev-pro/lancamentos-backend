import React, {useEffect, useState} from 'react';

export default function Filter({onDespesasFilter}) {

    const [valueFilter, setValueFilter] = useState("");

    useEffect(() => {
        
        onDespesasFilter(valueFilter);
        
    }, [valueFilter])

    return (
        
            
           <div className="input-field col s6" style={{width:"70%", marginRight:"2%", borderBottom:" 1px solid" }}>
      <input onChange={(e) => setValueFilter(e.target.value) } style={{color:"black", marginBottom:"0"}} id="first_name2" type="text" className="validate"/>
      <label style={{color:"black "}} onFocus={true} className="active" htmlFor="first_name2">FILTER</label>
        </div>
        
    )
}
