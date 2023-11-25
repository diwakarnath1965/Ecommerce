import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import "./App.css";
import Home from "./components/Home";
import {Toaster} from 'react-hot-toast'
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
