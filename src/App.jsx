import AllEditor from "./components/AllEditor";
import AnimatedLanding from "./components/AnimatedLandingPage";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const route = createBrowserRouter([
    {
      path: 'home', index: true, element: <AnimatedLanding/>
    },
    {
      path: 'signup', element: <Login/>
    },
    {
      path: 'editor', element: <AllEditor/>
    }
])

export default function App() {
  
  return (
    <>
      {/* <AllEditor/> */}
      <RouterProvider router={route}/>
    </>
  );
}
