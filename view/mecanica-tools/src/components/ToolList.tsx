import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToolItem from './ToolsItem';

interface Tool {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  coletaEm?: Date;
  devolucaoEm?: Date;
}

const ToolList: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    // Faça uma solicitação à API para buscar a lista de ferramentas
    axios.get<Tool[]>('http://localhost:5050/alltools')
      .then((response) => {
        setTools(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar ferramentas:', error);
      });
  }, []);

  const handleEdit = (id: number) => {
    
  };

  const handleReserve = (id: number) => {
    
  };

  const handleDelete = (id: number) => {
    
  };

  return (
    <div className="tool-list">
      <h1>Lista de Ferramentas</h1>
      {tools.map((tool) => (
        <ToolItem
          key={tool.id}
          {...tool}
          onEdit={handleEdit}
          onReserve={handleReserve}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ToolList;
