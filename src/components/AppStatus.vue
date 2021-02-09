<template>
  <span :class="[ 'badge', className]">{{text}}</span>
</template>

<script>
import { watch, ref } from 'vue'
export default {
  props: {
    status: {
      type: String,
      validator(value) {
        return ['active', 'cancel', 'finish', 'startWorking'].includes(value)
      }
    }
  },
  setup (props) {
    const classesMap = {
      active: 'active',
      cancel: 'done',
      finish: 'active',
      startWorking: 'processing'
    }

    const textMap = {
      active: 'Активен',
      cancel: 'Отменен',
      finish: 'Завершен',
      startWorking: 'Выполняется'
    }

    const className = ref(classesMap[props.status])
    const text = ref(textMap[props.status])
    console.log(props.status)

    watch(props, val => {
      console.log(typeof (val.status))
      className.value = classesMap[val.status]
      text.value = textMap[val.status]
    })

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>
