export enum TabName {
  TODAY_TASKS = "Today's tasks",
  ALL_TASKS = "All tasks",
  COMPLETED_TASKS = "Completed tasks",
  UNCOMPLETED_TASKS = "Uncompleted tasks"
}

export type TabNameType = TabName.TODAY_TASKS | TabName.ALL_TASKS | TabName.COMPLETED_TASKS | TabName.UNCOMPLETED_TASKS;
