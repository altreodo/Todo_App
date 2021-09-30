const mongoose=require('mongoose');
const contactSchema=new mongoose.Schema({
    discription:{
        type:String,
        require:true
    },
    category:{     
        type:String,
        require:true
    },
    date:{
        type:String,
        return:true
    },
    color:{
        type:String,
        required:true
    }
});
const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;