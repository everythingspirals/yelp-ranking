import axios from 'axios';
import querystring from 'querystring';

class Yelp {

    authorize() {
        axios({
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
        })
            .then(response => {
                this.access_token = response.data.access_token;
                console.log(this.access_token);
            })
            .catch(err => {
                console.log(err)
            });
    }
}

let yelp = new Yelp();

yelp.authorize();
