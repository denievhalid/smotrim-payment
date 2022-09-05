<template>
  <form class="form pay-form" @submit.prevent="onSubmit">
    <div class="form__field">
      <label class="form__label">Имя</label>
      <input
        class="form__control"
        :class="{
          'form__control--error': errors.firstName,
        }"
        @keypress="onInput('firstName')"
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
        @keypress="onInput('lastName')"
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
          @keypress="onInput('cardNumber')"
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
          @keypress="onInput('cardExpiration')"
          mask="00/0000"
          placeholder="мм/гггг"
          v-model="cardExpiration"
        />
        <span class="form__error" v-if="errors.cardExpiration">
          {{ errors.cardExpiration }}
        </span>
      </div>
      <div class="form__field">
        <label class="form__label">CVC/CVV код</label>
        <i-mask-component
          class="form__control"
          :class="{
            'form__control--error': errors.cvcNumber,
          }"
          @keypress="onInput('cvcNumber')"
          mask="000"
          v-model="cvcNumber"
        />
        <span class="form__error" v-if="errors.cvcNumber">
          {{ errors.cvcNumber }}
        </span>
        <div
          class="tooltip tooltip--top form__icon"
          data-tooltip="CVC/CVV код находится на задней стороне Вашей платежной карты вправо на белой линии, предназначенной для подписи, и всегда это три последних цифры в случае VISA и MasterCard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="#cbd0d4"
              fill-rule="evenodd"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-1.086-8.724c-.084.56.392 1.022.958 1.022h.47a.525.525 0 0 0 .524-.492c.057-.526.283-.986.676-1.379l.63-.62c.492-.495.836-.944 1.033-1.347.197-.409.295-.842.295-1.299 0-1.005-.303-1.782-.909-2.33C13.985 6.277 13.133 6 12.035 6c-1.088 0-1.947.29-2.58.871a2.84 2.84 0 0 0-.793 1.28c-.184.604.36 1.131.99 1.131.534 0 .933-.435 1.304-.84.052-.057.103-.114.154-.168.234-.247.542-.37.925-.37.808 0 1.212.454 1.212 1.362 0 .301-.078.589-.233.863-.155.269-.469.621-.94 1.056-.466.43-.787.869-.964 1.315-.087.221-.152.48-.196.776Zm.057 2.611c-.233.231-.35.527-.35.887 0 .355.114.648.342.88.233.23.539.346.917.346s.68-.116.909-.347c.233-.231.35-.524.35-.879 0-.36-.12-.656-.358-.887-.233-.237-.534-.355-.901-.355-.368 0-.671.118-.91.355Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <button class="btn btn--primary">Оплатить</button>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";
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
    position: relative;
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
    font-size: 14px;

    &--error {
      border-color: red;
    }
  }

  .form__icon {
    position: absolute;
    right: 12px;
    top: 30px;
    cursor: pointer;
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
