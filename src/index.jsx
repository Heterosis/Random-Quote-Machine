import React from 'react';
import ReactDOM from 'react-dom';
import 'css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'compoents/App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

ReactDOM.render(<App />, document.getElementById('app'));
