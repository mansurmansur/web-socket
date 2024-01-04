import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../services/socket';
import { updateChatHistory } from '../redux/chat';

export const useMessageListener = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  


  useEffect(() => {
    const handleIncomingMessages = ({ content, from }) => {
      // Assuming your updateChatHistory function expects an object with sender and message properties
      dispatch(updateChatHistory({ sender: from, receiver: user,  message: content }));
    };

    // Listen for incoming private messages
    socket.on('private message', handleIncomingMessages);

    // Clean up the listener when component unmounts
    return () => {
      socket.off('private message', handleIncomingMessages);
    };
  }, [dispatch, user]);
};
