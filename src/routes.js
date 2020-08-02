import Dashboard from "./components/pages/Dashboard";
import Conference from "./components/pages/Conference";
import CreateTodo from "./components/CreateTodo";
import Login from "./components/pages/Login";
import Groups from "./components/pages/Groups"
import GroupDetails from "./components/pages/GroupDetails";
import Members from "./components/pages/Members"
import Auth from "./components/hoc/Auth";
import Guest from "./components/hoc/Guest";

export default [
  { path: "/", component: Auth(Dashboard), exact: true },
  { path: "/conference/:slug/:id", component: Auth(Conference), exact: true },
  { path: "/create-task", component: Auth(CreateTodo) },
  { path: "/groups", component: Auth(Groups) ,exact: true},
  { path: "/groups/:slug", component: Auth(GroupDetails)},
  { path: "/members", component: Auth(Members) },
  { path: "/login", component: Guest(Login) }
];
