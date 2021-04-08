<template>
  <div class="payment">
    <BrandProcess
      calendarClass="active"
      firstLine="active"
      roomClass="active"
      secondLine="active"
      walletClass="active"
    />
    <div class="payment-wrapper">
      <div class="payment-credit">
        <BrandInput
          placeholder="1234 4321 1234 4321"
          class="payment-credit-number"
          :value="cardNumberValue"
          :readOnly="true"
        />
        <BrandInput
          placeholder="XXXXXXX XXXXXXXXX"
          class="payment-credit-name"
          :value="cardNameValue"
          :readOnly="true"
        />
        <BrandInput
          placeholder="00/00"
          class="payment-credit-date"
          :value="cardDateValue"
          :readOnly="true"
        />
        <img src="@/assets/credit-card.png" alt="credit-card" class="payment-credit-card" />
        <div class="payment-credit-info">
          <p class="payment-credit-info-title">Kredi Kartı Bilgileri</p>
          <BrandInput
            title="İsim Soyisim"
            placeholder="Kartınızın Üzerindeki İsmi Giriniz"
            class="card-name"
            @onChange="onCardName"
            :value="cardNameValue"
          />
          <BrandInput
            title="Kart Numarası"
            placeholder="Kartınızın Numarasını Giriniz"
            class="card-number"
            type="number"
            @onChange="onCardNumber"
            :value="cardNumberValue"
          />
          <div class="card-info">
            <div class="card-info-date">
              <h4 class="input-title">Son Kullanma Tarihi</h4>
              <div class="card-info-date-number">
                <BrandSelect
                  title="Kartın Son Kullanma Tarihi"
                  placeholder="Ay"
                  class="card-info-date-month"
                  :data="months"
                  @onSelect="onCardMonth"
                />
                <BrandSelect
                  placeholder="Yıl"
                  class="card-year"
                  :data="years"
                  @onSelect="onCardYear"
                />
              </div>
            </div>
            <BrandInput
              title="CVV"
              type="number"
              placeholder="CVV Giriniz"
              class="card-info-cvv"
              @onChange="onCardCvv"
            />
          </div>
        </div>
      </div>

      <div class="payment-summary">
        <h2 class="payment-summary-title">
          {{ selectedHotelName }}
          <span v-if="selectedHotel" class="hotel-name-city">({{ selectedHotel.city }})</span>
        </h2>
        <div class="payment-summary-detail">
          <div v-for="(item, index) in reservDetail" :key="index" class="reserv-item">
            <p class="reserv-item-title">{{ item.title }}</p>
            <p class="reserv-item-value">{{ item.value }}</p>
          </div>
        </div>
        <div class="payment-summary-code">
          <BrandInput
            placeholder="Kupon Kodu"
            class="card-number"
            type="text"
            @onChange="onCouponCode"
            :value="couponCode"
          />
          <button @click="getCouponCode">Kodu Kullan</button>
        </div>
        <div class="payment-summary-price">
          <div v-for="(item, index) in paymentDetail" :key="index" class="price-item">
            <p class="price-item-title">
              {{ item.title }}<span v-if="item.subTitle"> ({{ item.subTitle }})</span>
            </p>
            <p class="price-item-value">{{ item.value }}</p>
          </div>
          <h4 class="payment-summary-price-title">TOPLAM TUTAR</h4>
          <h2 class="payment-summary-price-value">{{ totalPrice }} TL</h2>
        </div>
      </div>
    </div>
    <div class="payment-submit">
      <button @click="onBack">&#60;&#60; Geri</button>
      <button @click="onFinish">Ödeme Yap ve Bitir</button>
    </div>
  </div>
</template>

<script>
import Reservations from '@/services/service.js';
import BrandProcess from '@/components/BrandProcess';
import BrandInput from '@/components/BrandInput';
import BrandSelect from '@/components/BrandSelect';

