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
        console.log(collection)
        let exists = collection.length > 0;
        console.log(exists)
        if (exists) {
            let password = user.password
            let hashedPassword = collection[0].password
            console.log(password, hashedPassword)
            console.log(collection)
            let match = await compareHash(password, hashedPassword)

            return match

        }
        return false

    }
    async addUser(user) {
        console.log(user)
        let object = {
            email: user.email
        }
        console.log(object)
        let created
        let alreadyExist = await this.Schema.exists(object)



        console.log("Adding user")
        if (!alreadyExist) {
            user.password = await hash(user.password)

            console.log(user.password)
            let newUser = new this.Schema(user)

            await newUser.save()
            console.log("user created")
            created = true
        } else {
            created = false
        }
        console.log("Return of adduser ", created)
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
                    let match = compareHash(user.password, hashPassword)
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
