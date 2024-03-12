import User from './models/user.js'
import db from './mongo.js'

let users = [
    {
        ward: 'mustang-2nd',
        organization: 'ward',
        email: 'carolineleigh',
        password: 'CowboysForever00!',

    }
]

const importData = async () => {
    try {
        
        const createdUsers = await User.insertMany(users)
        console.log(createdUsers)
        process.exit()
        
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
        
    }
}

importData()
