import axios from "axios";
const googleKey = process.env.REACT_APP_GOOGLE_GEOCODER_KEY;
const weatherKey = process.env.REACT_APP_WEATHERBIT_KEY;

export default {
    getWeather: function(address) {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`)
            .then(res => {
                if (res.data.results[0]) {
                    const { lat, lng } = res.data.results[0].geometry.location;
                    return axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherKey}&units=I&days=7`);
                }
            })
            .catch(err => console.log(err));
    }
}