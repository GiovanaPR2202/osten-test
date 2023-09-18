import React from 'react';

interface ToolItemProps {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  coletaEm?: Date;
  devolucaoEm?: Date;
  mecanico : String,
  onEdit: (id: number) => void;
  onReserve: (id: number) => void;
  onDelete: (id: number) => void;
}

const ToolItem: React.FC<ToolItemProps> = ({
  id,
  nome,
  descricao,
  status,
  coletaEm,
  devolucaoEm,
  mecanico,
  onEdit,
  onReserve,
  onDelete,
}) => {
  return (
    <div className="tool-item">
      <h3>{nome}</h3>
      <p>Descrição: {descricao}</p>
      <p>Status: {status}</p>
      <p>Coleta em: {coletaEm?.toLocaleString()}</p>
      <p>Devolução em: {devolucaoEm?.toLocaleString()}</p>
      <p>Mecanico : {mecanico}</p>
      <button onClick={() => onEdit(id)}>Editar</button>
      <button onClick={() => onReserve(id)}>Reservar</button>
      <button onClick={() => onDelete(id)}>Deletar</button>
    </div>
  );
};

export default ToolItem;
