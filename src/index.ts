import Http from 'http';
import Express from 'express';
import Cors from 'cors';
import { Server } from 'socket.io';

import ChatController from './Controller/ChatController';
import ChatService from './Service/ChatService';


class App {

    static bootstrap() {

        const app = Express();
        var objetcs = [];

        app.use(Cors());
        app.use(Express.json());
        app.use(Express.urlencoded());
        app.use(Express.static('assets'))
        app.set('view engine', 'ejs');

        app.get('/', ChatController.formulario);
        app.post('/', ChatController.processar);

        const server = Http.createServer(app);
        const io = new Server(server);

        io.on('connection', (socket) => {
            console.log('a user connected');


            // Adiciona novo usuário conectado a lista geral de usuários e retorna essa lista para o usuário
            socket.on('ehlo', function (data) {
                console.log(data)
                ChatService.connectedUsers.push(data);
                console.log('LISTA DE USUARIOS: ', ChatService.connectedUsers);
                io.emit('list users', ChatService.connectedUsers);
            });

            socket.on("disconnecting", () => {
                console.log('a user disconnected');

                // io.emit('list users', ChatService.connectedUsers);
            });

            socket.on('chat message', (msg) => {
                console.log('message: ' + msg);
                io.emit('chat message', msg);
            });

            // Envia chave
            socket.on('chave', (msg) => {
                console.log('EMIT: ' + 'CHAVE DE ' + msg.remetente + ' para ' + msg.destinatario);

                io.emit('chave@' + msg.destinatario, msg);
            });

            socket.on('message', (msg) => {
                console.log('MESSAGE: ' + 'MESSAGE DE ' + msg.remetente + ' para ' + msg.destinatario);

                io.emit('message@' + msg.destinatario, msg);
            });

        });




        io.on('connection', function (client) {
            // Receive ehlo event with data:
            client.on('ehlo', function (data) {
            });
        });

        server.listen(8080, () => {
            console.log(`Express + Socket.io started: http://localhost:8080`);
        });

    }

}

App.bootstrap();
