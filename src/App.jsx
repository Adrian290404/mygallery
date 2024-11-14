import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SearchPage } from './pages/searchPage';
import { MyPhotosPage } from './pages/myPhotosPage';
import { Provider } from'react-redux';
import { store } from './redux/store';
import { LayoutComponent } from './components/layoutComponent';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutComponent />}>
            <Route path="" element={<SearchPage />}></Route>
            <Route path="/my-photos" element={<MyPhotosPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App