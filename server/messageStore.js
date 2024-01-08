// abtract class
class messageStore {
    saveMessage(data){}
    findMessageForUser(userID){}
}

class inMemoryMessageStore extends messageStore {
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