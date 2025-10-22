const mongoose = require('mongoose')

//db에 넣을거니까 taxiSchema에서 컬렉션 읽어와야함(호출)
const Taxi = mongoose.model('taxidbs')
//이제 Taxi가 table

//미들웨어 생성
//module.exports : 외부에서 참조하겠다
//taxi/src/services/taxiService에서 조회
module.exports = (app) => {

    //데이터 조회
    app.get('/api/taxi',async(req,res) => {
        const user = await Taxi.find()

        return res.status(200).send(user)
    })

    //데이터 입력
    app.post('/api/taxi',async(req,res) => {
        const user = await Taxi.create(req.body)

        return res.status(200).send({
            error:false,    //error가 발생하면 false 값 보내고
            user            //그렇지 않으면 user에 입력된 값 보냄
        })
    })

    //데이터 수정
    app.put('/api/taxi',async(req,res) => {
        const id = req.body.id
        const user = await Taxi.findByIdAndUpdate(id,req.body)

        return res.status(200).send({
            error:false,    //error가 발생하면 false 값 보내고
            user            //그렇지 않으면 user에 입력된 값 보냄
        })
    })

    //데이터 삭제
    app.delete('/api/taxi',async(req,res) => {
        const id = req.body.id
        const user = await Taxi.findByIdAndDelete(id)

        return res.status(200).send({
            error:false,    //error가 발생하면 false 값 보내고
            user            //그렇지 않으면 user에 입력된 값 보냄
        })
    })

}