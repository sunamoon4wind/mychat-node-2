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

// 「Send」ボタンを押したときの処理
//$('form').submit(
    //  () => {
    //    console.log('#input_message :', $('#input_message').val());

    // if ($('#input_message').val()) {
    //     // サーバーに、イベント名'new message' で入力テキストを送信
    //     socket.emit('new message', $('#input_message').val());

    //     $('#input_message').val('');    // テキストボックスを空に。
    // }
    // return false;   // フォーム送信はしない
    //}
//);
