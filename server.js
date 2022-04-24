'use strict';

// モジュール
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 1337;

// 接続時の処理
// ・サーバーとクライアントの接続が確立すると、
// 　サーバー側で、'connection'イベント
// 　クライアント側で、'connect'イベントが発生する
io.on(
    'connection',
    (socket) => {
        console.log('connection');
        // 切断時の処理
        // ・クライアントが切断したら、サーバー側では'disconnect'イベントが発生する
        socket.on(
            'disconnect',
            () => {
                console.log('disconnect');
            });
        // 新しいメッセージ受信時の処理
        // ・クライアント側のメッセージ送信時の「socket.emit( 'new message', $( '#input_message' ).val() );」に対する処理
        socket.on(
            'new message',
            (strMessage) => {
                console.log('new message', strMessage);
                // 送信元含む全員に送信
                io.emit('spread message', strMessage);

            });
    });


// 公開フォルダの指定
app.use(express.static(__dirname + '/public'));


// サーバーの起動
server.listen(
    PORT,
    () => {
        console.log('Server on port %d', PORT);
    });


