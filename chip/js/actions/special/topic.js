export const SPECIAL_TOPIC_QUERY = 'SPECIAL_TOPIC_QUERY';
export const SPECIAL_TOPIC_PAPER = 'SPECIAL_TOPIC_PAPER';
export const FETCH_SPECIAL_TOPIC_DATA = 'FETCH_SPECIAL_TOPIC_DATA';
export function list_query(condition,refresh) {
	return {
		type: SPECIAL_TOPIC_QUERY,
		condition: condition
	};
};
export function list_paper(paper) {
	return {
		type: SPECIAL_TOPIC_PAPER,
		paper: paper
	};
};
export function getListData (condition,currentpaper) {
	return function (dispatch) {
		dispatch({
			type: FETCH_SPECIAL_TOPIC_DATA,
			status: 0,
		});
		$.ajax({
			"url":"./json/special_topic.json?t=" + new Date().getTime(),
			"type": "get",
			data:{
				objectContent:condition.objectContent,
				warnStarttime:condition.warnStarttime,
				warnEndtime:condition.warnEndtime,
			}
		})
		.done(function(re) {
			dispatch({
				type: FETCH_SPECIAL_TOPIC_DATA,
				status: re.status,
				msg:re.msg,
				data: re.data,
				pageCount:re.pageCount
			});
		})
		.fail(function() {
			dispatch({
				type: FETCH_SPECIAL_TOPIC_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}