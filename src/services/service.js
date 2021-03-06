import axios from 'axios';

export let HttpService = axios.create();

class Reservations {
  getHotelList() {
    return HttpService.get('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels');
  }

  getAllHotelDetails() {
    return HttpService.get('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details');
  }

  getCouponCodes() {
    return HttpService.get('https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons');
  }

  getCouponCode(CODE) {
    return HttpService.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=${CODE}`);
  }

  getReservations() {
    return HttpService.get('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings');
  }

  getReservation(ID) {
    return HttpService.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${ID}`);
  }

  postReservation(reservation) {
    return HttpService.post(
      'https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings',
      reservation,
    );
  }

  updateReservation(ID, reservation) {
    return HttpService.put(
      `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${ID}`,
      reservation,
    );
  }

  deleteReservation(ID) {
    return HttpService.delete(
      `https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${ID}`,
    );
  }
}

export default new Reservations();
