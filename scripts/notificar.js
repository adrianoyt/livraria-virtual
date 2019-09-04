
function notifyMe(title, message) {
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {
        var notification = new Notification(title, {
            image: "assets/undraw_notify_88a4.png",
            body: message
        });
    }
    else if (Notification.permission !== 'denied' || Notification.permission === "default") {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(title, {
                    image: "assets/undraw_notify_88a4.png",
                    body: message
                });
            }
        });
    }
}
