import kaboom from 'kaboom';

export const k = kaboom({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game"),
    width: window.innerWidth,
    height: window.innerHeight,
    background: [0, 0, 0],
});

// Sudo 1