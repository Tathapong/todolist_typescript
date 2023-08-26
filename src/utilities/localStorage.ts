import { TodosType } from "../interfaces/interface";

export const TODOLIST_EXAMPLE = "TODOLIST_EXAMPLE";

export const getLocalStorage = () => localStorage.getItem(TODOLIST_EXAMPLE);
export const setLocalStorage = (todos: TodosType<boolean>[]) =>
  localStorage.setItem(TODOLIST_EXAMPLE, JSON.stringify(todos));
