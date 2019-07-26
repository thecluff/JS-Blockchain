const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const previousBlockHash = '87765DA6CCF0668238C1D27C35692E11';
console.log(bitcoin);

const currentBlockData = [
    {
        amount: 10,
        sender: 'B4SDF67G',
        recipient: '3ANDSGJ8',
    },
    {
        amount: 100,
        sender: 'GFSDF67G',
        recipient: '4NOTSGJ7',
    },
    {
        amount: 2000,
        sender: 'QTSDF67G',
        recipient: '78FTSGJ7',
    },
]

// bitcoin.hashBlock();

// bitcoin.createNewBlock(7777,'IOUOSDFKN','78sdfkSDF87');

// bitcoin.createNewTransaction(100,'ALEXSDGNJ','JENSUI498');

// bitcoin.createNewBlock(5384,'AK357h38','WP09808');

// bitcoin.createNewTransaction(1000,'JOESDGNJ','CHUCKSUI498');

// bitcoin.createNewBlock(9000,'ZKZ7h38','BFG9808');

const nonce = 44133;

bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));