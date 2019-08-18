export default (tasks, { isCompleted, dueDate, groupSlug,label_id }) => {
  console.log();
  return tasks.filter(task => {
    if (
      typeof isCompleted === "boolean" &&
      typeof groupSlug === "string" && 
      typeof label_id === "number"
    ) {
      return (
        task.isCompleted === isCompleted &&
        task.groupSlug === groupSlug && 
        task.label_id === label_id
      );
    }

    if (
      typeof dueDate === "string" &&
      typeof isCompleted === "boolean" &&
      typeof groupSlug === "string" && 
      typeof label_id === "number"
    ) {
      return (
        task.isCompleted === isCompleted &&
        task.dueDate === dueDate &&
        task.groupSlug === groupSlug && 
        task.label_id === label_id
      );
    }

    if (
      typeof dueDate === "string" &&
      typeof isCompleted === "boolean" &&
      typeof groupSlug === "string"
    ) {
      return (
        task.isCompleted === isCompleted &&
        task.dueDate === dueDate &&
        task.groupSlug === groupSlug
      );
    }

    if (typeof dueDate === "string" && typeof isCompleted === "boolean") {
      return task.isCompleted === isCompleted && task.dueDate === dueDate;
    }

    if (typeof isCompleted === "boolean" && typeof groupSlug === "string") {
      return task.isCompleted === isCompleted && task.groupSlug === groupSlug;
    }

    if (typeof isCompleted === "boolean") {
      return task.isCompleted === isCompleted;
    }
    if (typeof dueDate === "string") {
      return task.dueDate === dueDate;
    }

    if (typeof groupSlug === "string") {
      return task.groupSlug === groupSlug;
    }
    return true;
  });
};
