const winston=require('winston');
const mongoose=require('mongoose');
module.exports=()=>{

    mongoose.connect('mongodb://localhost:27017/vidly')
  .then(() => winston.info('Connected to MongoDB...'));

}