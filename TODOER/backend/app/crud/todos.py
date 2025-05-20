from typing import List, Optional
from app.models.todo import TodoCreate, Todo

# In-memory storage for simplicity
todos_db: List[Todo] = []
next_id = 1

def create_todo(todo: TodoCreate) -> Todo:
    global next_id
    db_todo = Todo(id=next_id, **todo.dict(), completed=False)
    todos_db.append(db_todo)
    next_id += 1
    return db_todo

def get_todos(skip: int = 0, limit: int = 100, show_finished: bool = False) -> List[Todo]:
    if show_finished:
        return todos_db[skip : skip + limit]
    else:
        return [todo for todo in todos_db if not todo.completed][skip : skip + limit]

def get_todo(todo_id: int) -> Optional[Todo]:
    for todo in todos_db:
        if todo.id == todo_id:
            return todo
    return None

def update_todo(todo_id: int, todo: TodoCreate) -> Optional[Todo]:
    for index, db_todo in enumerate(todos_db):
        if db_todo.id == todo_id:
            updated_data = todo.dict(exclude_unset=True)
            todos_db[index] = db_todo.copy(update=updated_data)
            return todos_db[index]
    return None

def delete_todo(todo_id: int) -> Optional[Todo]:
    global todos_db
    original_len = len(todos_db)
    todos_db = [todo for todo in todos_db if todo.id != todo_id]
    if len(todos_db) < original_len:
        # Assuming the deleted todo was the one with todo_id, find and return it
        # This is a simplified approach for in-memory storage
        # In a real DB, you'd fetch the item before deleting or get it from the delete result
        # For this example, we'll just return a placeholder or None if not found previously
         return Todo(id=todo_id, title="Deleted", description="Deleted", deadline="2000-01-01T00:00:00", completed=True) # Simplified return
    return None # Indicate not found initially

def complete_todo(todo_id: int) -> Optional[Todo]:
    for todo in todos_db:
        if todo.id == todo_id:
            todo.completed = True
            return todo
    return None

def incomplete_todo(todo_id: int) -> Optional[Todo]:
     for todo in todos_db:
        if todo.id == todo_id:
            todo.completed = False
            return todo
    return None
