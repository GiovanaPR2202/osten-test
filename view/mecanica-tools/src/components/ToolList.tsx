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
  mecanico: string;
}

const ToolList: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    axios.get<Tool[]>('http://localhost:5050/alltools')
      .then((response) => {
        setTools(response.data); // Certifique-se de que a resposta contenha um array de ferramentas
      })
      .catch((error) => {
        console.error('Erro ao buscar ferramentas:', error);
      });
  }, []);

  const handleEdit = (id: number) => {
    const newStatus = prompt('Digite o novo status:');
    if (newStatus !== null) {
      axios.patch(`http://localhost:5050/tools/${id}`, { status: newStatus })
        .then(() => {
          setTools((prevTools) =>
            prevTools.map((tool) =>
              tool.id === id ? { ...tool, status: newStatus } : tool
            )
          );
          console.log(`Status da ferramenta com ID ${id} alterado para "${newStatus}".`);
        })
        .catch((error) => {
          console.error(`Erro ao alterar o status da ferramenta com ID ${id}:`, error);
        });
    }
  };

  const handleReserve = (id: number) => {
    const mecanico = prompt('Digite o nome do mecânico:');
    if (mecanico !== null) {
      axios.post(`http://localhost:5050/tools/reservar/${id}`, { mecanico })
        .then(() => {
          setTools((prevTools) =>
            prevTools.map((tool) =>
              tool.id === id ? { ...tool, mecanico } : tool
            )
          );
          console.log(`Ferramenta com ID ${id} reservada para o mecânico "${mecanico}".`);
        })
        .catch((error) => {
          console.error(`Erro ao reservar a ferramenta com ID ${id}:`, error);
        });
    }
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta ferramenta?');
    if (confirmDelete) {
      axios.delete(`http://localhost:5050/tools/${id}`)
        .then(() => {
          setTools((prevTools) =>
            prevTools.filter((tool) => tool.id !== id)
          );
          console.log(`Ferramenta com ID ${id} excluída com sucesso.`);
        })
        .catch((error) => {
          console.error(`Erro ao excluir a ferramenta com ID ${id}:`, error);
        });
    }
  };

  return (
    <div className="tool-list">
      <h1>Lista de Ferramentas</h1>
      {tools.map((tool) => (
        <ToolItem
          key={tool.id}
          {...tool}
          onReserve={() => handleReserve(tool.id)} 
          onEdit={() => handleEdit(tool.id)} 
          onDelete={() => handleDelete(tool.id)} 
        />
      ))}
    </div>
  );
};


export default ToolList;
