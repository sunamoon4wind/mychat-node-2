
// 「Send」ボタンを押したときの処理
$('form').submit(
    () => {
        console.log('#input_message :', $('#input_message').val());

        if ($('#input_message').val()) {
            // サーバーに、イベント名'new message' で入力テキストを送信
            socket.emit('new message', $('#input_message').val());

            $('#input_message').val('');    // テキストボックスを空に。
        }
        return false;   // フォーム送信はしない
    });