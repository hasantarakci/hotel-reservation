import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedHotelName: null,
    selectedHotel: null,
  },
  getters: {
    getSelectedHotel(state) {
      return state.selectedHotel;
    },
    getSelectedHotelName(state) {
      return state.selectedHotelName;
    },
  },
  mutations: {
    ['SET_SELECTED_HOTEL'](state, selectedHotel) {
      state.selectedHotel = selectedHotel;
    },
    ['SET_SELECTED_HOTEL_NAME'](state, selectedHotelName) {
      state.selectedHotelName = selectedHotelName;
    },
  },
  actions: {
    setSelectedHotel({ commit }, selectedHotel) {
      commit('SET_SELECTED_HOTEL', selectedHotel);
    },
    setSelectedHotelName({ commit }, selectedHotelName) {
      commit('SET_SELECTED_HOTEL_NAME', selectedHotelName);
    },
  },
});
