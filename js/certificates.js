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
            col.className = 'col-8 col-sm-6 col-md-4 col-lg-3 mb-4'; // Adjust column sizes for different screen sizes

            const card = document.createElement('div');
            card.className = 'card'; // Ensure cards have equal height
            card.style = 'background-color:rgba(247, 247, 247, 0.9); backdrop-filter: blur(8px);';
            card.innerHTML = `
                <img src="${certificate.image}" class="card-img-top" style="padding: 5px;" alt="${certificate.title}">
                <div class="card-body">
                    <h5 class="card-title">${certificate.title}</h5>
                    <p class="card-text">${certificate.description}</p>
                </div>
            `;

            col.appendChild(card);
            row.appendChild(col);
        });

        certificatesContainer.appendChild(row);
    }

    loadCertificates();
});