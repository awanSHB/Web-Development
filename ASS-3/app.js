function getRecommendations() {
    // Fetch user preferences from the form
    const genre = document.getElementById('genre').value;
    const releaseYear = document.getElementById('release-year').value;

    // Fetch movie data from TMDb API (replace YOUR_TMDB_API_KEY with your actual API key)
    const apiKey = 'a0573f6636e87863323ff4f4648431c4';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&primary_release_year=${releaseYear}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch movie data');
            }
            return response.json();
        })
        .then(data => {
            // Process and filter movie data based on user preferences (use map, reduce, filter)
            const recommendations = data.results.map(movie => ({
                title: movie.title,
                releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
                posterPath: movie.poster_path, // Add poster path
                // Add other relevant movie details
            }));

            // Display recommendations on the HTML page
            displayRecommendations(recommendations);

            // Store recommendations in local storage
            saveRecommendations(recommendations);
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            alert('Failed to fetch recommendations. Please try again later.');
        });
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations-container');
    
    // Clear previous recommendations
    container.innerHTML = '';

    // Add new recommendations
    recommendations.forEach(movie => {
        const movieInfo = `
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="release-year">Release Year: ${movie.releaseYear}</p>
                ${movie.posterPath ? `<img class="poster-img" src="https://image.tmdb.org/t/p/w300${movie.posterPath}" alt="${movie.title} Poster">` : ''}
                <!-- Add other relevant movie details -->
            </div>`;
        container.innerHTML += movieInfo;
    });
}

function saveRecommendations(recommendations) {
    // Save recommendations in local storage
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
}

// function getGenreNames(genreIds) {
//     // Assuming you have a mapping of genre IDs to genre names
//     const genreMap = {
//         28: 'Action',
//         12: 'Adventure',
//         16: 'Animation',
//         // Add more genre mappings as needed
//     };

//     const genreNames = genreIds.map(id => genreMap[id] || 'Unknown');
//     return genreNames.join(', ');
// }


// Check if there are previous recommendations in local storage and display them
const previousRecommendations = JSON.parse(localStorage.getItem('recommendations'));
if (previousRecommendations) {
    displayRecommendations(previousRecommendations);
}

function reset(){
    const container = document.getElementById('recommendations-container');
    container.reset;
}
