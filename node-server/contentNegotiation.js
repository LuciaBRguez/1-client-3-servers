var http = require('http'),
    url = require('url'),
    Negotiator = require('negotiator'),
    creativeWork = require('./creativeWork.js'),
    publicationVolume = require('./publicationVolume.js'),
    softwareApplication = require('./softwareApplication.js');

http.createServer(process).listen(3000);
console.log("Server booted.");

function process (req, res) {
    
    // Obtaining URI
    var urlparsed = url.parse(req.url, true);
    var path = urlparsed.pathname;
    
    // Show the entities
    if (path=='/'){
        switch (req.method) {
            case 'GET':
                res.setHeader('content-type',"application/json"); 
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
                showCreativeWorks(req, res);
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
                showPublicationVolume(req, res);
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
                showSoftwareApplication(req, res);
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
                listCreativeWork(id, req, res);
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
                listPublicationVolume(id, req, res);
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
                    listSoftwareApplication(id, req, res);
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