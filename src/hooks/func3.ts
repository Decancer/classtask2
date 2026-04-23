import {tasks,editing,count,editingid,formation}from '@/stores/courseStore'
import { request } from '@/utils/request'
export function func3(){
    async function deleteTask(id:number){
        await request(`/courses/${id}`, { method: 'DELETE' })
        tasks.value=tasks.value.filter((task)=>task.id!==id)
        count.value=tasks.value.length
    }
    function editTask(task: { id: number; name: string; teacher: string; status:string; remark: string }){
        editing.value=true
        editingid.value=task.id
        formation.id=task.id
        formation.name=task.name
        formation.teacher=task.teacher
        formation.status=task.status
        formation.remark=task.remark
        }
    
    return{
        deleteTask,
        editTask
    }
}