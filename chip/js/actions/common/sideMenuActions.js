export const SET_CUR_PATH = 'SET_CUR_PATH';
export const SET_CUR_ACTIVE = 'SET_CUR_ACTIVE';
export const SET_CUR_PATH_ACTIVE = 'SET_CUR_PATH_ACTIVE';

export function setCurPath (path) {
	return {
		type: SET_CUR_PATH,
		path: path
	};
}

export function setCurActive (active) {
	return {
		type: SET_CUR_ACTIVE,
		active: active
	};
}

export function setCurPathActive (path, active) {
	return {
		type: SET_CUR_PATH_ACTIVE,
		path: path,
		active: active
	};
}