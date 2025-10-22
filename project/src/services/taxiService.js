import axios from 'axios'

//조회
const getUser = async() => {
    const res = await axios.get('/api/taxi')

    return res.data
}

//입력
const addUser = async(user,image) => {

    axios.post('/api/taxi',{
        name:user.name,
        job:user.job
    }).then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })

    //파일 업로드
    const formData = new FormData()
    formData.append('upload',image)

    axios.post('/api/fileUpload',formData)
    .then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
}

//수정
const updateUser = async(user) => {

    axios.put('/api/taxi',{
        id:user._id,     //id는 user._id로 사용
        name:user.name,
        job:user.job
    }).then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
}

//삭제
const deleteUser = async(id) => {

    axios.delete('/api/taxi',{
        data: {id:id}       //id(변수명):id(async에서 받은 id)
    }).then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
}

export default {
    getUser:getUser,
    addUser:addUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}