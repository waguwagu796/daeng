const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const path = require('path')

//스키마 호출
require('./models/userSchema')

//익스프레스 객체 생성
const app = express()

//라우팅 함수
const router = express.Router()

//기본 포트를 app객체의 속성으로 설정
app.set('port',process.env.PORT||8080)

//파일 업로드 폴더 지정
app.use(express.static('uploads'))

//데이터베이스에 연결 (mongodb 연결이 되어있어야함)
mongoose.connect('mongodb://127.0.0.1:27017/pro')

console.log('데이터베이스 연결')

//json형태의 데이터 사용
app.use(express.json())

//라우터 등록
require('./routers/userRouters')(app)
//Express 서버 시작
http.createServer(app).listen(app.get('port'),()=>{
    console.log('서버를 시작했습니다 : ' + app.get('port'))
})