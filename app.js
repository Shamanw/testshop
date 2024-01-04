document.addEventListener("DOMContentLoaded", function() {
    if (window.Telegram.WebApp) {
        Telegram.WebApp.ready();
        
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.getElementById('username').innerText = `Hello, ${user.username}!`;
        } else {
            document.getElementById('username').innerText = 'Hello, Guest!';
        }
    }
});
