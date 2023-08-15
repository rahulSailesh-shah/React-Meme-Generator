import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ImageGallery from './components/ImageGallery';
import MemeGenerate from './components/MemeGenerate';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ImageGallery} />
        <Route path='/image/:imageId' exact component={MemeGenerate} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
