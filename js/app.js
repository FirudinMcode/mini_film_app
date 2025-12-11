const API_URL = "https://api.tvmaze.com/shows";
let movies = [];
let filtered = [];
let page = 1;
const limit = 16;

const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const pageNumber = document.getElementById("pageNumber");

function goTo(url) {
    document.body.classList.add("page-transition");
    setTimeout(() => window.location.href = url, 450);
}

async function fetchMovies() {
    const res = await fetch(API_URL);
    movies = await res.json();
    filtered = movies;

    initHorizontalSlider(); 
    renderMovies();
}

function initHorizontalSlider() {
    const randomSlides = movies.slice(0, 25);
    const track = document.getElementById("h-track");

    track.innerHTML = randomSlides.map(m => `
        <div class="h-slide" style="background-image:url('${m.image?.medium}')"
             onclick="goTo('./pages/movie.html?id=${m.id}')">
            <div class="h-slide-title">${m.name}</div>
        </div>
    `).join("");
}

document.getElementById("h-next").onclick = () => scrollHSlider(1);
document.getElementById("h-prev").onclick = () => scrollHSlider(-1);

function scrollHSlider(dir) {
    const track = document.getElementById("h-track");
    const slideWidth = track.querySelector('.h-slide').offsetWidth + 20; 
    track.scrollBy({
        left: slideWidth * dir,
        behavior: "smooth"
    });
}

function renderMovies() {
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    movieList.innerHTML = items.map(m => `
        <a onclick="goTo('./pages/movie.html?id=${m.id}')">
            <div class="movie-card">
                <img src="${m.image?.medium}" class="w-full h-64 object-cover" />
                <div class="p-4">
                    <h3 class="text-xl font-semibold">${m.name}</h3>
                    <p class="text-gray-400">${m.genres.join(", ")}</p>
                </div>
            </div>
        </a>
    `).join("");

    pageNumber.textContent = `Səhifə: ${page}`;
}

searchInput.addEventListener("input", () => {
    const val = searchInput.value.toLowerCase();
    filtered = movies.filter(m => m.name.toLowerCase().includes(val));
    page = 1;
    renderMovies();
});

genreFilter.addEventListener("change", () => {
    const genre = genreFilter.value;
    filtered = genre ? movies.filter(m => m.genres.includes(genre)) : movies;
    page = 1;
    renderMovies();
});

document.getElementById("nextPage").onclick = () => {
    if (page * limit < filtered.length) page++;
    renderMovies();
};

document.getElementById("prevPage").onclick = () => {
    if (page > 1) page--;
    renderMovies();
};

fetchMovies();
