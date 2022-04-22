import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './api';

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input===''){
      alert("Preencha o Cep");
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Deu ruim");
      setInput("");
    }
  }
  return (
    <div className="container">
    <h1 className="title">Buscador Cep</h1>
    <div className="containerImput">
    <input type="text" 
    placeholder="Digite seu Cep..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    />

    <button className="buttonSearch" onClick={handleSearch}>
    <FiSearch size={25} color="#000"/>
    </button>
    </div>
    {Object.keys(cep).length >0 &&(
      <main className='main'>
        <h2>Cep: {cep.cep} </h2>

        <span>{cep.logradouro}</span>
        <span> Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>

    </main>

    )}
    
    </div>
  );
}

export default App;
