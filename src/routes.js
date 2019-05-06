import Dashboard from "./components/pages/Dashboard"
import CreateTodo from "./components/CreateTodo"
import TodoList from "./components/TodoList"


export default [
    {path:"/",component:Dashboard,exact:true},
    {path:"/create-task", component:CreateTodo},
    {path:"/tasks", component:TodoList}
]
