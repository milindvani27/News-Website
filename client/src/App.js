import React from "react";

// import { BrowserRouter as Router, Routes, Route, BrowserRouter, Switch, createBrowserRouter, RouterProvider } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Homes from "./Pages/Homes";
import User from "./Users/User";
import UserData from "./Users/UserData";
import { CheckAuth } from "./CheckAuth";


const router = createBrowserRouter([
  {path: "/", element: <Homes/>}  ,
  {path: "/general", element : <Homes cat="general" />},
  {path: "/business", element: <Homes cat="business" />},
  {path: "/health", element: <Homes cat="health" />},
  {path: "/science", element: <Homes cat="science" />},
  {path: "/sports", element: <Homes cat="sports" />},
  {path: "/technology", element: <Homes cat="technology" /> },
  {path: "/register", element: <Register/>},
  {path: "/login", element: <Login/>},
  {path: "/user", element: <User/> ,loader:CheckAuth, children: [{
    path: "/user/:id", element: <User/>
  }] },

  {path: "/UserData", element: <UserData/>}
])

function App (){
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}
export default App;



// const App = () => {
//   return (
//     <Routes>
//           {}
//           <Route path = "/" element={<Homes/>}/>
//           <Route exact path = "/general" element={<Homes cat="general" />}/>
//           <Route path = "/business" element={<Homes cat="business" />}/>
//           <Route path = "/health" element={<Homes cat="health" />}/>
//           <Route path = "/science" element={<Homes cat="science" />}/>
//           <Route path = "/sports" element={<Homes cat="sports" />}/>
//           <Route path = "/technology" element={<Homes cat="technology" /> }/>
//           <Route exact path = "/register" element={<Register/>}/>
//           <Route path = "/login" element={<Login/>}/>
//           <Route path = "/user" element={<User/>}/>
//           <Route path = "/UserData" element={<UserData/>}/>
//     </Routes>
//   );
// };
// export default App;






