
let mongoose = require('mongoose')

let RequestSchema = mongoose.Schema({
    requestId: {
        type: Number,
        required: true
    }
    ,assignedTo: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 5,
        min: 1,
        max: 10
    },
    requestor: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        max: 50
    },
    status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'Approved', 'Rejected'] 
    }
})

let RequestModel = mongoose.model('Request', RequestSchema);

let addRequest = async function (request) {
    try {
        console.log('Inside', mongoose.connection.readyState);
        const res = await request.save();
        console.log('Response', res);
    }
    catch (err) {
        console.log('Err', err);
    }
}

let getRequests = async function () {
    let reqList = await RequestModel.find()

    console.log('Users in DB', reqList);
    return reqList;
}

let getRequest = async function (reqId) {
    let reqList = await RequestModel
        .find({ 
            requestId: { $eq: reqId } 
        })

    console.log('Users in DB', reqList);
    return reqList;
}

let getLatestRequestId = async function() {
    let reqId = await RequestModel.find().limit(1).sort( { requestId: -1 }).select( { requestId: 1, _id: -1 } );
    console.log('latest Request ID', reqId || 0);
    return reqId || 0;
}
const models = {
    requestModel: RequestModel
}

module.exports.getRequests = getRequests;
module.exports.getRequest = getRequest;
module.exports.addRequest = addRequest;
module.exports.getLatestRequestId = getLatestRequestId;

module.exports.models = models;
