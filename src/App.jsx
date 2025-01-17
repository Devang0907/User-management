import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing';
import NoPage from './Pages/NoPage';
import AddForm from './Pages/AddForm';
import UpdateForm from './Pages/UpdateForm'

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/add" element={<AddForm/>} />
        <Route path="/update/:id" element={<UpdateForm/>} />
        <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App