import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import socketClient from 'socket.io-client';
import createStyles from '../../utils/createStyles';

const socket = socketClient('http://192.168.178.48:5000', {
  transports: ['websocket'],
  forceNew: true,
  upgrade: false,
});
// console.log(socket);
// socket.connect();

const ChatScreen = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const styles = getStyles();

  console.log(socket);

  socket.on('UPDATED_MESSAGES', message => {
    setChatMessages([...chatMessages, message]);
  });
  socket.on('connect', () => console.log('connected...'));
  socket.on('disconnect', () => console.log('disconnected...'));

  const submitChatMessage = () => {
    socket.emit('NEW_MESSAGE', chatMessage);
    setChatMessage('');
  };

  const messageList = chatMessages.map(message => <Text>{message}</Text>);
  return (
    <Box f={1} justify="end">
      <Box bg="red" f={5}>
        {messageList}
      </Box>
      <Box f={1}>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          value={chatMessage}
          onSubmitEditing={() => submitChatMessage()}
          onChangeText={message => {
            setChatMessage(message);
          }}
        />
      </Box>
    </Box>
  );
};

const getStyles = () => {
  const styles = {textInput: {borderColor: 'red', borderWidth: 1, flex: 1}};
  return createStyles(styles);
};

export default ChatScreen;
