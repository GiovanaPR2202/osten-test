import React, { useState } from 'react';
import axios from 'axios';

const ToolForm: React.FC = () => {
  const [toolData, setToolData] = useState({
    nome: '',
    descricao: '',
    status: '',
    coletaEm: '',
    devolucaoEm: '',
    mecanico: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Faça uma solicitação POST para a rota localhost:5050/cadastra
    axios.post('http://localhost:5050/cadastra', toolData)
      .then((response) => {
        console.log('Ferramenta cadastrada com sucesso:', response.data);
        // Lógica adicional, como redirecionar para a lista de ferramentas ou limpar o formulário
      })
      .catch((error) => {
        console.error('Erro ao cadastrar ferramenta:', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setToolData({ ...toolData, [name]: value });
  };

  return (
    <div className="tool-form">
      <h2>Cadastrar Nova Ferramenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group  relative z-0 w-full mb-6 group ">
          <label htmlFor="nome"  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>Nome:</label>
          <input  className='form-field' type="text" id="nome" name="nome" value={toolData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group  relative z-0 w-full mb-6 group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={toolData.descricao} onChange={handleChange} required />
        </div>
        <div className="form-group relative z-0 w-full mb-6 group">
          <label htmlFor="status">Status:</label>
          <input className='form-field' type="text" id="status" name="status" value={toolData.status} onChange={handleChange} required />
        </div>
        <div className="form-group relative z-0 w-full mb-6 group">
          <label htmlFor="coletaEm">Coleta em:</label>
          <input  className='form-field-date' type="datetime-local" id="coletaEm" name="coletaEm" value={toolData.coletaEm} onChange={handleChange} />
        </div>
        <div className="form-group  relative z-0 w-full mb-6 group">
          <label htmlFor="devolucaoEm">Devolução em:</label>
          <input  className='form-field-date' type="datetime-local" id="devolucaoEm" name="devolucaoEm" value={toolData.devolucaoEm} onChange={handleChange} />
        </div>
        <div className="form-group  relative z-0 w-full mb-6 group">
          <label htmlFor="mecanico">Mecânico:</label>
          <input className='form-field' type="text" id="mecanico" name="mecanico" value={toolData.mecanico} onChange={handleChange} />
        </div>
        <button  className=""   type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default ToolForm;