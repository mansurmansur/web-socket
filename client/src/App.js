import{BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/">
    //       <Route index element={<Home />} />
    //       <Route path="login" element={<Login />} />
    //       <Route path="register" element={<Register />} />
    //     </Route>
    //   </Routes>
    // </Router>
    <Login />
  );
}

export default App;
