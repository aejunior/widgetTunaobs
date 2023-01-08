import axios from 'axios';


const googleApiClient = axios.create({
    baseURL: 'https://chart.googleapis.com',
});

type qrProperties = {
    cht: string; // qr
    chl: string;
    size: string; //Array<number>; || 400x400 
    choe: string; // choe = 'UTF-8'
}

async function generateQr({cht= 'qr', chl, choe='UTF-8', size='250x250'}: qrProperties) {
    return await googleApiClient.get('/chart', { params: {cht, chl, choe, size}});
}

export { generateQr }