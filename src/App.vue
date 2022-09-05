<template>
  <div class="wrapper">
    <h1 class="page-title">Форма оплаты</h1>
    <!-- Успешная отправка формы -->
    <PaymentSuccess v-if="payment" />
    <!-- Форма оплаты -->
    <PaymentForm @submit="onSubmit" v-else />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PaymentForm } from "./components";
import PaymentSuccess from "./components/PaymentSuccess";

const payment = ref(false);

const onSubmit = () => {
  payment.value = true;
};
</script>

<style lang="scss" scoped></style>
