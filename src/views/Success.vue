<template>
  <div class="success">
    <div class="success-top">
      <img src="https://image.flaticon.com/icons/png/128/1286/1286965.png" alt="" />
      <h4>Rezervasyon kaydınız alınmıştır.</h4>
      <p>
        Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni
        rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.
      </p>
      <div class="success-top-buttons">
        <button @click="newReserv">Yeni Rezervasyon Yap</button>
        <button @click="updateReserv">Rezervasyonu Güncelle</button>
        <button @click="openModal">Rezervasyonu İptal Et</button>
      </div>
    </div>

    <div class="success-summary">
      <h2 class="success-summary-title">
        {{ selectedHotelName }}
        <span v-if="selectedHotel" class="hotel-name-city">({{ selectedHotel.city }})</span>
      </h2>
      <div class="success-summary-detail">
        <div v-for="(item, index) in reservDetail" :key="index" class="reserv-item">
          <p class="reserv-item-title">{{ item.title }}</p>
          <p class="reserv-item-value">{{ item.value }}</p>
        </div>
      </div>
      <div class="success-summary-price">
        <div v-for="(item, index) in paymentDetail" :key="index" class="price-item">
          <p class="price-item-title">
            {{ item.title }}<span v-if="item.subTitle"> ({{ item.subTitle }})</span>
          </p>
          <p class="price-item-value">{{ item.value }}</p>
        </div>
        <h4 class="success-summary-price-title">TOPLAM TUTAR</h4>
        <h2 class="success-summary-price-value">{{ totalPrice }} TL</h2>
      </div>
    </div>

    <div class="success-modal" id="successModal">
      <div class="success-modal-body">
        <p>Rezervasyonunuzu iptal etmek istediğinize emin misiniz?</p>
        <div class="success-modal-body-buttons">
          <button @click="deleteReserv">Evet</button>
          <button @click="closeModal">Hayır</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Reservations from '@/services/service.js';

export default {
  data() {
    return {
      selectedHotel: {},
      selectedHotelName: '',
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
      totalPrice: localStorage.totalPrice,
    };
  },
  computed: {
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
          subTitle: localStorage.couponCode,
          value: (localStorage.couponDiscount || '0') + ' TL',
        },
      ];
      return paymentDetail;
    },
  },
  components: {},
  methods: {
    newReserv() {
      localStorage.clear();
      this.$router.push('/');
    },
    updateReserv() {
      this.$router.push('/');
    },
    deleteReserv() {
      Reservations.deleteReservation(localStorage.reservationId).then((res) => {
        if (!res || !res.data) {
          return;
        }
      });

      document.getElementById('successModal').style.display = 'none';
      document.body.style.overflow = 'auto';
      localStorage.clear();
      this.$router.push('/');
    },
    closeModal() {
      document.getElementById('successModal').style.display = 'none';
      document.body.style.overflow = 'auto';
    },
    openModal() {
      document.getElementById('successModal').style.display = 'block';
      document.body.style.overflow = 'hidden';
    },
  },
  created() {
    this.selectedHotel = JSON.parse(localStorage.selectedHotel);
    this.selectedHotelName = localStorage.selectedHotelName;
  },
};
</script>

<style lang="scss">
.success {
  &-top {
    text-align: center;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;

    &-buttons {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: 70%;
      margin-left: auto;
      margin-right: auto;

      button {
        margin-bottom: 10px;
      }
    }
  }

  &-summary {
    background-color: #e6e6e6;
    border-radius: 5px;
    padding: 10px;

    &-detail {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 20px;
      margin-bottom: 20px;

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

  &-modal {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: 999;
    display: none;

    &-body {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      padding: 30px;
      text-align: center;
      background-color: white;
      box-sizing: border-box;
      border-radius: 5px;

      &-buttons {
        display: flex;
        justify-content: space-around;

        button {
          width: 100px;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .success {
    &-top {
      text-align: center;
      padding: 40px 200px;

      &-buttons {
        flex-direction: row;
        justify-content: space-between;
        width: unset;

        button {
          margin-bottom: 0;
        }
      }
    }

    &-summary {
      padding: 20px;

      &-price {
        padding: 20px;
      }
    }
  }
}
</style>
