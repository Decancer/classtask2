let mockCourses = [
  { id: 1, name: "Vue 3 基础入门", teacher: "王老师", status: "ongoing", remark: "适合前端初学者" },
  { id: 2, name: "JavaScript 核心语法", teacher: "李老师", status: "ended", remark: "已完成录制" },
  { id: 3, name: "HTML 与 CSS 布局", teacher: "张老师", status: "ongoing", remark: "页面基础课程" },
  { id: 4, name: "前端工程化初识", teacher: "陈老师", status: "ended", remark: "入门了解即可" },
  { id: 5, name: "组件化开发思维", teacher: "刘老师", status: "ongoing", remark: "重点理解组件拆分" },
  { id: 6, name: "接口请求与数据渲染", teacher: "赵老师", status: "ongoing", remark: "包含异步请求练习" }
]

const statusMap = {
  ongoing: "进行中",
  ended: "已结束"
}
type CourseStatus = 'ongoing' | 'ended'

export default [
  {
    url: '/api/courses',
    method: 'get',
    response: () => {
      const data = mockCourses.map(item => ({
        ...item,
        status: statusMap[item.status as CourseStatus]
      }))
      return { code: 200, message: 'success', data }
    }
  },

  {
    url: '/api/courses',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const newId = mockCourses.length ? Math.max(...mockCourses.map(i => i.id)) + 1 : 1
      const newItem = {
        id: newId,
        ...body,
        status: body.status === "进行中" ? "ongoing" : "ended"
      }
      mockCourses.push(newItem)
      return { code: 200, message: '新增成功', data: { ...newItem, status: statusMap[newItem.status as CourseStatus] } }
    }
  },

  {
    url: '/api/courses/:id',
    method: 'put',
    response: ({ body, query }: { body: any; query: any }) => {
      const id = +query.id
      const index = mockCourses.findIndex(i => i.id === id)
      mockCourses[index] = { ...mockCourses[index], ...body, status: body.status === "进行中" ? "ongoing" : "ended" }
      return { code: 200, message: '编辑成功', data: { ...mockCourses[index], status: statusMap[mockCourses[index].status as CourseStatus] } }
    }
  },
  
  {
    url: '/api/courses/:id',
    method: 'delete',
    response: ({ query }: { query: any }) => {
      const id = +query.id
      mockCourses = mockCourses.filter(i => i.id !== id)
      return { code: 200, message: '删除成功' }
    }
  }
]