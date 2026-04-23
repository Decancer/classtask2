import { ref } from 'vue'
import {tasks,status,editing,editingid,count,states2,formation}from '@/stores/courseStore'
import { request } from '@/utils/request'
export function func(){
    const states=ref([
        {label:"全部",value:"all"},
        {label:"进行中",value:"ongoing"},
        {label:"已结束",value:"ended"}
    ])

    
    async function submitsheet(){
        if(!formation.name.trim()){
            alert("请输入课程名称")
            return
        }
        if(!formation.teacher.trim()){
            alert("请输入授课教师")
            return
        }
        if(formation.status==="课程状态"){
            alert("请选择课程状态")
            return
        }
        if(editing.value){
            await request(`/courses/${formation.id}`, {
                method: 'PUT',
                data: formation
            })
            const index=tasks.value.findIndex(task=>task.id===editingid.value)
            if(index!==-1){
                tasks.value[index]={...formation}
            }
        }
        else{
            const maxId = tasks.value.length > 0 
                ? Math.max(...tasks.value.map(task => task.id)) 
                : 0;
            formation.id = maxId + 1;
            const res = await request('/courses', {
                method: 'POST',
                data: formation
            })
            tasks.value.push({...res.data.data, id: formation.id})
            count.value++
        }
        count.value=tasks.value.length
        resetForm()
    }
    function resetForm(){
        formation.id=0
        formation.name=""
        formation.teacher=""
        formation.status="课程状态"
        formation.remark=""
        editing.value=false
        editingid.value=0
        showSheet.value=false
    }
    
    const showSheet=ref(false)
    function addnew(){
        showSheet.value=true
    }
    return {
        states,
        status,
        states2,
        tasks,
        count,
        editing,
        formation,
        showSheet,
        submitsheet,
        resetForm,
        addnew
    }
}