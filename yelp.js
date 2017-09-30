import axios from 'axios';
import querystring from 'querystring';

class Yelp {
    constructor() {
        this.access_token = null;
    }

    async authorize() {
        let response = await axios({
            url: 'https://api.yelp.com/oauth2/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify({
                "grant_type": "client_credentials",
                "client_id": "V14i49eeYFj1PRL8u0iIEg",
                "client_secret": "k4pfaDYPnzg7fi2dMQRvKAeo1EgaFm7k6y2MijMIqihetWoMZeg0QWxb4uen4vp9"
            })
        });

        this.access_token = response.data.access_token;
        return true;
    }

    async getResturants() {

        axios({
            url: 'https://api.yelp.com/v3/businesses/search',
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token
            },
            params: {
                latitude: 34.270550,
                longitude: -118.519401
            }
        })
            .then(response => {
                console.log(response.data.businesses[0,10]);
            })
            .catch(err => {
                console.log(err)
            });
    }
}

async function init() {
    let yelp = new Yelp();
    await yelp.authorize();
    console.log(yelp.access_token);
    yelp.getResturants();
}

init();

