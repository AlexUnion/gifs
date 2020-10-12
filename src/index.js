import './index.scss';

const form = document.getElementById('form');
const container = document.getElementById('app');
const input = document.getElementById('search');

const request = {
    baseUrl: 'http://api.giphy.com/v1/gifs',
    apiKey: 'hESsrNrWyarAb9DDrREtirb1uzzkbChi',

    search(text) {
        return `${this.getUrl('search')}&q=${text}`;
    },
    getUrl(type = 'trending') {
        return `${this.baseUrl}/${type}?api_key=${this.apiKey}&limit=5`;
    },
};

function getPictures(url) {
    return fetch(url)
        .then((body) => body.json());
}

function renderPictures(req = request.getUrl()) {
    getPictures(req)
        .then(({ data }) => {
            container.innerHTML = '';
            data.forEach((item) => {
                const { url } = item.images.fixed_height;
                const picture = document.createElement('img');
                picture.setAttribute('src', url);
                container.insertAdjacentElement('beforeend', picture);
            });
        });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = input.value;
    if (query) {
        const url = request.search(query);
        renderPictures(url);
    } else {
        renderPictures();
    }
});

renderPictures();
