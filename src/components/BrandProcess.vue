<template>
  <div class="reservation-process">
    <VueImage
      :wrapperClass="`reservation-process-item ${calendarClass}`"
      src="https://image.flaticon.com/icons/png/128/42/42446.png"
    />
    <div :class="`reservation-process-line ${firstLine}`"></div>
    <VueImage
      :wrapperClass="`reservation-process-item ${roomClass}`"
      src="https://image.flaticon.com/icons/png/128/2286/2286105.png"
    />
    <div :class="`reservation-process-line ${secondLine}`"></div>
    <VueImage
      :wrapperClass="`reservation-process-item ${walletClass}`"
      src="https://image.flaticon.com/icons/png/128/482/482541.png"
    />
  </div>
</template>

<script>
import VueImage from '@/components/VueImage';

export default {
  data() {
    return {};
  },
  components: {
    VueImage,
  },
  props: {
    calendarClass: {
      type: String,
    },
    roomClass: {
      type: String,
    },
    walletClass: {
      type: String,
    },
    firstLine: {
      type: String,
    },
    secondLine: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.reservation {
  &-process {
    background-color: #e6e6e6;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &-item {
      background-color: #ffffff;
      padding: 10px;
      border-radius: 50%;
      border: 2px solid #000000;

      &.active {
        border-color: #2bca0b;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    &-line {
      flex: 1;
      height: 2px;
      background-color: #000000;

      &.active {
        background-color: #2bca0b;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .reservation {
    &-process {
      margin-top: 20px;
      padding: 40px 100px;

      &-item {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
