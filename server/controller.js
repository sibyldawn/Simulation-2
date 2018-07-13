module.exports={

   create:(req,res)=>{
    const { name,address,city,state,zip } = req.body;
    const db = req.app.get('db');

    db.insert({name,address,city,state,zip}).then(newHouse=>{
        res.status(200).send('Success',newHouse);
    }).catch(error => {
        console.log('insert error', error);
        res.status(500).send('ERROR',error)
    })
   },

   read: (req,res) => {
       const db = req.app.get('db');

       db.read_listing()
       .then(houses => res.status(200).send(houses))
       .catch( error => {
           res.status(500).send("ERROR");
           console.log('-------readListing ERROR',error);
       })
   },

   update:( req,res) => {
       const { id } = req.params;
       const { name,address,city,state,zip } = req.body;
       const db = req.app.get('db');

       db.update({name,address,city,state,zip})
       .then((houses)=> res.status(200).send(houses))
       .catch(error => {
           res.status(500).send('ERROR',error);
       })
   },

   delete:( req,res) => {
       const { id } = req.params;
       const db = req.app.get('db');

       db.delete({id})
       .then((houses)=> res.status(200).send(houses))
       .catch(error => {
           res.status(500).send('ERROR',error)
           console.log('deleteERROR', error)
       });

   }
}