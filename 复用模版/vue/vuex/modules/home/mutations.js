import { HOME_BTN_ID,HOME_SIGN } from './mutation-type';
const mutations = {
	[HOME_BTN_ID](state,data){
		state.home_btn_id = data;
	},
	[HOME_SIGN](state,data){
		state.home_sign = data;
	}
}


export default mutations;