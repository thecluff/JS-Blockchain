const rp = require('request-promise');
const port = process.argv[2];
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (reg, res) {
    res.send(bitcoin);
});

app.post('/transaction', function(req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    console.log(req.body);
    res.json({ note: `Transaction will be added in block ${blockIndex}`})
    // res.send(`The amount of the transaction is ${req.body.amount} bitcoin.`);
});

app.get('/mine', function(req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
        note: "New block mined successfully, dawg.",
        block: newBlock
    });
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
});

app.post('/register-and-broadcast-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
        bitcoin.networkNodes.push(newNodeUrl) };
    const regNodesPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true
        };
        regNodesPromises.push(rp(requestOptions));
    })
    Promise.all(regNodePromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {allNetworkNodes: [...bitcoin.networkNodes,
            bitcoin.currentNodeUrl]},
            json: true
        }
        return rp(bulkRegisterOptions)
        .then (data => {
            res.json({ note: 'New node registered with network successfully.'});
        })
    });
    
});

app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    bitcoin.networkNodes.push(newNodeUrl);
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);


    res.json({ note: 'New node registered successfully.'});

});

app.post('/register-nodes-bulk', function(req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;

    allNetworkNodes.forEach(networkNodeUrl => {
        bitcoin.networkNodes.push(networkNodeUrl);
        });
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    if(nodeNotAlreadyPresent)bitcoin.networkNodes.push(networkNodeUrl)
        app.post('/register-nodes-bulk', function (req, res) {
            const allNetworkNodes = req.body.allNetworkNodes;
            allNetworkNodes.forEach(networkNodeUrl => {
                const nodeNotAlreadyPresent =
                    bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
                    if (nodeNotAlreadyPresent && notCurrentNode)
                        bitcoin.networkNodes.push(networkNodeUrl);
            });
        res.json({ note: 'Bulk registration successful.'});

        });
    

    const notCurrentNode = bitcoin.currentNodeUrl !==networkNodeUrl
    
});

app.listen(port, function(){
    console.log(`listening on port ${port}`)
});