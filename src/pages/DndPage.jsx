import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
      name: 'Blocked',
      items: [],
    },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    // Перемещение внутри одной колонки
    if (source.droppableId === destination.droppableId) {
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      });
    } else {
      // Перемещение между колонками
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
    }
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
      <Link className="link" to="/">
        Перейти к обычному To-Do листу
      </Link>
      <DragDropContext onDragEnd={handleDragEnd}>
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
              minWidth: '200px',
            }}
          >
            <h2>{column.name}</h2>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ width: '100%', minHeight: '100px' }}
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '16px',
                            margin: '0 0 8px 0',
                            backgroundColor: '#968f8a',
                            color: 'white',
                            cursor: 'grab',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(item.id)}
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default DndPage;
