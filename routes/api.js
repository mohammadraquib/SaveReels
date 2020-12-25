var express = require('express');
var router = express.Router();
var SaveReels = require('../modules/savereels');

// Get Reel Info
router.get('/info', async (req, res, next) => {
    if(req.query.url) {
        var reelUrl = req.query.url;
        var shortcode = await SaveReels.getReelCode(reelUrl);
        if(shortcode) {
            try {
                var request = await SaveReels.getReelInfo(shortcode);
                var response = request.data;
                res.json({
                    status: 'ok',
                    reel: {
                        id: response.graphql.shortcode_media.id,
                        shortcode: response.graphql.shortcode_media.shortcode,
                        thumbnail: response.graphql.shortcode_media.display_url,
                        download_url: response.graphql.shortcode_media.video_url
                    }
                });
            } catch(err) {
                res.json({
                    status: 'fail',
                    error: 'The URL you provided was either invalid or from a private account.'
                });
            }
        } else {
            res.json({
                status: 'fail',
                error: 'The URL you provided was not a valid Instagram Reel URL.'
            });
        }
    } else {
        res.json({
            status: 'fail',
            error: 'The URL is not provided.'
        });
    }
});

module.exports = router;
