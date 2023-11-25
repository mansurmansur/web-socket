import { createSlice} from "@reduxjs/toolkit";
import {socket} from "../services/socket";


export const chatSlice = createSlice({
  name: "chatHistory",
  initialState: {
    chatHistory: []
  },
  reducers: {
    updateChatHistory: (state, action) => {
      //update chatHistory
      const {sender, message} = action.payload;
      console.log(sender)

      //checking if chat exist
      const chatExist = state.chatHistory.some(element => element.member_ids.includes(sender.id));

      if(!chatExist){
        state.chatHistory.push({member_ids: [sender.id, socket.id], chat: [{sender: sender.username, text: message}]})
      }

      state.chatHistory.forEach(element => {
        const isAMember = element.member_ids.includes( sender.id);
        if(isAMember){
          element.chat.push({sender: sender.username, text: message})
        }
      });
    },
  },
});

export const {updateChatHistory} = chatSlice.actions
export default chatSlice.reducer
