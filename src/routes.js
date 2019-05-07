import Dashboard from "./components/pages/Dashboard";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import Login from "./components/pages/Login";
import Auth from "./components/hoc/Auth";

export default [
  { path: "/", component: Auth(Dashboard), exact: true },
  { path: "/create-task", component: Auth(CreateTodo) },
  { path: "/tasks", component: Auth(TodoList) },
  { path: "/login", component: Login }
];
