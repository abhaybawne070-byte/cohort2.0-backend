import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import "./features/shared/globel.scss"

function App() {


  return (
    <RouterProvider router={router}/>
  )
}

export default App
