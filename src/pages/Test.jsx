import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DndPage = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'First task' },
        { id: '2', content: 'Second task' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
    blocked: {
      name: "Blocked",
      items: [],
    }
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceColumnId, setSourceColumnId] = useState(null);

  const handleDragStart = (item, columnId) => {
    setDraggedItem(item);
    setSourceColumnId(columnId);
  };

  const handleDrop = (destinationColumnId) => {
    if (!draggedItem) return;

    const sourceColumn = columns[sourceColumnId];
    const destColumn = columns[destinationColumnId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const newSourceItems = sourceItems.filter(item => item.id !== draggedItem.id);
    const newDestItems = [...destItems, draggedItem];

    setColumns({
      ...columns,
      [sourceColumnId]: { ...sourceColumn, items: newSourceItems },
      [destinationColumnId]: { ...destColumn, items: newDestItems },
    });

    setDraggedItem(null);
    setSourceColumnId(null);
  };

  const handleDelete = (id) => {
    setColumns((prevColumns) => {
        const updatedColumns = { ...prevColumns };
        Object.values(updatedColumns).forEach((column) => {
            column.items = column.items.filter((item) => item.id !== id);
        });
        return updatedColumns;
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <Link className='link' to="/">Перейти к обычному To-Do листу</Link>
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 20px',
            border: '1px solid lightgrey',
            padding: '10px',
            background: 'lightgrey',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(columnId)}
        >
          <h2>{column.name}</h2>
          {column.items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item, columnId)}
              style={{
                padding: '16px',
                margin: '0 0 8px 0',
                backgroundColor: '#968f8a',
                color: 'white',
                cursor: 'grab',
              }}

            >
              {item.content}
              <button 
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DndPage;