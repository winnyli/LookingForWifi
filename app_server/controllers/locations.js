var request = require('request');

var apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV == 'production') {
    apiOptions.server = 'http://wuli.huahouye.com/getting-MEAN';
}

var renderHomepage = function(req, res){
    res.render('locations-list', { 
        title: '找WIFI' ,
        pageHeader: {
            title: '找WIFI',
            strapline: '随时随地共享WIFI生活!'
        },
        sidebar: '找WIFI帮你找到最近最稳定的WIFI热点，助你随时随地移动办公',
    });
};

module.exports.homelist = function(req, res){   
    renderHomepage(req, res);
};

var renderDatailPage = function(req, res, locDetail){
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: '详细信息由本页提供。您可以在这里享受免费而稳定的WIFI，继而进行移动办公。同时，这个地点还会提供茶水、小吃等温馨服务',
            callToAction: '如果您对本地点有任何想法，比如批评或者赞赏，请不要吝啬添加评论和打星'
        },
        location: locDetail
    });
}

var _showError = function(req, res, status){
    var title, content;
    if (status === 404) { 
        title = "404, page not found"; 
        content = "找不到网页了.";
    } else { 
        title = status + ", something's gone wrong"; 
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
}

var getLocationInfo = function(req, res, callback){
    var requestOptions, path;
    path = '/api/locations/' + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method : 'GET',
        json: {}
    };
    request(requestOptions, function(err, response, body){
        var data = body;
        if (response.statusCode === 200) {
            data.coords = {
            lng: body.coords[0],
            lat: body.coords[1]
            };
            callback(req, res, data);
        }else{
            _showError(req,res,response.statusCode);
        }
        
    })
}

module.exports.locationInfo = function(req, res){
    getLocationInfo(req, res, function(req, res, responseData){
        renderDatailPage(req, res, responseData);
    });
};

var renderReviewForm = function(req, res, locDetail){
    res.render('location-review-form', {
        title: '添加评论',
        pageHeader: {
            title: '点评'+ locDetail.name
        },
        error: req.query.err,
        url: req.originalUrl
    });
}

module.exports.addReview = function(req, res){
     getLocationInfo(req, res, function(req, res, responseData){
        renderReviewForm(req, res, responseData);
    });
};

module.exports.doAddReview = function(req, res){
    var requestOptions,
        path,
        locationid,
        postdata;

    locationid = req.params.locationid;
    path = '/api/locations/' + locationid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };

    requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };

    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/location/' + locationid + '/review/new?err=val');
    }else{
        request(requestOptions, function(err, response, body){
            if (response.statusCode === 201) {
                res.redirect('/location/' + locationid);
            }else if(response.statusCode === 400 && body.name && body.name === 'ValidationError'){
                res.redirect('/location/' + locationid + '/review/new?err=val');
            }
            else{
                _showError(req,res,response.statusCode);
            }
        })
    }

    
}