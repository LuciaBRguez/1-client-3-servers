var http = require('http'),
    url = require('url'),
    Negotiator = require('negotiator'),
    creativeWork = require('./creativeWorkFunctions.js'),
    publicationVolume = require('./publicationVolumeFunctions.js'),
    softwareApplication = require('./softwareApplicationFunctions.js'),
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
                parseBody(req, res, postCreativeWork); 
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
                parseBody(req, res, postPublicationVolume); 
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
                parseBody(req, res, postSoftwareApplication); 
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
                    putCreativeWork(post, id, req, res);
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
                    putPublicationVolume(post, id, req, res);
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
                        putSoftwareApplication(post, id, req, res);
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


// creativeWork
// Content negotiation
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
	creativeWork.getCreativeWork(id, function (err, creativeWork) {
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

function postCreativeWork(post, req, res) {
	console.log(post);
	let alternativeHeadline = post.alternativeHeadline,
		commentCount = post.commentCount,
		copyrightYear = post.copyrightYear,
		inLanguage = post.inLanguage,
		isAccesibleForFree = post.isAccesibleForFree;
	console.log("Creating creativeWork.");
    creativeWork.postCreativeWork(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, function(err, id) {
    	if (err) notAllowed("Couldn't post creativeWork.", res);
    	else{
			res.statusCode = 200;
			res.write(id);
			res.end(); 
		} 
    });
}

function putCreativeWork(post, id, req, res) {
	let alternativeHeadline = post.alternativeHeadline,
        commentCount = post.commentCount,
        copyrightYear = post.copyrightYear,
        inLanguage = post.inLanguage,
        isAccesibleForFree = post.isAccesibleForFree;
	creativeWork.putCreativeWork(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, function(err, als) {
		if (err) notAllowed("Couldn't put creativeWork with id: " + id, res);
		else{
			res.statusCode = 200;
			res.end(); 
		}
	});
}


// publicationVolume
// Content negotiation
function getPublicationVolume(req, res) {
	var negotiator = new Negotiator(req);
	var mediaType = negotiator.mediaType(availableMediaTypes);
	console.log("Mediatype selected: " + mediaType);
	switch (mediaType) {
	case 'text/plain':
		res.setHeader('content-type',mediaType);
		res.end(publicationVolume.toText());
		break;
	case 'application/xml': 
		res.setHeader('content-type',mediaType);
		res.end(publicationVolume.toXML());
		break;
	case 'application/ld+json': 
		res.setHeader('content-type',mediaType);
		res.end(publicationVolume.toJson());
		break;
	case 'text/html':
	default:
		res.setHeader('content-type','text/html');
		res.end(publicationVolume.toHTML());	
	}
}

// Try to execute methods knowing id
function getIdPublicationVolume(id, req, res) {
	publicationVolume.getPublicationVolume(id, function (err, publicationVolume) {
		if (err) notAllowed("Couldn't find publicationVolume with id: " + id, res);
		else {
			res.write(JSON.stringify(publicationVolume));
			res.end();
		}
	});
}

function deletePublicationVolume(id, req, res) {
	console.log("Deleting publicationVolume with id: " + id);
	publicationVolume.deletePublicationVolume(id, function(err, publicationVolume) {
	 if (err) notAllowed("Couldn't delete publicationVolume with id: " + id, res);
	 else{
		res.statusCode = 200;
		res.end(); 
	 }
	});
}

function postPublicationVolume(post, req, res) {
	console.log(post);
	let alternativeHeadline = post.alternativeHeadline,
		commentCount = post.commentCount,
		copyrightYear = post.copyrightYear,
		inLanguage = post.inLanguage,
        isAccesibleForFree = post.isAccesibleForFree,
        pageStart = post.pageStart,
        pageEnd = post.pageEnd,
        pagination = post.pagination,
        volumeNumber = post.volumeNumber;
	console.log("Creating publicationVolume.");
    publicationVolume.postPublicationVolume(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, pageStart, pageEnd, pagination, volumeNumber, function(err, id) {
    	if (err) notAllowed("Couldn't post publicationVolume.", res);
    	else{
			res.statusCode = 200;
			res.write(id);
			res.end(); 
		} 
    });
}

function putPublicationVolume(post, id, req, res) {
	let alternativeHeadline = post.alternativeHeadline,
        commentCount = post.commentCount,
        copyrightYear = post.copyrightYear,
        inLanguage = post.inLanguage,
        isAccesibleForFree = post.isAccesibleForFree;
        pageStart = post.pageStart,
        pageEnd = post.pageEnd,
        pagination = post.pagination,
        volumeNumber = post.volumeNumber;
	publicationVolume.putPublicationVolume(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, pageStart, pageEnd, pagination, volumeNumber, function(err, als) {
		if (err) notAllowed("Couldn't put publicationVolume with id: " + id, res);
		else{
			res.statusCode = 200;
			res.end(); 
		}
	});
}


// softwareApplication
// Content negotiation
function getSoftwareApplication(req, res) {
	var negotiator = new Negotiator(req);
	var mediaType = negotiator.mediaType(availableMediaTypes);
	console.log("Mediatype selected: " + mediaType);
	switch (mediaType) {
	case 'text/plain':
		res.setHeader('content-type',mediaType);
		res.end(softwareApplication.toText());
		break;
	case 'application/xml': 
		res.setHeader('content-type',mediaType);
		res.end(softwareApplication.toXML());
		break;
	case 'application/ld+json': 
		res.setHeader('content-type',mediaType);
		res.end(softwareApplication.toJson());
		break;
	case 'text/html':
	default:
		res.setHeader('content-type','text/html');
		res.end(softwareApplication.toHTML());	
	}
}


// Try to execute methods knowing id
function getIdSoftwareApplication(id, req, res) {
	softwareApplication.getSoftwareApplication(id, function (err, softwareApplication) {
		if (err) notAllowed("Couldn't find softwareApplication with id: " + id, res);
		else {
			res.write(JSON.stringify(softwareApplication));
			res.end();
		}
	});
}

function deleteSoftwareApplication(id, req, res) {
	console.log("Deleting softwareApplication with id: " + id);
	softwareApplication.deleteSoftwareApplication(id, function(err, softwareApplication) {
	 if (err) notAllowed("Couldn't delete softwareApplication with id: " + id, res);
	 else{
		res.statusCode = 200;
		res.end(); 
	 }
	});
}

function postSoftwareApplication(post, req, res) {
	console.log(post);
	let alternativeHeadline = post.alternativeHeadline,
		commentCount = post.commentCount,
		copyrightYear = post.copyrightYear,
		inLanguage = post.inLanguage,
		isAccesibleForFree = post.isAccesibleForFree,
		applicationCategory = post.applicationCategory,
		applicationSubCategory = post.applicationSubCategory,
		applicationSuite = post.applicationSuite,
		fileSize = post.fileSize;
	console.log("Creating softwareApplication.");
    softwareApplication.postSoftwareApplication(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize, function(err, id) {
    	if (err) notAllowed("Couldn't post softwareApplication.", res);
    	else{
			res.statusCode = 200;
			res.write(id);
			res.end(); 
		} 
    });
}

function putSoftwareApplication(post, id, req, res) {
	let alternativeHeadline = post.alternativeHeadline,
        commentCount = post.commentCount,
        copyrightYear = post.copyrightYear,
        inLanguage = post.inLanguage,
		isAccesibleForFree = post.isAccesibleForFree,
		applicationCategory = post.applicationCategory,
		applicationSubCategory = post.applicationSubCategory,
		applicationSuite = post.applicationSuite,
		fileSize = post.fileSize;
	softwareApplication.putSoftwareApplication(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize, function(err, als) {
		if (err) notAllowed("Couldn't put softwareApplication with id: " + id, res);
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