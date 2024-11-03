// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
const BuildForm = lazy(() => import('./components/BuildForm/BuildForm'));
const TableComponent = lazy(() => import('./components/TableComponent/TableComponent'));
const FormComponent = lazy(() => import('./components/FormComponent/FormComponent'));
import "./App.css";

function App() {

  return (
    <Suspense fallback={<div style={{color:"white"}}>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/tableComponent" element={<TableComponent/>} />
          <Route path="/buildForm" element={<BuildForm />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
