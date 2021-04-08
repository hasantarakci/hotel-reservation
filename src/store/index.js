import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedHotelName: null,
    selectedHotel: null,
    hotelList: null,
    allHotelDetails: null,
  },
  getters: {
    getSelectedHotel(state) {
      return state.selectedHotel;
    },
    getSelectedHotelName(state) {
      return state.selectedHotelName;
    },
    getHotelList(state) {
      return state.hotelList;
    },
    getAllHotelDetails(state) {
      return state.allHotelDetails;
    },
  },
  mutations: {
    ['SET_SELECTED_HOTEL'](state, selectedHotel) {
      state.selectedHotel = selectedHotel;
    },
    ['SET_SELECTED_HOTEL_NAME'](state, selectedHotelName) {
      state.selectedHotelName = selectedHotelName;
    },
    ['SET_HOTEL_LIST'](state, hotelList) {
      state.hotelList = hotelList;
    },
    ['SET_ALL_HOTEL_DETAILS'](state, allHotelDetails) {
      state.allHotelDetails = allHotelDetails;
    },
  },
  actions: {
    setSelectedHotel({ commit }, selectedHotel) {
      commit('SET_SELECTED_HOTEL', selectedHotel);
    },
    setSelectedHotelName({ commit }, selectedHotelName) {
      commit('SET_SELECTED_HOTEL_NAME', selectedHotelName);
    },
    setHotelList({ commit }, hotelList) {
      commit('SET_HOTEL_LIST', hotelList);
    },
    setAllHotelDetails({ commit }, allHotelDetails) {
      commit('SET_ALL_HOTEL_DETAILS', allHotelDetails);
    },
  },
});
