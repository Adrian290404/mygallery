import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from './pages/searchPage';
import { MyPhotosPage } from './pages/myPhotosPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
        <Route path="/my-photos" element={<MyPhotosPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App