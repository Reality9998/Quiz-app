import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Pages/Login";
import Index from "./Pages/Index";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
