function goTo(url) {
    document.body.classList.add("page-transition");
    setTimeout(() => window.location.href = url, 450);
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadMovie() {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const m = await res.json();

    document.getElementById("movieDetail").innerHTML = `
        <div class="max-w-3xl mx-auto bg-gray-800 rounded-xl p-6">
            <img src="${m.image.original}" class="w-full rounded-xl mb-5">
            <h1 class="text-4xl font-bold mb-4">${m.name}</h1>

            <p class="text-gray-300 mb-4">${m.summary}</p>

            <div class="flex flex-wrap gap-4 text-gray-400">
                <p><b>Janr:</b> ${m.genres.join(", ")}</p>
                <p><b>Reytinq:</b> ${m.rating.average}</p>
                <p><b>Tarix:</b> ${m.premiered}</p>
            </div>
        </div>
    `;
}

loadMovie();
