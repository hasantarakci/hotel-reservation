<template>
  <div class="views">
    <h3 class="views-title">{{ title }}</h3>
    <div class="views-types">
      <div v-for="item in data" :key="item.id" class="views-types-item">
        <input type="radio" :id="item.title" :name="name" :value="item.title" />
        <label :for="item.title">
          <p>{{ item.title }}</p>
          <img :src="item.photo" />
          <div v-if="item.price" class="description">
            <div>
              <p>{{ days }} Gün</p>
              <p>
                {{ person }} Yetişkin <span v-if="child && child != 0">{{ child }} Çocuk</span>
              </p>
            </div>
            <p>{{ item.price * (Number(person) + Number(child)) * days }} TL</p>
          </div>
          <div v-if="item.price_rate" class="description">
            <p>Fiyata Etki Oranı</p>
            <p>+ {{ item.price_rate }} %</p>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'name',
    },
    title: {
      type: String,
      default: 'Title',
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    days: {
      type: [String, Number],
      default: '',
    },
    person: {
      type: String,
      default: '',
    },
    child: {
      type: String,
      default: '',
    },
    amount: {
      type: String,
      default: '',
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.views {
  &-title {
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
  }

  &-types {
    display: flex;
    flex-direction: column;

    &-item {
      &:not(:last-child) {
        margin-bottom: 20px;
      }

      input {
        display: none;

        &[type='radio']:checked + label {
          border-color: #2bca0b;
        }
      }

      label {
        display: block;
        padding: 15px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;

        img {
          width: 100%;
        }

        .description {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .views {
    &-types {
      display: flex;
      flex-direction: row;

      &-item {
        &:not(:last-child) {
          margin-bottom: 0;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
