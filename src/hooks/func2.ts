import { ref, computed } from 'vue'
import {tasks,status}from '@/stores/courseStore'
export function func2(){
    const tasklist=computed(()=>{
        return tasks.value.filter((task)=>{
            return classSearch(task)&&teacherSearch(task)&&statusSearch(task)
        })
    })
    const classKeywords=ref("")
    const teacherKeywords=ref("")
    function classSearch(task: { id: number; name: string; teacher: string; status:string; remark: string }){
        if(!classKeywords.value){
            return true
        }
        const keyword=classKeywords.value.toLowerCase()
        const classname=task.name.toLowerCase()
        return(
            classname.includes(keyword)
        )
    }
    function teacherSearch(task: { id: number; name: string; teacher: string; status:string; remark: string }){
        if(!teacherKeywords.value){
            return true
        }
        const keyword=teacherKeywords.value.toLowerCase()
        const teachername=task.teacher.toLowerCase()
        return(
            teachername.includes(keyword)
        )
    }
    function statusSearch(task: { id: number; name: string; teacher: string; status:string; remark: string }){
        if(status.value==="ongoing"){
            return task.status==="进行中"
        }
        if(status.value==="ended"){
            return task.status==="已结束"
        }
        return true
    }
    
    return{
        classKeywords,
        teacherKeywords,
        tasklist
    }
}