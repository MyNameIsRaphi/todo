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

function hash(letter) {
    bycrpt.hash(letter, 10).then(
        (hash) => {
            return hash
        }).catch(
            (error) => {
                console.log(error)
                return ""
            }
        )
}

async function compareHash(word, hasedWord) {

    const match = await bycrpt.compare(word, hasedWord)

    return match

}

export {
    compareHash,
    connectDB,
    hash
}