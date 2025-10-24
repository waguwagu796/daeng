import axios from 'axios'

//조회
const getUser = async() => {
    const res = await axios.get('/api/user')

    return res.data
}

//입력
const addUser = async(user,image) => {

    axios.post('/api/user', {
        email:user.email,
        password:user.password,
        name:user.name,
        nickname:user.nickname,
        role:user.role,
        enabled:user.enabled,
        createdAt:user.createdAt
    }).then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
}

// //수정
// const updateUser = async(user) => {

//     axios.put('/api/user',{
//         id:user._id,     //id는 user._id로 사용
//         name:user.name,
//         job:user.job
//     }).then(res=>{
//         console.log(res)
//     }).catch(error=>{
//         console.log(error)
//     })
// }

// //삭제
// const deleteUser = async(id) => {

//     axios.delete('/api/user',{
//         data: {id:id}       //id(변수명):id(async에서 받은 id)
//     }).then(res=>{
//         console.log(res)
//     }).catch(error=>{
//         console.log(error)
//     })
// }

export default {
    getUser:getUser,
    addUser:addUser,
    // updateUser:updateUser,
    // deleteUser:deleteUser
}