<template>
  <div class="hotel">
    <BrandProcess calendarClass="active" firstLine="active" roomClass="active" />
    <div class="hotel-background">
      <div class="hotel-name">
        <h2 class="hotel-name-title">
          {{ selectedHotelName }}
          <span v-if="selectedHotel" class="hotel-name-city">({{ selectedHotel.city }})</span>
        </h2>
      </div>
      <div class="hotel-calendar">
        <p class="hotel-calendar-title">
          Giriş Tarihi: <span class="hotel-calendar-content">{{ entryDate }}</span>
        </p>
        <p class="hotel-calendar-title">
          Çıkış Tarihi: <span class="hotel-calendar-content">{{ exitDate }}</span>
        </p>
        <p class="hotel-calendar-title">
          Yetişkin: <span class="hotel-calendar-content">{{ personValue }}</span>
        </p>
        <p class="hotel-calendar-title">
          Çocuk: <span class="hotel-calendar-content">{{ childValue }}</span>
        </p>
      </div>
    </div>
    <BrandViews
      title="Oda Tipi Seçimi"
      name="rooms"
      :data="selectedHotel.room_type"
      :person="personValue"
      :child="childValue"
      :days="differenceDate"
      :amount="amount"
    />
    <BrandViews title="Manzara Seçimi" name="views" :data="selectedHotel.room_scenic" />
    <div class="hotel-submit">
      <button @click="onBack">&#60;&#60; Geri</button>
      <button @click="onSave">Kaydet ve Devam Et</button>
    </div>
  </div>
</template>

<script>
import BrandProcess from '@/components/BrandProcess';
import BrandViews from '@/components/BrandViews';

export default {
  data() {
    return {
      selectedHotel: {},
      selectedHotelName: '',
      entryDate: localStorage.entryDate,
      exitDate: localStorage.exitDate,
      differenceDate: '',
      amount: '5',
      personValue: localStorage.personValue,
      childValue: localStorage.childValue,
      checkedRoom: '',
      checkedView: '',
    };
  },
  components: {
    BrandProcess,
    BrandViews,
  },
  methods: {
    onSave() {
      this.checkRadioButtons();

      if (!this.checkedRoom || !this.checkedView) {
        alert('Lütfen oda ve manzara seçimi yapınız');
      } else {
        this.calcPrice();
        this.$router.push('payment');
      }
    },
    onBack() {
      this.$router.go(-1);
    },
    checkRadioButtons() {
      const roomsRadio = document.querySelectorAll('input[name="rooms"]');
      const viewsRadio = document.querySelectorAll('input[name="views"]');

      for (const rb of roomsRadio) {
        if (rb.checked) {
          this.checkedRoom = rb.value;
          localStorage.checkedRoom = rb.value;
          this.selectedHotel.room_type.forEach((x) => {
            if (x.title == rb.value) {
              localStorage.roomType = x.id;
            }
          });
          break;
        }
      }

      for (const rb of viewsRadio) {
        if (rb.checked) {
          this.checkedView = rb.value;
          localStorage.checkedView = rb.value;
          this.selectedHotel.room_scenic.forEach((y) => {
            if (y.title == rb.value) {
              localStorage.roomScenic = y.id;
            }
          });
          break;
        }
      }
    },
    calcPrice() {
      let totalPerson = Number(this.personValue) + Number(this.childValue);
      let priceRate = 0;
      let roomPrice = 0;
      let totalPrice = 0;

      this.selectedHotel.room_type.forEach((type) => {
        if (type.title == this.checkedRoom) {
          roomPrice = type.price;
          localStorage.roomPrice = type.price;
        }
      });

      this.selectedHotel.room_scenic.forEach((scenic) => {
        if (scenic.title == this.checkedView) {
          priceRate = scenic.price_rate;
          localStorage.priceRate = priceRate;
        }
      });

      totalPrice = Math.round(
        ((priceRate + 100) / 100) * roomPrice * totalPerson * this.differenceDate,
      );

      localStorage.totalPrice = totalPrice;
    },
    calcDifferenceDays() {
      if (this.entryDate && this.exitDate) {
        let date1 = new Date(this.entryDate);
        let date2 = new Date(this.exitDate);
        const diffTime = Math.abs(date2 - date1);
        this.differenceDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        localStorage.differenceDate = this.differenceDate;
      }
    },
  },
  created() {
    this.selectedHotel =
      this.$store.getters.getSelectedHotel || JSON.parse(localStorage.selectedHotel);
    this.selectedHotelName =
      this.$store.getters.getSelectedHotelName || localStorage.selectedHotelName;
    this.calcDifferenceDays();
  },
};
</script>

<style lang="scss">
.hotel {
  &-background {
    background-color: #e6e6e6;
    border-radius: 5px;
    padding: 20px 10px;
    max-width: 1000px;
    margin: auto;
  }

  &-name {
    &-title {
      display: flex;
      align-items: center;
      margin-top: 0;
    }

    &-city {
      margin-left: 5px;
      font-size: 16px;
      font-weight: normal;
    }
  }

  &-calendar {
    &-title {
      font-weight: bold;
      margin: 0;
      padding: 5px 0;
    }

    &-content {
      font-weight: normal;
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
  }
}

@media screen and (min-width: 1024px) {
  .hotel {
    &-background {
      padding: 20px;
    }

    &-calendar {
      display: flex;
      align-items: center;

      &-title:not(:last-child) {
        &::after {
          content: '-';
          margin: 0 10px;
        }
      }
    }

    &-submit {
      padding: 40px 100px;
    }
  }
}
</style>
