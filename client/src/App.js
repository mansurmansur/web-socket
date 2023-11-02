import{BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./screens/Login";
import Chat from "./screens/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
