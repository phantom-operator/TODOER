from fastapi import APIRouter, HTTPException
from typing import List

# Assuming models and crud are defined
from app.models.todo import TodoCreate, Todo
from app.crud import todos as crud_todos

router = APIRouter()

@router.post("/todos/", response_model=Todo)
def create_todo(todo: TodoCreate):
    # Logic to create a todo
    return crud_todos.create_todo(todo=todo)

@router.get("/todos/", response_model=List[Todo])
def read_todos(skip: int = 0, limit: int = 100, show_finished: bool = False):
    # Logic to read todos, optionally filtering finished ones
    return crud_todos.get_todos(skip=skip, limit=limit, show_finished=show_finished)

@router.get("/todos/{todo_id}", response_model=Todo)
def read_todo(todo_id: int):
    # Logic to read a single todo
    db_todo = crud_todos.get_todo(todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, todo: TodoCreate) -> Optional[Todo]:
    # Logic to update a todo
    db_todo = crud_todos.update_todo(todo_id=todo_id, todo=todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.delete("/todos/{todo_id}", response_model=Todo)
def delete_todo(todo_id: int) -> Optional[Todo]:
    # Logic to delete a todo
    db_todo = crud_todos.delete_todo(todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.patch("/todos/{todo_id}/complete", response_model=Todo)
def complete_todo(todo_id: int):
    # Logic to mark a todo as complete
    db_todo = crud_todos.complete_todo(todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.patch("/todos/{todo_id}/incomplete", response_model=Todo)
def incomplete_todo(todo_id: int):
     for todo in crud_todos.todos_db:
        if todo.id == todo_id:
            todo.completed = False
            return todo
    return None
