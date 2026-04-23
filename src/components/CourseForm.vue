<template>
    <form class="sheet" @submit.prevent="$emit('submit')" v-if="showSheet">
        <div class="input">
            <label class="class">
                <span>课程名称</span>
                <input type="text" v-model="formation.name">
            </label>
            <label class="teacher">
                <span>授课教师</span>
                <input type="text" v-model="formation.teacher">
            </label>
            <label class="status">
                <span>课程状态</span>
                <select v-model="formation.status">
                <option v-for="item in states2" >
                    {{ item }}
                </option>
                </select>
            </label>
        </div>
        <label class="remark">
            <span>备注</span>
            <input type="text" v-model="formation.remark">
        </label>
        <div class="button">
            <button type="submit">
                {{ editing ? "保存":"添加" }}
            </button>
            <button type="button" @click="$emit('cancel')">
                取消
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { form } from '@/types/task';

    interface CourseFormProps {
        showSheet:Boolean
        editing:Boolean
        formation:form
        states2:string[]
        }
    const props = defineProps<CourseFormProps>()
    const emit=defineEmits(['submit','cancel']);
</script>
