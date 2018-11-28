var http = require('http'),
    url = require('url'),
    Negotiator = require('negotiator'),
    creativeWork = require('./creativeWork.js'),
    //publicationVolume = require('./publicationVolume.js'),
    //softwareApplication = require('./softwareApplication.js'),
    availableMediaTypes = ['text/html', 'text/plain', 'application/ld+json', 'application/xml'];


// Creating server
http.createServer(process).listen(3000);
console.log("Server booted.");


// Processing URI
function process (req, res) {
    
    // Obtaining URI
    var urlparsed = url.parse(req.url, true);
    var path = urlparsed.pathname;
    
    // get the entities if URI exists
    if (path=='/'){
        switch (req.method) {
            case 'GET':
                res.setHeader('content-type',"application/json"); 
                res.write('{\"1\":\"CreativeWork\",\"2\":\"publicationVolume\",\"3\":\"softwareApplication\"}');
                res.end();
                break;
            default:
                notAllowed("Not supported method.", res);
                break;
        }

    // Entities without id
    // creativeWork
    }else if (path=='/creativeWork'){
        switch (req.method) {
            case 'GET': 
                getCreativeWork(req, res);
                break;
            case 'POST':
                parseBody(req, res, createCreativeWork); 
                break;
            default:
                notAllowed("Not supported method.", res);
                break;
        }
    // publicationVolume
    }else if(path=='/publicationVolume'){
        switch (req.method) {
            case 'GET': 
                getPublicationVolume(req, res);
                break;
            case 'POST':
                parseBody(req, res, createPublicationVolume); 
                break;
            default:
                notAllowed("Not supported method.",res);
                break;
        }
    // softwareApplication
    }else if(path=='/softwareApplication'){
        switch (req.method) {
            case 'GET': 
                getSoftwareApplication(req, res);
                break;
            case 'POST':
                parseBody(req, res, createSoftwareApplication); 
                break;
            default:
                notAllowed("Not supported method.", res);
                break;
        }

    // Entities with id
    // creativeWork
    }else if (path.startsWith('/creativeWork/')){
        let id = path.split('/')[2];
        switch (req.method) {
            case 'GET': 
                getIdCreativeWork(id, req, res);
                break;
            case 'DELETE':
                deleteCreativeWork(id, req, res);
                break;
            case 'PUT':
                parseBody(req, res, function (post) {
                    modifyCreativeWork(post, id, req, res);
                });
                break;
            default:
                notAllowed("Not supported method.", res);
                break;
        }
    // publicationVolume
    }else if (path.startsWith('/publicationVolume/')){
        let id = path.split('/')[2];
        switch (req.method) {
            case 'GET': 
                getIdPublicationVolume(id, req, res);
                break;
            case 'DELETE':
                deletePublicationVolume(id, req, res);
                break;
            case 'PUT':
                parseBody(req, res, function (post) {
                    modifyPublicationVolume(post, id, req, res);
                });
                break;
            default:
                notAllowed("Not supported method.", res);
                break;
        };
    // softwareApplication
    }else if (path.startsWith('/softwareApplication/')){
            let id = path.split('/')[2];
            switch (req.method) {
                case 'GET': 
                    getIdSoftwareApplication(id, req, res);
                    break;
                case 'DELETE':
                    deleteSoftwareApplication(id, req, res);
                    break;
                case 'PUT':
                    parseBody(req, res, function (post) {
                        modifySoftwareApplication(post, id, req, res);
                    });
                    break;
                default:
                    notAllowed("Not supported method.", res);
                    break;
                };
    }else{
        notAllowed("Non-existent URI.", res);
    }
}


// Content negotiation in creativeWork
function getCreativeWork(req, res) {
	var negotiator = new Negotiator(req);
	var mediaType = negotiator.mediaType(availableMediaTypes);
	console.log("Mediatype selected: " + mediaType);
	switch (mediaType) {
	case 'text/plain':
		res.setHeader('content-type',mediaType);
		res.end(creativeWork.toText());
		break;
	case 'application/xml': 
		res.setHeader('content-type',mediaType);
		res.end(creativeWork.toXML());
		break;
	case 'application/ld+json': 
		res.setHeader('content-type',mediaType);
		res.end(creativeWork.toJson());
		break;
	case 'text/html':
	default:
		res.setHeader('content-type','text/html');
		res.end(creativeWork.toHTML());	
	}
}


// Try to execute methods knowing id
function getIdCreativeWork(id, req, res) {
	creativeWork.getCreativeWork(id, function (err,creativeWork) {
		if (err) notAllowed("Couldn't find creativeWork with id: " + id, res);
		else {
			res.write(JSON.stringify(creativeWork));
			res.end();
		}
	});
}

function deleteCreativeWork(id, req, res) {
	console.log("Deleting creativeWork with id: " + id);
	creativeWork.deleteCreativeWork(id, function(err, creativeWork) {
	 if (err) notAllowed("Couldn't delete creativeWork with id: " + id, res);
	 else{
		res.statusCode = 200;
		res.end(); 
	 }
	});
}

function createCreativeWork(post, req, res) {
	console.log(post);
	let alternativeHeadline = post.alternativeHeadline,
		commentCount = post.commentCount,
		copyrightYear = post.copyrightYear,
		inLanguage = post.inLanguage,
		isAccesibleForFree = post.isAccesibleForFree;
	console.log("Creating creativeWork.");
    creativeWork.insertCreativeWork(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, function(err, id) {
    	if (err) notAllowed("Couldn't create creativeWork.", res);
    	else{
			res.statusCode = 200;
			res.write(id);
			res.end(); 
		} 
    });
}

function modifyCreativeWork(post, id, req, res) {
	let alternativeHeadline = post.alternativeHeadline,
        commentCount = post.commentCount,
        copyrightYear = post.copyrightYear,
        inLanguage = post.inLanguage,
        isAccesibleForFree = post.isAccesibleForFree;
	creativeWork.modifyCreativeWork(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, function(err, als) {
		if (err) notAllowed("Couldn't modify creativeWork with id: " + id, res);
		else{
			res.statusCode = 200;
			res.end(); 
		}
	});
}


// parseBody
function parseBody(req, res, next) {
	var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) {
        	console.log("Body too big!");
            req.connection.destroy();
        }
    });
    req.on('end', function () {
		var post = JSON.parse(body);
        next(post, req, res);
    });
}


// notAllowed
function notAllowed(msg, res) {
	res.statusCode = 405;
	res.write(msg);
	res.end();
}