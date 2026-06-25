<script setup>
import { shallowRef } from 'vue';
import { useVehicle } from './composables/useVehicle';
import DashboardModern from './components/DashboardModern.vue';

const vehicle = useVehicle(); // Sua fonte de dados unificada
const currentView = shallowRef(DashboardModern);
</script>

<template>
  <component :is="currentView" :vehicle="vehicle" />
</template>