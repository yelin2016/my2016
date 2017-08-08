export const SPECIAL_ACTIVITY_QUERY = 'SPECIAL_ACTIVITY_QUERY';
export const SPECIAL_ACTIVITY_PAPER = 'SPECIAL_ACTIVITY_PAPER';
export const FETCH_SPECIAL_ACTIVITY_DATA = 'FETCH_SPECIAL_ACTIVITY_DATA';
export function list_query(condition,refresh) {
	return {
		type: SPECIAL_ACTIVITY_QUERY,
		condition: condition
	};
};
export function list_paper(paper) {
	return {
		type: SPECIAL_ACTIVITY_PAPER,
		paper: paper
	};
};
export function getListData (condition,currentpaper) {
	return function (dispatch) {
		dispatch({
			type: FETCH_SPECIAL_ACTIVITY_DATA,
			status: 0,
		});
		$.ajax({
			"url":"./json/special_activity.json?t=" + new Date().getTime(),
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: FETCH_SPECIAL_ACTIVITY_DATA,
				status: re.status,
				msg: re.msg,
				data: re.data,
				
			});
		})
		.fail(function() {
			dispatch({
				type: FETCH_SPECIAL_ACTIVITY_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}