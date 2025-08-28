const createBtn = document.getElementById('createBtn');
const output = document.getElementById('output');

createBtn.addEventListener('click', async () => {
    const name = document.getElementById('agentName').value.trim();
    const taskDescription = document.getElementById('agentTask').value.trim();

    if (!name || !taskDescription) {
        alert("Please enter name and task description.");
        return;
    }

    try {
        const res = await fetch('/create-agent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, taskDescription })
        });

        let data;

        if (res.ok) {
            data = await res.json();
            output.innerHTML = `
                <p><strong>Message:</strong> ${data.message}</p>
                <p><strong>File Path:</strong> <a href="${data.filePath}" target="_blank">${data.filePath}</a></p>
                <p><strong>Task:</strong> ${data.taskDescription}</p>
            `;
        } else {
            const text = await res.text();
            output.innerHTML = `<p style="color:red">Error: ${text}</p>`;
        }

    } catch(err) {
        output.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    }
});
