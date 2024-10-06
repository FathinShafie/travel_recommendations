document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('recommendations')) {
        let currentIndex = 0;
        const itemsPerPage = 2; // Number of recommendations to load each time
        const recommendationsDiv = document.getElementById('recommendations');
        const loadMoreButton = document.getElementById('loadMore');

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                displayRecommendations(data.recommendations);
                loadMoreButton.onclick = () => loadMore(data.recommendations);
            })
            .catch(error => console.error('Error fetching data:', error));

        function displayRecommendations(recommendations) {
            const end = Math.min(currentIndex + itemsPerPage, recommendations.length);
            for (let i = currentIndex; i < end; i++) {
                const rec = recommendations[i];
                const recDiv = document.createElement('div');
                recDiv.className = 'recommendation';
                recDiv.innerHTML = `
                    <h3>${rec.destination}</h3>
                    <p>${rec.description}</p>
                    <p><strong>Best time to visit:</strong> ${rec.bestTime}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${rec.location}</p>
                `;
                recommendationsDiv.appendChild(recDiv);
            }
            currentIndex = end;
            if (currentIndex >= recommendations.length) {
                loadMoreButton.style.display = 'none';
            }
        }

        function loadMore(recommendations) {
            displayRecommendations(recommendations);
        }
    }

    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});
