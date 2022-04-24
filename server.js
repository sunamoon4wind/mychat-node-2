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
    });


// 公開フォルダの指定
app.use(express.static(__dirname + '/public'));


// サーバーの起動
server.listen(
    PORT,
    () => {
        console.log('Server on port %d', PORT);
    });