import { combineReducers } from 'redux';
import sideMenu from './sideMenuReducer';
import tips from './tipsReducer';
// import Constants from '../../constants/Constants';

// var initialState = {
// 	"menuData": Constants.MENUDATA,
// 	"curPath": "",
// 	"curActive": ""
// };

var common = combineReducers({
	sideMenu,
	tips
});

export default common;