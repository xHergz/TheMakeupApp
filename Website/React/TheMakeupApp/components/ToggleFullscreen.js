export function IsFullScreenEnabled() {
    return (
        document.fullscreenEnabled
        || document.webkitFullscreenEnabled
        || document.mozFullScreenEnabled
        || document.msFullscreenEnabled
    );
}

export function IsFullScreen() {
    return (
        document.fullscreenElement
        || document.webkitFullscreenElement
        || document.mozFullScreenElement
        || document.msFullscreenElement
    );
}

export function ExitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export function RequestFullScreen() {
    const fullScreenElement = document.getElementById('consultation-chat-room');
    if (fullScreenElement.requestFullscreen) {
        fullScreenElement.requestFullscreen();
    }
    else if (fullScreenElement.webkitRequestFullscreen) {
        fullScreenElement.webkitRequestFullscreen();
    }
    else if (fullScreenElement.mozRequestFullScreen) {
        fullScreenElement.mozRequestFullScreen();
    }
    else if (fullScreenElement.msRequestFullScreen) {
        fullScreenElement.msRequestFullScreen();
    }
}

export function ToggleFullScreen() {
    // full-screen available?
    if (IsFullScreenEnabled()) {
        // are we full-screen?
        if (IsFullScreen()) {
            ExitFullScreen();
        }
        else {
            RequestFullScreen();
        }
    }
}
