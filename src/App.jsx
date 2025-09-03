import AllEditor from "./components/AllEditor";
import AllWritings from "./components/AllWritings";
import AnimatedLanding from "./components/AnimatedLandingPage";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const route = createBrowserRouter([
    {
      index: true, element: <AnimatedLanding/>
    },
    {
      path: 'signup', element: <Login/>
    },
    {
      path: 'editor/:id', element: <AllEditor/>
    },
    {
      path: 'allwritings', element: <AllWritings/>
    },
])

export default function App() {
  
  return (
    <>
      <RouterProvider router={route}/>
    </>
  );
}
