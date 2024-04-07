// const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken');
const secret = "Nilay@2903"

// function setUser(id, user){
//     sessionIdToUserMap.set(id,user);
// }

function setUser(user){
    payload = {
        _id : user._id,
        email : user.email,
        role : user.role

    }
    return jwt.sign(payload, secret)
}

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

function getUser(token){
    try{
        if(!token) return;
        return jwt.verify(token, secret)
    }
    catch(err){
        return;
    }
    
}

module.exports = {
    setUser,
    getUser
}