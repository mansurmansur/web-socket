// abtract class
class usersStore {
    getAllUsers(){}
    
}

class inMemoryMessageStore extends usersStore {
    constructor(){
        super();
        this.messages = []
    }

    saveMessage(data){
        this.messages.push(data)
    }

    findMessageForUser(userID){
        return this.messages.filter(data => data.to === userID );
    }
}

module.exports = {
    inMemoryMessageStore,
}