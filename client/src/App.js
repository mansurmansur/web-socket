import{BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";


function App() {
  const userID = useSelector((state)=> state.user.id);

  // const ProtectedRoute = ({children}) => {
  //   if(!userID){
  //     return <Navigate to="/login" replace />;
  //   }

  //   return children;
  // }
  return (
    <Router>
      <Routes>
        <Route path="/">
          {/* <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } /> */}
          <Route index element={userID ? (<Home />) : (<Navigate to="/login" replace />)} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
