// Function to check server status
async function checkStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.className = 'status-box loading';
    statusDiv.innerHTML = '<p>⏳ Checking server status...</p>';

    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        statusDiv.className = 'status-box';
        statusDiv.innerHTML = `
            <p><strong>✅ Status:</strong> ${data.status}</p>
            <p><strong>📝 Message:</strong> ${data.message}</p>
            <p><strong>🕐 Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        `;
    } catch (error) {
        statusDiv.className = 'status-box error';
        statusDiv.innerHTML = `
            <p><strong>❌ Error:</strong> Failed to fetch status</p>
            <p>${error.message}</p>
        `;
    }
}

// Check status on page load
window.addEventListener('DOMContentLoaded', () => {
    checkStatus();
});
