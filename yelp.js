import axios from 'axios';
import querystring from 'querystring';
import fs from 'fs'; 
import lr from 'readline';

class Yelp {
    constructor() {
        this.access_token = null;
        this.restaurants = null;
        this.restaurantDetails = 'hi';
        this.reviews = 'hey';
    }

    async readReviews(){ 
        try{
            return new Promise((resolve, reject)=>{ 
                
                    this.reviews = []; 
                    
                    lineReader = lr.createInterface({ 
                        input: fs.createReadStream('review.json') 
                    }); 
                    
                    lineReader.on('line', (review)=>{ 
                        this.reviews.push(review); 
                    }); 
                    
                    lineReader.on('close', ()=>{ 
                        resolve(this.reviews); 
                    }); 
                });
        }
        
        catch(err){
            console.log(err);
        }
        
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
    }

    async getRestaurants() {
        let response = await axios({
            url: 'https://api.yelp.com/v3/businesses/search',
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + this.access_token
            },
            params: {
                category: 'food',
                latitude: 34.270550,
                longitude: -118.519401,
            }
        });
        
        this.restaurants = response.data.businesses;
    }

    async getRestaurantDetails() {

        try{
            let response = await axios({
                url: 'https://api.yelp.com/v3/businesses/presto-pasta-granada-hills',
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + this.access_token
                }
            });

            this.restaurantDetails = response.data;
        }

        catch (err){
            console.log(err);
        }
    }
}

async function init() {
    let yelp = new Yelp();
    //await yelp.authorize();
    //await yelp.getRestaurants();
    //await yelp.getRestaurantDetails();
    await yelp.readReviews();
    console.log('hey');
    console.log(yelp.reviews.count);
}

init();

