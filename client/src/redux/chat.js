import { createSlice} from "@reduxjs/toolkit";
import user from "./user";


export const chatSlice = createSlice({
  name: "chatHistory",
  initialState: {
    chatHistory: []
  },
  reducers: {
    updateChatHistory: (state, action) => {
      //update chatHistory
      const {sender, receiver, message} = action.payload;
      console.log(receiver)

      //checking if chat exist
      const chatExist = state.chatHistory.some(element => element.member_ids.includes(receiver.id));

      if(!chatExist){
        state.chatHistory.push({member_ids: [receiver.id, sender.id], chat: [{sender: sender.username, text: message}]})
      }

      state.chatHistory.forEach(element => {
        const isAMember = element.member_ids.includes( receiver.id);
        if(isAMember){
          element.chat.push({sender: sender.username, text: message})
        }
      });
    },
  },
});

export const {updateChatHistory} = chatSlice.actions
export default chatSlice.reducer
