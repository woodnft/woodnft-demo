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
import { NetworkGraphWithToggle } from './components/NetworkGraph';
import ProjectPage from './components/ProjectPage';
import CardCapture from './components/CardCapture';
import SpecialPage, {SpecialPage02} from './components/Special';


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
        <Route path={`/network`} element={<NetworkGraphWithToggle />} />
        <Route path={`/project`} element={<ProjectPage />} />
        <Route path={`/special`} element={<SpecialPage />} />
        <Route path={`/special2`} element={<SpecialPage02 />} />

      </Routes>
    </Router>
  );
}


export default App;