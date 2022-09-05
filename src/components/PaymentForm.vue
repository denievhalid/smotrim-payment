<template>
  <form class="form pay-form" @submit.prevent="onSubmit">
    <div class="form__field">
      <label class="form__label">Имя</label>
      <input
        class="form__control"
        :class="{
          'form__control--error': errors.firstName,
        }"
        @input="onInput('firstName')"
        maxlength="50"
        type="text"
        v-model.trim="firstName"
      />
      <span class="form__error" v-if="errors.firstName">
        {{ errors.firstName }}
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">Фамилия</label>
      <input
        class="form__control"
        :class="{
          'form__control--error': errors.lastName,
        }"
        @input="onInput('lastName')"
        maxlength="50"
        type="text"
        v-model.trim="lastName"
      />
      <span class="form__error" v-if="errors.lastName">
        {{ errors.lastName }}
      </span>
    </div>
    <div class="form__field">
      <label class="form__label">Номер карты</label>
      <div class="card_number">
        <i-mask-component
          class="form__control"
          :class="{
            'form__control--error': errors.cardNumber,
          }"
          @input="onInput('cardNumber')"
          mask="0000-0000-0000-0000"
          v-model="cardNumber"
        />
        <span class="form__error" v-if="errors.cardNumber">
          {{ errors.cardNumber }}
        </span>
      </div>
    </div>
    <div class="form__group">
      <div class="form__field">
        <label class="form__label">Срок действия</label>
        <i-mask-component
          class="form__control"
          :class="{
            'form__control--error': errors.cardExpiration,
          }"
          @input="onInput('cardExpiration')"
          mask="00/0000"
          placeholder="мм/гггг"
          v-model="cardExpiration"
        />
        <span class="form__error" v-if="errors.cardExpiration">
          {{ errors.cardExpiration }}
        </span>
      </div>
      <div class="form__field">
        <label class="form__label">CVC/CVV</label>
        <i-mask-component
          class="form__control"
          :class="{
            'form__control--error': errors.cvcNumber,
          }"
          mask="000"
          @input="onInput('cvcNumber')"
          v-model="cvcNumber"
        />
        <span class="form__error" v-if="errors.cvcNumber">
          {{ errors.cvcNumber }}
        </span>
      </div>
    </div>
    <button class="btn btn--primary">Оплатить</button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
import { IMaskComponent } from "vue-imask";
import { ERROR_REQUIRED, INVALID_FORMAT } from "../constants";

const firstName = ref(null);
const lastName = ref(null);
const cardNumber = ref(null);
const cardExpiration = ref(null);
const errors = ref({});
const expiration = computed({
  get() {
    return cardExpiration.value;
  },
  set(newValue) {},
});
const cvcNumber = ref(null);

const emit = defineEmits(["submit"]);

const validateForm = () => {
  errors.value = {};

  if (!firstName.value) {
    errors.value.firstName = ERROR_REQUIRED;
  }

  if (!lastName.value) {
    errors.value.lastName = ERROR_REQUIRED;
  }

  if (cardNumber.value.length !== 19) {
    errors.value.cardNumber = INVALID_FORMAT;
  }

  if (cardExpiration.value.length !== 7) {
    errors.value.cardExpiration = INVALID_FORMAT;
  }

  if (cvcNumber.value.length !== 3) {
    errors.value.cvcNumber = INVALID_FORMAT;
  }
};

const onInput = (field) => {
  delete errors.value[field];
};

const onSubmit = () => {
  validateForm();

  if (!Object.keys(errors.value).length) {
    const credentials = {
      firstName: firstName.value,
      lastName: lastName.value,
      cardNumber: cardNumber.value,
      cardExpires: expiration.value,
      cvcNumber: cvcNumber.value,
    };

    emit("submit", credentials);
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 320px;

  &__field {
    margin-bottom: 15px;
  }

  &__label {
    display: block;
    color: #b8c2cc;
    font-size: 12px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  &__group {
    display: flex;

    .form__field + .form__field {
      margin-left: 15px;
    }
  }

  &__control {
    border: 2px solid #eff1f3;
    height: var(--item-height);
    border-radius: var(--border-radius);
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    display: block;
    outline: none;
    transition: border 0.1s ease-out;

    &--error {
      border-color: red;
    }

    &:focus {
      border-color: #cbd0d4;
    }
  }

  &__error {
    color: red;
    font-size: 12px;
    margin-top: 10px;
    display: block;
  }

  .card_number {
    position: relative;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
