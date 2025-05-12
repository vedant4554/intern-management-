document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const rollno = document.getElementById('rollno').value;
    const course = document.getElementById('course').value;
    const duration = document.getElementById('duration').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;

    const student = {
        name,
        rollno,
        course,
        duration,
        address,
        contact,
        email
    };

    addStudentToTable(student);
    document.getElementById('studentForm').reset();
});

function addStudentToTable(student) {
    const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    Object.values(student).forEach((value, index) => {
        const cell = row.insertCell(index);
        cell.textContent = value;
    });

    const actionsCell = row.insertCell(Object.values(student).length);
    actionsCell.innerHTML = `
        <button class="edit" onclick="editStudent(this)">Edit</button>
        <button class="delete" onclick="deleteStudent(this)">Delete</button>
    `;
}

function editStudent(button) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');

    document.getElementById('name').value = cells[0].textContent;
    document.getElementById('rollno').value = cells[1].textContent;
    document.getElementById('course').value = cells[2].textContent;
    document.getElementById('duration').value = cells[3].textContent;
    document.getElementById('address').value = cells[4].textContent;
    document.getElementById('contact').value = cells[5].textContent;
    document.getElementById('email').value = cells[6].textContent;

    row.remove();
}

function deleteStudent(button) {
    const row = button.closest('tr');
    row.remove();
}
document.addEventListener('DOMContentLoaded', function() {
    // Create and add the export button to the container
    const container = document.querySelector('.container');
    const exportDiv = document.createElement('div');
    exportDiv.className = 'export-container';
    exportDiv.style.textAlign = 'center';
    exportDiv.style.marginBottom = '20px';
   
    exportDiv.innerHTML = `
      <button id="exportButton" class="export-btn">
        <span class="export-icon">📥</span>
        Export to CSV
      </button>
      <div id="easterEggMessage" class="easter-egg" style="display: none;"></div>
      <div class="hint" style="font-size: 11px; color: #888; margin-top: 5px;">
        (Hidden feature: Click the button 5 times for a surprise)
      </div>
    `;
   
    // Insert the export button after the h2 element
    const h2Element = document.querySelector('h2');
    h2Element.parentNode.insertBefore(exportDiv, h2Element.nextSibling);
   
    // Add CSS for the export button
    const style = document.createElement('style');
    style.textContent = `
      .export-btn {
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
     
      .export-btn:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
     
      .export-btn.shake {
        animation: shake 0.5s ease;
      }
     
      .easter-egg {
        margin-top: 15px;
        background-color: #fff3cd;
        border: 2px solid #ffeeba;
        padding: 10px;
        border-radius: 5px;
        display: inline-block;
        font-weight: bold;
        color: #856404;
        animation: bounce 1s ease infinite;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
     
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
      }
     
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
   
    // Easter egg functionality
    const exportButton = document.getElementById('exportButton');
    const easterEggMessage = document.getElementById('easterEggMessage');
    let clickCount = 0;
   
    // Fun messages for the Easter egg
    const funnyMessages = [
      "You're egg-cellent at exporting data! 🥚",
      "CSV: Can't Stop Vibing with this data! 🎵",
      "Data so fresh it deserves its own spreadsheet! ✨",
      "Downloading... happiness.csv 😊",
      "Achievement unlocked: Data Wrangler! 🏆",
      "I'm not just a button, I'm a data liberator! 🦸‍♂️"
    ];
   
    // Export functionality and Easter egg trigger
    exportButton.addEventListener('click', function() {
      // Add shake animation
      exportButton.classList.add('shake');
      setTimeout(() => exportButton.classList.remove('shake'), 500);
     
      // Export the actual table data
      exportTableToCSV();
     
      // Easter egg functionality
      clickCount++;
      if (clickCount === 5) {
        const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        easterEggMessage.textContent = randomMessage;
        easterEggMessage.style.display = 'block';
       
        // Hide the Easter egg after a few seconds
        setTimeout(() => {
          easterEggMessage.style.display = 'none';
          clickCount = 0;
        }, 5000);
      }
    });
   
    // Function to export table data to CSV
    function exportTableToCSV() {
      const table = document.getElementById('studentTable');
      const headers = [];
      const rows = [];
     
      // Get headers from the table (excluding the "Actions" column)
      const headerCells = table.querySelectorAll('thead th');
      headerCells.forEach((cell, index) => {
        if (index < headerCells.length - 1) { // Skip "Actions" column
          headers.push(cell.textContent);
        }
      });
     
      // Get data from the table rows (excluding the "Actions" column)
      const dataCells = table.querySelectorAll('tbody tr');
      dataCells.forEach(row => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
          if (index < cells.length - 1) { // Skip "Actions" column
            rowData.push(cell.textContent.replace(/,/g, ';')); // Replace commas with semicolons to avoid CSV issues
          }
        });
        rows.push(rowData);
      });
     
      // Convert to CSV format
      let csvContent = headers.join(',') + '\n';
      rows.forEach(row => {
        csvContent += row.join(',') + '\n';
      });
     
      // Create a hidden link and trigger the download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
     
      link.setAttribute('href', url);
      link.setAttribute('download', `intern_data_${timestamp}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
