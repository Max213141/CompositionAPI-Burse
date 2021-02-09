<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="text"></textarea>
    </div>

    <button class="btn primary" :disabled="!checkDisabled" @click="create">Создать</button>
  </form>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const order = ref({})
    const title = ref('')
    const date = ref(null)
    const text = ref('')
    const status = ref(null)


    function createOrder () {
      if (statusOfOrder.value) {
        this.status = 'active'
      } else {
        this.status = 'cancel'
      }

      order.value = {
        title: title.value,
        date: date.value,
        text: text.value,
        status: status.value,
        id: getRandomInt
      }
      store.dispatch('createTask', this.order)

      router.push('/')
      order.value = {}
    }

    const checkDisabled = computed(() => {
      return date.value !== '' && title.value !== '' && text.value !== ''
    })
    const statusOfOrder = computed(() => {
      const givenDate = new Date(date.value).getTime()
      const currentDate = new Date().getTime()
      return givenDate > currentDate
    })
    const getRandomInt = computed(() => {
      return Date.now().toString()
    })

    return {
      title,
      date,
      text,
      order,
      status,
      create: createOrder,
      checkDisabled
    }
  }
}


</script>
