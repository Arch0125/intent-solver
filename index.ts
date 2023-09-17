import io from 'socket.io-client';
import { storage } from './storage/storage';
import intentAnalyser from './analyzer/intentAnalyer';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('messageToClient', async (data) => {
    console.log('Alert! New intent :', data.message);
    // storage.push(data.message);
    const res = await intentAnalyser(data.message);
    console.log(res);
    return res;
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
