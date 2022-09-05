<template>
  <div class="wrapper">
    <h1 class="page-title">Форма оплаты</h1>
    <PaymentSuccess v-if="payment" />
    <template v-else>
      <PaymentForm @submit="onSubmit" />
    </template>
  </div>
</template>

<script setup>
import { PaymentForm } from "./components";
import { ref } from "vue";
import PaymentSuccess from "./components/PaymentSuccess";

const payment = ref(false);

const onSubmit = (e) => {
  payment.value = true;
};
</script>

<style lang="scss" scoped></style>
