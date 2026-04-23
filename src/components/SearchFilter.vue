<template>
  <div class="search">
    <div class="first">
      <label class="classSearch">
        <span>搜索课程</span>
        <input 
          type="text" 
          placeholder="输入课程名称" 
          :value="classKeywords"
          @input="$emit('update:classKeywords', ($event.target as HTMLInputElement).value)"
        >
      </label>
    </div>
    
    <div class="select">
      <label class="teacherSearch">
        <span>搜索教师</span>
        <input 
          type="text" 
          placeholder="输入授课教师" 
          :value="teacherKeywords"
          @input="$emit('update:teacherKeywords', ($event.target as HTMLInputElement).value)"
        >
      </label>
      <div class="statusSearch">
        <button
          v-for="item in states"
          :key="item.value"
          @click="$emit('changeStatus', item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {states} from '../stores/courseStore';
interface SearchFilterProps {
  classKeywords: string
  teacherKeywords: string
  states: {
    label: string;
    value: string;
}[]
}
const props = defineProps<SearchFilterProps>()
defineEmits([
  'update:classKeywords', 
  'update:teacherKeywords', 
  'changeStatus'
]);
</script>
<style lang="css" scoped>
@import '../styles/2.css';
</style>
