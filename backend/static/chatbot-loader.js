// Chatbot ko inject karne ka script
window.onload = function() {
    const div = document.createElement('div');
    div.innerHTML = `
        <button id="chat-toggle-btn" style="position: fixed; bottom: 20px; right: 20px; z-index: 1001; background: #14b8a6; border: none; border-radius: 50%; width: 60px; height: 60px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
            <img src="/chat-to-chat.jpg" width="35" style="border-radius:50%" alt="Bot">
        </button>
        <div id="chatbot-container" style="position: fixed; bottom: 90px; right: 20px; z-index: 1000; display: none;">
            <iframe src="/chatbot/index.html" width="350" height="500" style="border: none; border-radius: 15px; box-shadow: 0px 5px 25px rgba(0,0,0,0.3);"></iframe>
        </div>
    `;
    document.body.appendChild(div);

    const btn = document.getElementById('chat-toggle-btn');
    const container = document.getElementById('chatbot-container');

    btn.onclick = function() {
        if (container.style.display === 'none') {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    };
};