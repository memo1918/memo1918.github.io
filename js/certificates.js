document.addEventListener('DOMContentLoaded', function() {
    const certificatesContainer = document.getElementById('certificates-container');

    function loadCertificates() {
        fetch('../data/certificates.json')
            .then(response => response.json())
            .then(data => {
                generateCertificateCards(data.certificates);
            })
            .catch(error => console.error('Error loading certificates:', error));
    }

    function generateCertificateCards(certificates) {
        const row = document.createElement('div');
        row.className = 'row justify-content-center';

        certificates.forEach((certificate) => {
            const col = document.createElement('div');
            col.className = 'col-10 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"'; // Adjust column sizes for different screen sizes

            const card = document.createElement('div');
            card.className = 'card '; // Ensure cards have equal height
            card.style = 'background-color: var(--background-color);box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: none;';
            card.innerHTML = `
                <a href="${certificate.image}" target="_blank">
                    <img src="${certificate.image}" class="card-img-top" alt="${certificate.title}">
                </a>
                <div class="card-body">
                    <h4 class="card-title">${certificate.title}</h4>
                    <small class="card-text">${certificate.description}</small>
                </div>
            `;

            col.appendChild(card);
            row.appendChild(col);
        });

        certificatesContainer.appendChild(row);
    }

    loadCertificates();
});