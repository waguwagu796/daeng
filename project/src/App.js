import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Destinations from "./components/Destinations";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from './components/ForgotPassword';
import Weather from './components/Weather';
import Community from "./components/Community";
import Map from "./components/Map";
import RegionDetail from "./components/RegionDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/community" element={<Community />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/map" element={<Map />} />
        <Route path="/region/:regionName" element={<RegionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/find-password" element={<ForgotPassword />} />
        <Route path="*" element={<h1 align="center" style={{ color: 'red' }}>404 - 페이지를 찾을 수 없습니다</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;