// del_acc.js


document.getElementById('confirm_delete_btn').addEventListener('click', function() {
    const user = auth.currentUser; // Get the current user
    const password = document.getElementById('password_field').value; // Get the password entered by the user

    if (!user || !password) {
        alert('請輸入密碼。');
        return;
    }

    // Reauthenticate the user with the entered password
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    user.reauthenticateWithCredential(credential).then(() => {
        // Reauthentication successful, proceed to delete the account
        user.delete().then(() => {
            alert('帳號已成功刪除。');
            // Redirect to the login page or homepage
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
