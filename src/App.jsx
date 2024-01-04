import React from 'react';

import Header from './Header.jsx';
import { ActivityContainer } from './containers/ActivityContainer.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <ActivityContainer />
    </div>
  );
};

export default App;
