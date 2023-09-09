import mongoose, { Schema } from "mongoose";


class Database{
    constructor(schema){
        
        connectDB()
        let sh = new  mongoose.Schema(schema)
        const Schema = new mongoose.model("Schema",sh)
        console.log(Schema)
    }
     find(schema){
        this.Schema.find(schema).then((result) =>{
            return result;
        }).catch(error => {
            console.log(error)
            return error
        })
    }
    async insertOne(schema){
        let sh = new this.Schema(schema);
        await sh.save();
    }
    async updateOne(id, newData){
        this.Schema.replaceOne({
            _id:id
        },newData).then(() => {
            return true;
        }).catch((error) => {
            console.log(err);
            return false;
        })
    }
    async delete(id){
        this.Schema.deleteOne({
            _id:id
        }).then((result) => {
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        })
    }

}





export {
    Database
}
