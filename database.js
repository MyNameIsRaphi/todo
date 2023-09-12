import mongoose, { Schema } from "mongoose";

import { hash, compareHash, connectDB } from "./functions.js"


class Database {

    constructor(schema) {    
        let connected = false;

        connectDB().catch(error => {
            console.log(error);
        }).then(() => {

            connected = true;
        })

        let sh = new mongoose.Schema(schema)
        this.Schema = new mongoose.model("Schema", sh)

    }

    async ValidateUser(user) {

        let object = {
            email: user.email
        }
       

        let collection = await this.Schema.find(object)
       
        let exists = collection.length > 0;
        
        if (exists) {
            let password = user.password
            let hashedPassword = collection[0].password
            
            let match =  await compareHash(password, hashedPassword)

           

            return match

        }
        return false

    }
    async addUser(user) {
       
        let object = {
            email: user.email
        }
        
        let created
        let alreadyExist = await this.Schema.exists(object)



        
        if (!alreadyExist) {
            user.password = await hash(user.password)

            let newUser = new this.Schema(user)

            await newUser.save()
          
            created = true
        } else {
            created = false
        }
      
        return created




    }
    async updateUser(user, newUser) {
        let object = {
            email: user.email
        }

        this.Schema.find(object).then(
            async (collection) => {
                let exists = collection.length > 0;
                if (exists) {
                    let hashedPassword = collection[0].password;

                    let password = user.password

                    let match = compareHash(password, hashedPassword)

                    if (match) {

                        await this.Schema.updateOne(user, newUser);

                        return true
                    }
                }
                return false;
            }

        ).catch(
            (error) => {
                console.log(error);

                return false;

            }
        )

    }
    async deleteUser(user) {

        let object = {
            email: user.email
        }

        this.Schema.exists(object).find(
            async (collection) => {
                let exists = collection.length > 0;
                if (exists) {
                    let hashPassword = collection[0].password
                    let match = await compareHash(user.password, hashPassword)
                    if (match) {
                        await this.Schema.deleteOne(object);
                        return true;
                    }
                }
                return false;
            }
        ).catch(
            (error) => {
                console.log(error);
                return false
            }
        )
    }

}





export {
    Database
}
