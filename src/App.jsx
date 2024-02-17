import './App.css';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Card from "./components/Card";
import CardTestPage from "./components/CardTestPage";
import CardDetailPage from "./components/CardDetailPage";
import CardSmall from "./components/CardSmall";
import CSV from "./components/CSV";
import GoogleSheet from "./components/GoogleSheet";
import IpfsTest from "./components/IpfsTest";


function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ""}>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/Page1`} element={<Page1 />} />
        <Route path={`/Page2`} element={<Page2 />} />
        <Route path={`/Page3`} element={<Page3 />} />
        <Route path={`/Card`} element={<Card  />} />
        <Route path={`/CardSmall`} element={<CardSmall />} />
        <Route path={'/CardTestPage'} element={<CardTestPage />} />
        <Route path={'/CardDetailPage/:id'} element={<CardDetailPage />} />
        <Route path={`/CSV`} element={<CSV />} />
        <Route path={`/GoogleSheet`} element={<GoogleSheet />} />
        <Route path={`/IpfsTest`} element={<IpfsTest />} />



      </Routes>
    </BrowserRouter>

  );
}

export default App;
