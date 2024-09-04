// del_acc.js

document.getElementById('confirm_delete_btn').addEventListener('click', function() {
    const user = auth.currentUser; // 獲取當前用戶
    const password = document.getElementById('password_field').value; // 獲取用戶輸入的密碼

    if (!user || !password) {
        alert('請輸入密碼。');
        return;
    }

    // 使用輸入的密碼重新驗證用戶
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    user.reauthenticateWithCredential(credential).then(() => {
        // 重新驗證成功後，進行帳號刪除
        user.delete().then(() => {
            alert('帳號已成功刪除。');
            // 重定向到登錄頁面或主頁
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error('刪除帳號時發生錯誤：', error);
            alert('無法刪除帳號。請稍後再試。');
        });
    }).catch((error) => {
        console.error('重新驗證失敗：', error);
        alert('密碼錯誤。請再試一次。');
    });
});
