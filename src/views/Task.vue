<template>
  <h3 class="text-white center" v-if="!currentTask">
    <div>Задачи с id = <strong>{{id}}</strong> нет.</div>
  </h3>
  <div class="card" v-else>
    <h2>{{currentTask.title}}</h2>
    <p><strong>Статус</strong>: <AppStatus :status="currentTask.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ new Date(currentTask.date).toLocaleDateString() }}</p>
    <p><strong>Описание</strong>: {{currentTask.text}}</p>
    <div>
      <button class="btn" @click="setStatus('startWorking')">Взять в работу</button>
      <button class="btn primary" @click="setStatus('finish')">Завершить</button>
      <button class="btn danger" @click="setStatus('cancel')">Отменить</button>
    </div>
  </div>

</template>

<script>
import AppStatus from '../components/AppStatus'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: ['id'],
  setup (props) {
    const store = useStore()

    const currentTask = computed(() => {
      // console.log(typeof (this.props.id))
      const task = store.getters.taskById(props.id)
      return task
    })

    const setStatus = status => {
      const updated = { ...currentTask.value, status }
      store.dispatch('changeOrder', updated)
    }

    return {
      currentTask,
      setStatus
    }
  },
  components: { AppStatus }
}



// export default {
//   props: ['id'],
//   methods: {
//     startWorking (type, target) {
//       this.$store.commit(type, target)
//       this.$store.dispatch('changeOrder')
//     },
//     finish (type, target) {
//       this.$store.commit(type, target)
//       this.$store.dispatch('changeOrder')
//     },
//     cancel (type, target) {
//       this.$store.commit(type, target)
//       this.$store.dispatch('changeOrder')
//     }
//   },
//   computed: {
//     currentTask () {
//       console.log(typeof (this.id))
//       const task = this.$store.getters.taskById(this.id)
//       return task
//     }
//   },
//   components: { AppStatus }
//
// }
</script>

<style scoped>

</style>
