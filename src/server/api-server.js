
const cors = require('cors');
const express = require('express');
const App = express();
var bodyParser = require('body-parser');

const mongoServer = require('./mongo-server');
const requestDAL = require('./request-dal');

mongoServer.connect();

App.use(cors());
App.use(bodyParser.json());

App.listen(process.env.PORT || '1010', () => {
    console.log('Listening!')
})

App.post('/api/request', async (req, res) => {
    // console.log('GettingLatest Req Id:', {...req.body});
    let requestList = await requestDAL.getLatestRequestId();
    // console.log(requestList, requestList[0]);
    let reqId = requestList[0].requestId;
    // console.log('Latest Req Id:', reqId);
    // req.RequestId = reqId;
    await requestDAL.addRequest(new requestDAL.models.requestModel({ ...req.body, requestId: reqId + 1 }));
    res.send( { success: true } );
})

App.get('/api/request', async (req, res) => {
    let requests = await requestDAL.getRequests();
    // console.log('Req list', requests);
    res.send(requests)
})
// App.get('/', (req, res) => {
//     res.send('Hello')
// })

// App.get('/api/courses', (req, res) => {
//     res.send([{ id: 1, name: 'COurse1'}, { id: 2, name: 'COurse2'}])
// })

// App.get('/api/login', (req, res) => {
//     res.send('{"Name": "Test1"}')
// })

// App.post('/api/login', async (req, res) => {
//     // console.log('Request:', req);
//     console.log('Request Body:', req.body);
//     // var a = await A();

//     var users = await userDal.getuser(req.body.userName)
//     users && users.length === 1 && users[0].password === req.body.password && users[0].isActive ? 
//         res.send(users[0])
//         : res.send(null)
//         // .then((user) => {
//         //     console.log('User Details:', user)
//         //     // user[0].password === req.body.password
//         // }).catch(err => {
//         //     console.log(err.message)
//         //     return false;
//         // })
//     // )
// })

// async function A(req) {
//     var a = await userDal.getuser(req.body.userName)
//     console.log('A:', a);
// }