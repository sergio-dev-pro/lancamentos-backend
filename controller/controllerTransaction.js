
const TransactionModel =  require('../models/TransactionModel') ;


// seekExpenses = buscarDespesas

   module.exports = {
       seekExpenses: async (req, res) =>  {
        const yearMonth = req.params.yearMonth;
         if(yearMonth){
             try {
                 const  resultExpenses = await TransactionModel.find({yearMonth : yearMonth});
                 res.send(resultExpenses);
                
             } catch (error) {
                 res.status(500).send(error);
             }
          }
     
         }, 

         createLancamento: async (req, res) =>{
            try {
                const resultCreate = await TransactionModel.insertMany(req.body);
                console.log(resultCreate);
               res.send(resultCreate);
            } catch (error) {
    
                console.log(error);
            }
        },
         deleteLancamento: async (req, res) =>{
             const id = req.params.id;
             console.log(id, "controllerTransaction")
            try {
                const resultDelete = await TransactionModel.findOneAndDelete({_id : id});
               res.send(resultDelete);

            } catch (error) {
    
                console.log(error);
            }
    
        }
        ,
         updateLancamento: async (req, res) =>{
             const id = req.params.id;
             const body = req.body;
             console.log(id)
             console.log(body)

             console.log(id, "controllerTransaction")
            try {
                const resultUpdate = await TransactionModel.findOneAndUpdate({_id : id}, { ...body} );
               res.send(resultUpdate);

            } catch (error) {
    
                console.log(error);
            }
        }
        
     
   }  
 
