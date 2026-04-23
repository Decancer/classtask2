import type {form} from "@/types/task"
import { ref, reactive } from "vue"
export const tasks=ref<form[]>([])
export const status=ref("all")
export const editing=ref<boolean>(false)
export const editingid=ref<number>()
export const count=ref<number>(0)
export const states2=ref(["课程状态","进行中","已结束"])
export const loading=ref<boolean>(false)
export const formation=reactive({
    id:0,
    name:"",
    teacher:"",
    status:"课程状态",
    remark:""
})
export const states=[
    {
        label:"全部",
        value:"all"
    },
    {
        label:"进行中",
        value:"ongoing"
    },
    {
        label:"已结束",
        value:"ended"
    }
]
