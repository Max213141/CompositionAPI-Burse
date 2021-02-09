<template>
  <h1 class="text-white center" v-if=" $store.state.orderList.length === 0">Задач пока нет</h1>
  <div v-else>
    <h3 class="text-white">Всего активных задач: {{$store.getters.activeTasks}}</h3>
    <div v-for="(order, i) in orderList" :key="i">
      <div class="card">
        <h2 class="card-title">
          {{order.title}}
          <AppStatus :status="order.status"/>
        </h2>
        <p>
          <strong>
            <small>
              {{ new Date(order.date).toLocaleDateString() }}
            </small>
          </strong>
        </p>
        <p>{{order.text}}</p>
        <router-link
          :to="{name:'task', params:{id:order.id}}"
          v-slot="{navigate}"
        >
          <button class="btn primary" @click="navigate">Посмотреть</button>
        </router-link>
      </div>
  </div>
  </div>
</template>
Со

<script>
import AppStatus from '../components/AppStatus'
import {store, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const orderList = computed(() => {
      const list = store.getters.tasks

      return list
    })
    return {
      orderList

    }
  },
  components: { AppStatus }
}

</script>
