<template>
    <div id="classtask">
        <main class="page">
            <div class="title">
                <h1>课程清单</h1>
            </div>
            
            <SearchFilter
                v-model:classKeywords="classKeywords"
                v-model:teacherKeywords="teacherKeywords"
                :states="states"
                @changeStatus="status=$event"
            />

            <span class="addnew">
                <button class="add" @click="addnew()">新增课程</button>
            </span>

            <CourseForm
                :show-sheet="showSheet"
                :editing="editing"
                :formation="formation"
                :states2="states2"
                @submit="submitsheet"
                @cancel="resetForm"
            />

            <div class="loading" v-if="loading">
                加载中...
            </div>

            <ul class="classtasks">
                <li v-for="task in tasklist"
                    :key="task.id"
                    class="task">
                    <div class="word">
                        <div>课程名称：{{ task.name }}</div>
                        <div>授课教师：{{ task.teacher }}</div>
                        <div>{{ task.status }}</div>
                        <div>备注：{{ task.remark }}</div>
                    </div>
                    <div class="action">
                        <button class="delete" @click="deleteTask(task.id)">删除</button>
                        <button class="edit" @click="editTask(task);addnew()">编辑</button>
                    </div>
                </li>
            </ul>

            <div class="empty" v-if="count===0">
                暂时还没有课程
            </div>
            <div class="empty" v-if="tasklist.length===0&&count!==0">
                此筛选条件下没有课程
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    import CourseForm from './components/CourseForm.vue';
    import SearchFilter from './components/SearchFilter.vue';
    import { tasks,loading } from '@/stores/courseStore'
    import { onMounted } from 'vue'
    import { request } from '@/utils/request'
    import { func } from '@/hooks/func'
    import { func2 } from './hooks/func2';
    import { func3 } from './hooks/func3';
    
    const{states,status,states2,count,editing,formation,showSheet,submitsheet,resetForm,addnew}=func()
    const{classKeywords,teacherKeywords,tasklist}=func2()
    const{deleteTask,editTask}=func3()

    onMounted(async () => {
        loading.value = true
        try {
            const res = await request('/courses')
            tasks.value = res.data.data
            count.value = res.data.data.length
        } catch (err) {
            console.error('加载失败', err)
        } finally {
            loading.value = false
        }
    })
</script>
<style scoped>
@import './styles/1.css';
</style>
