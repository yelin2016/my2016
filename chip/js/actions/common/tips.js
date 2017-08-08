export const SHOW_TIPS = 'SHOW_TIPS';
export const HIDE_TIPS = 'HIDE_TIPS';

/**
 * 显示操作提示框
 * @param  {[type]} text         提示框中显示的文本内容
 * @param  {[type]} okAction     点击确定按钮时需要分配的事件,不需要传null
 * @param  {[type]} cancelAction 点击取消按钮时需要分配的事件
 * @param  {[type]} pureTip      纯提示，只显示文本和确定按钮
 * @return {[type]}              [description]
 */
/**
 * [showTips description]
 * @param  {[type]} text         [description]
 * @param  {[type]} okAction     [description]
 * @param  {[type]} cancelAction [description]
 * @param  {[type]} pureTip      [description]
 * @return {[type]}              [description]
 */
export function showTips (text, okAction, cancelAction, pureTip) {
	return {
		type: SHOW_TIPS,
		text: text,
		ok: okAction,
		cancel: cancelAction,
		pureTip: pureTip || false
	};
}

/**
 * 隐藏操作提示框
 * @param  {[type]} afterAction 提示框隐藏后分配的事件。在tips组件中调用时，会传入showTips时设置的action。
 * @return {[type]}             [description]
 */
export function hideTips (afterAction) {
	return function (dispatch) {
		dispatch ({
			type: HIDE_TIPS
		});
		if (afterAction) {
			dispatch(afterAction);
		}
	}
}