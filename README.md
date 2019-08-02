# JS_Bitcoin
 Blockchain built from scratch with Javascript.
 
 ## How to run the Blockchain:
	npm run node_1
	npm run node_2
	npm run node_3
	npm run node_4
	npm run node_5

 ## How to use:
 Use [Postman](https://www.getpostman.com/) to interact with the API. To send a transaction, send a POST request to http://localhost:3001/transaction* using the following example JSON:
 
 *Port number can be whichever ports are specified in package.json
 
 ```
 {
	"amount": 23,
	"sender": "Person1",
	"recipient": "Person2"
}
```

In your browser, go to http://localhost:3001/blockchain (or whichever port number you want which is specified in package.json)
To mine a new block, go to http://localhost:3001/mine, and the transaction will be added to a new block. Until then, the transaction will remain pending.
