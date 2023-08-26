import { TodosType } from "../interfaces/interface";
import { TabName, TabNameType } from "../constants/tabName";

function sortByDate(a: TodosType, b: TodosType) {
  if (new Date(a.date) > new Date(b.date)) return -1;
  else if (new Date(a.date) === new Date(b.date)) return 0;
  else return 1;
}

function isInclude(text: string, search: string) {
  return text.toLowerCase().includes(search.toLowerCase());
}

function filterBySearch(todos: TodosType[], search: string): TodosType[] {
  if (search.length > 0) {
    return todos.filter((todo) => isInclude(todo.title, search) || isInclude(todo.description, search));
  } else return todos;
}

export function sortTodos(todos: TodosType[], tab: TabNameType, search: string): TodosType[] {
  if (tab === TabName.ALL_TASKS) return filterBySearch(todos, search).sort(sortByDate);
  else if (tab === TabName.TODAY_TASKS)
    return filterBySearch(todos, search).filter((todo) => todo.date === new Date().toISOString().slice(0, 10));
  else if (tab === TabName.COMPLETED_TASKS)
    return filterBySearch(todos, search)
      .filter((todo) => todo.completed)
      .sort(sortByDate);
  else if (tab === TabName.UNCOMPLETED_TASKS)
    return filterBySearch(todos, search)
      .filter((todo) => !todo.completed)
      .sort(sortByDate);
  else return todos;
}
