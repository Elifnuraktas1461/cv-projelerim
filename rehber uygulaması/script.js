const contactForm = document.getElementById('contact-form');
const viewContactsButton = document.getElementById('view-contacts');

// Kayıtlı kişileri saklamak için bir array
let contacts = [];

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name && phone) {
        contacts.push({ name, phone });
        alert(`${name} kişisi rehbere eklendi!`);

        // Formu temizle
        contactForm.reset();
    }
});

viewContactsButton.addEventListener('click', function() {
    const contactWindow = window.open('', '_blank');
    contactWindow.document.write(`
        <html>
            <head>
                <title>Kayıtlı Kişiler</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        background: #f9f9f9;
                        margin: 5px 0;
                        padding: 10px;
                        border: 1px solid #ddd;
                    }
                </style>
            </head>
            <body>
                <h1>Kayıtlı Kişiler</h1>
                <ul>
                    ${contacts.map(contact => `<li>${contact.name} - ${contact.phone}</li>`).join('')}
                </ul>
            </body>
        </html>
    `);
});