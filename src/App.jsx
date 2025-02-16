import Shopping from "./Shopping";
import Navbar from "./Navbar";
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shopping/>}/>
        <Route path="/cart" element={<Cart/>}/> 
      </Routes>
    </div>
  );
}

export default App;
