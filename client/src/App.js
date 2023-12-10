import{BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { useSelector } from "react-redux";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

function App() {
  const userID = useSelector((state)=> state.user.userID)

  const ProtectedRoute = ({userID}) => {
    if(!userID){
      return <Navigate to="/login" replace />;
    }
  }
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute userID={userID}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
