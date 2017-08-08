export const NEGATIVE_DIST_DATA = 'NEGATIVE_DIST_DATA';

export function getDistData () {
	return function (dispatch) {
		$.ajax({
			"url": ApiDomain + "/opinion/rest/negative/getNegativeDistribution",
			"type": "get"
		})
		.done(function(re) {
			dispatch({
				type: NEGATIVE_DIST_DATA,
				status: re.status,
				msg: re.msg,
				data: re.data
			});
		})
		.fail(function() {
			dispatch({
				type: NEGATIVE_DIST_DATA,
				status: 1,
				msg: 'error'
			});
		});
	};
}