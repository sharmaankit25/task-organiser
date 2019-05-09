export default (tasks, { isCompleted, dueDate }) => {
  return tasks.filter(task => {
    if (typeof dueDate === "string" && typeof isCompleted === "boolean") {
      return task.isCompleted === isCompleted && task.dueDate === dueDate;
    }
    if (typeof isCompleted === "boolean") {
      return task.isCompleted === isCompleted;
    }
    if (typeof dueDate === "string") {
      return task.dueDate === dueDate;
    }
    return true;
  });
};
