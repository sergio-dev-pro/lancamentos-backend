const  express =  require('express');
const transactionRouter = express.Router();
const {seekExpenses, createLancamento, deleteLancamento, updateLancamento} = require('../controller/controllerTransaction');

//const seekExpenses = require('../controller/controllerTransaction');
//const createLancamento = require('../controller/controllerTransaction');
// onde deve ser implementado as rotas.

//console.log(transactionRouter, "transactionRouter")

transactionRouter.get('/:yearMonth', seekExpenses);
transactionRouter.post('/newLancamento', createLancamento );
transactionRouter.delete('/deleteLancamento/:id', deleteLancamento );
transactionRouter.put('/updateLancamento/:id', updateLancamento );

module.exports = transactionRouter;
