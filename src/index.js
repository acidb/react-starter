import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* import mobiscroll css */
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
