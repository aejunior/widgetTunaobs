import axios from 'axios';

const tunaobsClient = axios.create({
    baseURL: 'http://127.0.0.1:1608',
});

function getPlaying() {
    return tunaobsClient.get('/');
}
export { getPlaying }