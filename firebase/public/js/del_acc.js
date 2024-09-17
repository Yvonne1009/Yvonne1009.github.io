document.getElementById("confirm_delete_btn").addEventListener("click", function () {
    // 獲取用戶輸入的密碼
    const password = document.getElementById("password_field").value;
    
    // 獲取當前用戶
    const user = firebase.auth().currentUser;
    
    if (!user) {
        alert("沒有已登入的用戶。請先登入。");
        return;
    }

    // 建立一個憑據來重新驗證用戶
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    // 重新驗證用戶
    user.reauthenticateWithCredential(credential)
        .then(() => {
            // 如果驗證成功，刪除帳號
            user.delete().then(() => {
                alert("帳號已成功刪除。");
                window.location.href = "login.html"; // 刪除成功後重定向到登入頁面
            }).catch((error) => {
                console.error("刪除帳號時出錯：", error);
                alert("刪除帳號失敗。請稍後再試。");
            });
        })
        .catch((error) => {
            console.error("重新驗證失敗：", error);
            alert("密碼錯誤，請再試一次。");
        });
});
