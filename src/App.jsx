import './App.css';
//import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home";
import Mint from "./components/Mint";
import View from "./components/View";
import MyPage from "./components/MyPage";
import Card from "./components/Card";
import CardDetailPage from "./components/CardDetailPage";
import CardSmall from "./components/CardSmall";
import PageRoyalty from './components/PageRoyalty';
import { RoyalityGraphMultiple } from './components/RoyalityGraph';
import UserInfo from './components/userInfo';
import NetworkGraph from './components/NetworkGraph';
import ProjectPage from './components/ProjectPage';
import CardCapture from './components/CardCapture';


function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/mint`} element={<Mint />} />
        <Route path={`/view`} element={<View />} />
        <Route path={`/mypage`} element={<MyPage />} />
        <Route path={`/Card`} element={<Card  />} />
        <Route path={`/CardSmall`} element={<CardSmall />} />
        <Route path={'/CardDetailPage/:id'} element={<CardDetailPage />} />
        <Route path={'/CardCapture/:id'} element={<CardCapture />} />
        <Route path={`/royalty`} element={<PageRoyalty />} />
        <Route path={`/royaltyAll`} element={<RoyalityGraphMultiple />} />
        <Route path={`/userinfo`} element={<UserInfo />} />
        <Route path={`/network`} element={<NetworkGraph />} />
        <Route path={`/project`} element={<ProjectPage />} />

      </Routes>
    </Router>
  );
}


export default App;