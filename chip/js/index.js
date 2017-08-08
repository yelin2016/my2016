import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configStore from './configStore';
import rootRoute from './routes';
import util from './utils';

// 创建store
var store = configStore();
// 同步hashHistory
var history = syncHistoryWithStore(hashHistory, store);
// 
window.Util = util;

render(
	<Provider store={store}>
		<Router history={history} routes={rootRoute} />
	</Provider>,
	document.getElementById('reactapp')
);
