import React from 'react';

interface ToolItemProps {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  coletaEm?: Date;
  devolucaoEm?: Date;
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
      <button onClick={() => onEdit(id)}>Editar</button>
      <button onClick={() => onReserve(id)}>Reservar</button>
      <button onClick={() => onDelete(id)}>Deletar</button>
    </div>
  );
};

export default ToolItem;
