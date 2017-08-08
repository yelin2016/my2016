export const NEGATIVE_TREND_DATA = 'NEGATIVE_TREND_DATA';

export function getTrendData () {
	return function (dispatch) {
		$.ajax({
			"url": ApiDomain + "/opinion/rest/negative/getNegativeTrend",
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: NEGATIVE_TREND_DATA,
				status: re.status,
				msg: re.msg,
				data: re.data
			});
		})
		.fail(function() {
			dispatch({
				type: NEGATIVE_TREND_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}