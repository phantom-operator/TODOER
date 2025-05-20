import React, { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeadline, setEditedDeadline] = useState(todo.deadline);

  const handleSave = () => {
    // Assuming deadline is the only editable field for now
    onUpdate(todo.id, { ...todo, deadline: editedDeadline });
    setIsEditing(false);
  };

  const handleToggle = () => {
      if (todo.completed) {
          onToggleComplete(todo.id, false); // Mark as incomplete
      } else {
          onToggleComplete(todo.id, true); // Mark as complete
      }
  };


  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>

      {isEditing ? (
        <div>
          <label htmlFor={`deadline-${todo.id}`}>Deadline:</label>
          <input
            type="datetime-local"
            id={`deadline-${todo.id}`}
            value={editedDeadline}
            onChange={(e) => setEditedDeadline(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
      )}

      {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit Deadline</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
             <button onClick={handleToggle}>
                {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
             </button>
          </>
      )}

    </div>
  );
}

export default TodoItem;