export default {
  data() {
    return {
      selectedHotel: {},
      selectedHotelName: '',
      entryDate: '',
      exitDate: '',
      totalPrice: 0,
      reservDetail: [
        { title: 'Giriş Tarihi:', value: localStorage.entryDate },
        {
          title: 'Çıkış Tarihi',
          value: localStorage.exitDate,
        },
        {
          title: 'Yetişkin:',
          value: localStorage.personValue,
        },
        {
          title: 'Çocuk:',
          value: localStorage.childValue,
        },
        {
          title: 'Oda Tipi:',
          value: localStorage.checkedRoom,
        },
        {
          title: 'Manzara:',
          value: localStorage.checkedView,
        },
      ],
      months: [
        { id: '01', value: '01' },
        { id: '02', value: '02' },
        { id: 3, value: '03' },
        { id: 4, value: '04' },
        { id: 5, value: '05' },
        { id: 6, value: '06' },
        { id: 7, value: '07' },
        { id: 8, value: '08' },
        { id: 9, value: '09' },
        { id: 10, value: '10' },
        { id: 11, value: '11' },
        { id: 12, value: '12' },
      ],
      years: [
        { id: 2021, value: 2021 },
        { id: 2022, value: 2022 },
        { id: 2023, value: 2023 },
        { id: 2024, value: 2024 },
        { id: 2025, value: 2025 },
        { id: 2026, value: 2026 },
        { id: 2027, value: 2027 },
        { id: 2028, value: 2028 },
        { id: 2029, value: 2029 },
        { id: 2031, value: 2031 },
        { id: 2032, value: 2032 },
        { id: 2033, value: 2033 },
        { id: 2034, value: 2034 },
        { id: 2035, value: 2035 },
        { id: 2036, value: 2036 },
        { id: 2037, value: 2037 },
        { id: 2038, value: 2038 },
        { id: 2039, value: 2039 },
        { id: 2040, value: 2040 },
      ],
      cardNameValue: '',
      cardNumberValue: '',
      cardMonthValue: '',
      cardYearValue: '',
      cardCvvValue: '',
      allCoupons: [],
      couponCode: '',
      couponDiscount: 0,
    };
  },
  computed: {
    cardDateValue() {
      if (this.cardMonthValue || this.cardYearValue) {
        return this.cardMonthValue + '/' + this.cardYearValue;
      } else {
        return '';
      }
    },
    paymentDetail() {
      let paymentDetail = [
        { title: 'Oda Fiyatı', value: localStorage.roomPrice + ' TL' },
        {
          title: 'Fiyata Etki Oranı',
          value: '% ' + localStorage.priceRate,
        },
        {
          title: 'Konaklama',
          subTitle: localStorage.differenceDate + ' Gün',
          value: localStorage.differenceDate * localStorage.roomPrice + ' TL',
        },
        {
          title: 'İndirim',
          subTitle: this.couponCode,
          value: (this.couponDiscount || '0') + ' TL',
        },
      ];
      return paymentDetail;
    },
  },
  components: {
    BrandProcess,
    BrandInput,
    BrandSelect,
  },
  methods: {
    onCardName(val) {
      this.cardNameValue = val;
    },
    onCardNumber(val) {
      this.cardNumberValue = val;
    },
    onCardMonth(val) {
      this.cardMonthValue = val;
    },
    onCardYear(val) {
      this.cardYearValue = val;
    },
    onCardCvv(val) {
      this.cardCvvValue = val;
    },
    onCouponCode(val) {
      this.couponCode = val;
    },
    calcPrice() {
      let totalPerson = Number(localStorage.personValue) + Number(localStorage.childValue);
      let priceRate = 0;
      let roomPrice = 0;

      this.selectedHotel.room_type.forEach((type) => {
        if (type.title == localStorage.checkedRoom) {
          roomPrice = type.price;
          localStorage.roomPrice = type.price;
        }
      });

      this.selectedHotel.room_scenic.forEach((scenic) => {
        if (scenic.title == localStorage.checkedView) {
          priceRate = scenic.price_rate;
          localStorage.priceRate = priceRate;
        }
      });

      this.totalPrice = Math.round(
        ((priceRate + 100) / 100) * roomPrice * totalPerson * Number(localStorage.differenceDate) -
          this.couponDiscount,
      );

      localStorage.totalPrice = this.totalPrice;
    },
    onFinish() {
      let reservation = {
        hotel_id: Number(this.selectedHotel.id),
        start_date: localStorage.entryDate,
        end_date: localStorage.exitDate,
        adult: Number(localStorage.personValue),
        child: Number(localStorage.childValue),
        room_type: Number(localStorage.roomType),
        room_scenic: Number(localStorage.roomScenic),
        price: Number(localStorage.totalPrice),
        coupon_code: this.couponCode,
        card_name: this.cardNameValue,
        card_number: this.cardNumberValue,
        card_date_month: this.cardMonthValue,
        card_date_year: this.cardYearValue,
        card_cvv: this.cardCvvValue,
      };

      if (
        this.selectedHotel.hotel_id &&
        this.cardNameValue &&
        this.cardNumberValue &&
        this.cardNumberValue.length == 16 &&
        this.cardMonthValue &&
        this.cardYearValue &&
        this.cardCvvValue &&
        this.cardCvvValue.length == 3
      ) {
        localStorage.couponCode = this.couponCode;
        localStorage.couponDiscount = this.couponDiscount;

        if (localStorage.reservationId) {
          Reservations.updateReservation(localStorage.reservationId, reservation).then((res) => {
            if (!res || !res.data) {
              return;
            }
          });

          this.$router.push('success');
        } else {
          Reservations.postReservation(reservation).then((res) => {
            if (!res || !res.data) {
              return;
            }

            localStorage.reservationId = res.data.id;
            this.$router.push('success');
          });
        }
      }
    },
    onBack() {
      this.$router.go(-1);
    },
    getCouponCodes() {
      Reservations.getCouponCodes().then((res) => {
        if (!res || !res.data) {
          return;
        }

        this.allCoupons = res.data;
      });
    },
    getCouponCode() {
      this.allCoupons.forEach((element) => {
        if (this.couponCode == element.code) {
          if (new Date() < new Date(element.expiration_at)) {
            this.couponDiscount = element.discount_ammount;
          }
        }
      });
      this.calcPrice();
    },
  },
  created() {
    this.selectedHotel = JSON.parse(localStorage.selectedHotel);
    this.selectedHotelName = localStorage.selectedHotelName;
    this.calcPrice();
    this.getCouponCodes();
  },
};
</script>

