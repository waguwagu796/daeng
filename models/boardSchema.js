const mongoose = require('mongoose');

cont boardScema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdb',
        required: true
    },
    subject:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    tourStyle:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    tourSpot:{
        type: String,
        required:true,
    },
    hitCount:{
        type:Number,
        default:0
    },
    images:{
        type:[String],
        default:[]
    },
    thumbnail:{
        type:String,
        default:''
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userdb',
        },
        content:{
            type:String,
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

// mongoose.model('boarddb',boardScema);