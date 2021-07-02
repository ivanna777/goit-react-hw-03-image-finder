import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '20828965-4298cb7d6f87f653ca708a263';

const fetchImages = (name, page) => {
    return axios
        .get(`${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response=> response.data.hits)
}

export {fetchImages} 