<style lang="scss">
.payment {
  &-credit {
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    position: relative;

    &-name,
    &-number,
    &-date {
      position: absolute;
    }

    &-number {
      left: 35px;
      top: 115px;
      width: 285px;
    }

    &-name {
      left: 35px;
      top: 160px;
      width: 172px;
    }

    &-date {
      top: 160px;
      width: 75px;
      left: 245px;
    }

    &-card {
      max-width: 333px;
      width: 100%;
      margin-bottom: 30px;
    }

    &-info {
      border: 1px solid #000;
      padding: 20px;
      position: relative;

      .card-info {
        display: flex;
        justify-content: space-between;

        &-date {
          width: 60%;

          &-number {
            display: flex;

            .select {
              margin-bottom: 0;
            }
          }

          &-month {
            margin-right: 10px;
          }
        }

        &-cvv {
          width: 35%;
        }
      }

      &-title {
        position: absolute;
        background-color: #ffffff;
        top: -32px;
        padding: 0 5px;
        font-weight: bold;
        font-size: 20px;
        left: 15px;
      }

      .card-name,
      .card-number {
        margin-bottom: 20px;
      }
    }
  }

  &-summary {
    background-color: #e6e6e6;
    border-radius: 5px;
    padding: 10px;

    &-title {
      display: flex;
      align-items: center;
    }

    &-detail {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 20px;

      .reserv-item {
        background-color: #ffffff;
        border-radius: 5px;
        text-align: center;

        &-title {
          font-weight: bold;
        }
      }
    }

    &-code {
      padding: 10px;
      background-color: #ffffff;
      border-radius: 5px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
    }

    &-price {
      background-color: #ffffff;
      border-radius: 5px;
      padding: 10px;
      text-align: center;

      .price-item {
        display: flex;
        justify-content: space-between;

        &-title {
          font-weight: bold;

          span {
            font-weight: normal;
          }
        }

        &:nth-child(4) {
          border-bottom: 2px solid #e6e6e6;
        }
      }
    }
  }

  &-submit {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #e6e6e6;
    max-width: 1000px;
    margin: 20px auto;
    border-radius: 5px;
    padding: 30px 10px;

    button {
      border: none;
      background-color: #031e30;
      color: #ffffff;
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;
    }
  }
}
@media screen and (min-width: 1024px) {
  .payment {
    &-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &-credit {
      width: 55%;
      padding: 20px;
      margin-bottom: 0;
      margin-right: 20px;

      &-name,
      &-number,
      &-date {
        left: 57px;
      }

      &-number {
        top: 195px;
        width: 407px;
      }

      &-name {
        top: 243px;
        width: 172px;
      }

      &-date {
        top: 290px;
        width: 75px;
      }

      &-card {
        max-width: unset;
      }
    }

    &-summary {
      width: 40%;
      padding: 20px;
    }

    &-submit {
      text-align: end;
      border-radius: 5px;
      padding: 40px 100px;
    }
  }
}
</style>
