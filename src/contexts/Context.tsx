import { createContext, useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { TabName, TabNameType } from "../constants/tabName";

import { SetStateType, TodosType, ChildrenPropsType } from "../interfaces/interface";
import { getLocalStorage, setLocalStorage } from "../utilities/localStorage";

const todosInitial = [
  {
    id: uuidv4(),
    title: "Example : Study",
    date: new Date().toISOString().slice(0, 10),
    description: "Study on school on holiday",
    completed: false
  }
];

interface ContextPropsType {
  darkMode: boolean;
  setDarkMode: SetStateType<boolean>;

  tab: TabNameType;
  setTab: SetStateType<TabNameType>;

  search: string;
  setSearch: SetStateType<string>;

  todos: TodosType<boolean>[];
  setTodos: SetStateType<TodosType<boolean>[]>;
}

export const Context = createContext<ContextPropsType | null>(null);

function ContextProvider({ children }: ChildrenPropsType) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [tab, setTab] = useState<TabNameType>(TabName.ALL_TASKS);
  const [search, setSearch] = useState<string>("");
  const [todos, setTodos] = useState<TodosType<boolean>[]>([]);

  useEffect(() => {
    const todosList = getLocalStorage();
    if (todosList) {
      setTodos(JSON.parse(todosList));
    } else {
      setLocalStorage(todosInitial);
      setTodos(todosInitial);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        tab,
        setTab,
        darkMode,
        setDarkMode,
        search,
        setSearch,
        todos,
        setTodos
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
