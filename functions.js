import bycrpt from "bcrypt";
import mongoose from "mongoose";

async function connectDB() {
    const uri = "mongodb://127.0.0.1:27017/todo2";
     mongoose.connect(uri, { useNewUrlParser: true }).catch(
        (error)=> {
            throw error;
        }
     );
    
}

async function hash(letter) {
   
    return await bycrpt.hashSync(letter, 10)
}

async function compareHash(word, hasedWord) {
   
     return bycrpt.compareSync(word, hasedWord)

  
}

export {
    compareHash,
    connectDB,
    hash
}