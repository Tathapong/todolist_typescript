import React from "react";

export type SetStateType<type = boolean> = React.Dispatch<React.SetStateAction<type>>;

export interface TodosType<completed = boolean> {
  id: string;
  title: string;
  date: string;
  description: string;
  completed: completed;
}

export interface ChildrenPropsType {
  children: React.ReactNode;
}
