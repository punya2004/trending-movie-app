import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/Footernav'
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import Trending from './Pages/Trending/Trending';

function App() {
 
  return (
    <BrowserRouter>
    <Header/>
    <div className="App">
      <Container>
        <switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
        </switch>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
