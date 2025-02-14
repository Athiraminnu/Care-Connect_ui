import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componenets/Login";
import Registration from "./componenets/Registration";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </Router>
    );
}

export default App;
