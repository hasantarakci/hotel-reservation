<template>
  <div class="home">
    <BrandProcess calendarClass="active" />
    <div class="reservation-area">
      <div class="reservation-place">
        <BrandSelect
          @onSelect="selectHotel"
          id="selectedHotel"
          :data="hotelList"
          :placeholder="hotelListPlaceholder"
          :value="hotelValue"
        />
      </div>
      <div class="reservation-time">
        <BrandInput
          class="table-item"
          type="date"
          title="Giriş Tarihi"
          :min="minEntryDate"
          :max="exitDate"
          :value="checkInValue"
          @onChange="onCheckIn"
        />
        <BrandInput
          class="table-item"
          type="date"
          title="Çıkış Tarihi"
          :min="minExitDate"
          :value="checkOutValue"
          @onChange="onCheckOut"
        />
        <BrandInput
          class="table-item"
          type="number"
          title="Yetişkin Sayısı"
          :value="personValue"
          min="1"
          :max="maxAdultSize"
          :errorMsg="isErrorMsg"
          :msg="`1 ve ${maxAdultSize} arasında olmalıdır`"
          @onChange="changePersonVal"
        />
        <BrandInput
          class="table-item"
          type="number"
          title="Çocuk Sayısı"
          :value="childValue"
          min="0"
          max="5"
          :disabled="!childStatus"
          :errorMsg="!childStatus"
          msg="Çocuk ziyaretçi kabul edilmiyor!"
          @onChange="changeChildVal"
        />
      </div>
    </div>
    <div class="reservation-submit">
      <button @click="onSave">Kaydet ve Devam Et</button>
    </div>
  </div>
</template>

<script>
import Reservations from '@/services/service.js';
import BrandInput from '@/components/BrandInput';
import BrandSelect from '@/components/BrandSelect';
import BrandProcess from '@/components/BrandProcess';

export default {
  name: 'Home',
  components: {
    BrandInput,
    BrandSelect,
    BrandProcess,
  },
  data() {
    return {
      hotelList: [],
      hotelListPlaceholder: 'Rezervasyon yapmak istediğiniz oteli seçiniz.',
      hotelDetails: [],
      selectedHotel: {},
      hotelValue: JSON.parse(localStorage.selectedHotel).id || '',
      selectedHotelName: '',
      maxAdultSize: '5',
      childStatus: true,
      isErrorMsg: false,
      checkInValue: '',
      checkOutValue: '',
      personValue: '1',
      childValue: '0',
      minEntryDate: '',
      minExitDate: '',
      entryDate: '',
      exitDate: '',
    };
  },
  methods: {
    onCheckIn(val) {
      this.entryDate = val;
      this.minExitDate = val;
    },
    onCheckOut(val) {
      this.exitDate = val;
    },
    changePersonVal(val) {
      if (val < 1) {
        this.personValue = 1;
      } else if (val > 5) {
        this.personValue = 5;
      } else {
        this.personValue = val;
      }

      if (val != this.personValue) {
        this.isErrorMsg = true;
      } else {
        this.isErrorMsg = false;
      }
    },
    changeChildVal(val) {
      this.childValue = val;
    },
    selectHotel(val) {
      this.getHotelDetails(val);
    },
    onSave() {
      if (
        this.selectedHotel &&
        this.entryDate &&
        this.exitDate &&
        this.personValue &&
        !this.isErrorMsg
      ) {
        localStorage.selectedHotel = JSON.stringify(this.selectedHotel);
        localStorage.entryDate = this.entryDate;
        localStorage.exitDate = this.exitDate;
        localStorage.personValue = this.personValue;
        localStorage.childValue = this.childValue;
        localStorage.selectedHotelName = this.selectedHotelName;
        this.$store.dispatch('setSelectedHotel', this.selectedHotel);
        this.$store.dispatch('setSelectedHotelName', this.selectedHotelName);
        this.$router.push({ path: 'room' });
      }
    },
    getHotelList() {
      Reservations.getHotelList().then((res) => {
        if (!res || !res.data) {
          return;
        }

        res.data.forEach((x) => {
          x.value = x.hotel_name;
          delete x.hotel_name;
        });

        this.hotelList = res.data;
      });
    },
    getHotelDetails(val) {
      Reservations.getHotelDetails().then((res) => {
        if (!res || !res.data) {
          return;
        }

        this.hotelDetails = res.data;
        this.hotelDetails.forEach((element) => {
          if (element.id == val) {
            this.selectedHotel = element;
            this.childStatus = element.child_status;
            this.maxAdultSize = String(element.max_adult_size);

            if (this.maxAdultSize < this.personValue) {
              this.personValue = this.maxAdultSize;
            }

            this.hotelList.forEach((x) => {
              if (x.id == val) {
                this.selectedHotelName = x.value;
              }
            });
          }
        });
      });
    },
    getTodayTime() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      this.minEntryDate = yyyy + '-' + mm + '-' + dd;
      this.minExitDate = this.minEntryDate;
    },
  },
  created() {
    this.getHotelList();
    this.getTodayTime();
    console.log(this.hotelValue);
  },
};
</script>

<style lang="scss">
.home {
  .reservation {
    &-area {
      box-sizing: border-box;
      max-width: 1000px;
      margin: auto;
      padding: 20px 10px;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
    }

    &-place {
      box-sizing: border-box;
    }

    &-time {
      display: flex;
      flex-direction: column;

      .table-item {
        padding: 10px 0;
      }
    }

    &-submit {
      text-align: center;
      box-sizing: border-box;
      background-color: #e6e6e6;
      max-width: 1000px;
      margin: 20px auto;
      border-radius: 5px;
      padding: 30px 0;

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
}

@media screen and (min-width: 1024px) {
  .home {
    .reservation {
      &-area {
        padding: 50px 100px;
      }

      &-time {
        flex-direction: row;
        border: 1px solid #e6e6e6;

        .table-item {
          width: 25%;
          padding: 20px 10px;

          &:not(:last-child) {
            border-bottom: none;
            border-right: 1px solid #e6e6e6;
          }
        }
      }

      &-submit {
        text-align: end;
        border-radius: 5px;
        padding: 40px 100px;
      }
    }
  }
}
</style>
