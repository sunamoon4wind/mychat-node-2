// クライアントからサーバーへの接続要求
const socket = io.connect();

// 接続時の処理
// ・サーバーとクライアントの接続が確立すると、
// 　サーバー側で、'connection'イベント
// 　クライアント側で、'connect'イベントが発生する
socket.on(
    'connect',
    () => {
        console.log('connect');
    });

// サーバーからのメッセージ拡散に対する処理
// ・サーバー側のメッセージ拡散時の「io.emit( 'spread message', strMessage );」に対する処理
socket.on(
    'spread message',
    (strMessage) => {
        console.log('spread message :', strMessage);

        // 拡散されたメッセージをメッセージリストに追加
        const li_element = $('<li>').text(strMessage);
        $('#message_list').prepend(li_element); // リストの一番上に追加
        //$( '#message_list' ).append( li_element );    // リストの一番下に追加
    });
