const axios = require('axios')

const SaveReels = {
    getReelCode: async (url) => {
        if(/(https?:\/\/(?:www\.)?instagram\.com\/reel\/([^/?#&]+)).*/.test(url)) {
            var matches = url.match(/(https?:\/\/(?:www\.)?instagram\.com\/(reel|p)\/([^/?#&]+)).*/);
            return matches[3];
        } else {
            return false;
        }
    },
    getReelInfo: async (shortcode) => {
        var response = await axios.get(`https://www.instagram.com/reel/${shortcode}/`, {
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
            },
            params: {
                __a: 1
            },
            responseType: 'json'
        });
        return response;
    }
}

module.exports = SaveReels