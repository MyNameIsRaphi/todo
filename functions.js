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
    console.log(letter)
    return await bycrpt.hash(letter, 10)
}

async function compareHash(word, hasedWord) {
    console.log(word)
    console.log(hasedWord)
     bycrpt.compare(word, hasedWord,(err,result) => {
        console.log(err)
        return result
     })

   

}

export {
    compareHash,
    connectDB,
    hash
}