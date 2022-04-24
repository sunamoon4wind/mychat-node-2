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

// 関数
// 数字を２桁の文字列に変換
const toDoubleDigitString =
    (num) => {
        return ("0" + num).slice(-2);   // slice( -2 )で後ろから２文字取り出す。
    };

// 時刻文字列の作成（書式は「YY/DD/MM hh:mm ss」）
const makeTimeString =
    (time) => {
        return toDoubleDigitString(time.getFullYear()) + '/' + toDoubleDigitString(time.getMonth() + 1) + '/' + toDoubleDigitString(time.getDate())
            + ' ' + toDoubleDigitString(time.getHours()) + ':' + toDoubleDigitString(time.getMinutes()) + ' ' + toDoubleDigitString(time.getSeconds());
    }


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

                // 現在時刻の文字列の作成
                const strNow = makeTimeString(new Date());

                // メッセージオブジェクトの作成
                const objMessage = {
                    strMessage: strMessage,
                    strDate: strNow
                }

                // 送信元含む全員に送信
                //io.emit( 'spread message', strMessage );
                io.emit('spread message', objMessage);
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


