const mongoose = require('mongoose')

//db에 넣을거니까 taxiSchema에서 컬렉션 읽어와야함(호출)
const User = mongoose.model('userdb')
//이제 Taxi가 table

//미들웨어 생성
//module.exports : 외부에서 참조하겠다
//taxi/src/services/taxiService에서 조회
module.exports = (app) => {

    //데이터 조회
    app.get('/api/user',async(req,res) => {
        const user = await User.find()

        return res.status(200).send(user)
    })

    //데이터 입력
    app.post('/api/user',async(req,res) => {
        const user = await User.create(req.body)

        return res.status(200).send({
            error:false,    //error가 발생하면 false 값 보내고
            user            //그렇지 않으면 user에 입력된 값 보냄
        })
    })

    //데이터 수정
    app.put('/api/user',async(req,res) => {
        const id = req.body.id
        const user = await User.findByIdAndUpdate(id,req.body)

        return res.status(200).send({
            error:false,    //error가 발생하면 false 값 보내고
            user            //그렇지 않으면 user에 입력된 값 보냄
        })
    })

    //데이터 삭제
    app.delete('/api/user',async(req,res) => {
        const id = req.body.id
        const user = await User.findByIdAndDelete(id)

        return res.status(200).send({
            error:false,    //error가 발생하면 false 값 보내고
            user            //그렇지 않으면 user에 입력된 값 보냄
        })
    })

}