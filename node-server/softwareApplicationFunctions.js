const {SoftwareApplication} = require("./softwareApplication.js");
var Type = require('type-of-is');
var idSoftwareApplication = 0;

// Array of softwareApplication objects
let softwareApplicationArray = [];

// Create a new Object softwareApplication
let softwareApplication = new SoftwareApplication();
softwareApplication.update(0, "softwareApplication", 7, 2003, "Spanish", true, "category", "subCategory", "suite", "200Mb");
softwareApplicationArray.push(softwareApplication);


// Exported functions
// Callback next
exports.getSoftwareApplication = function(id, next) {
    console.log(`Searching softwareApplication with id: ${id}`);
    let foundId = false;
    for (let i=0; i<softwareApplicationArray.length; i++){
        if(softwareApplicationArray[i].idCreativeWork == id){
            let softwareApplication = {"@context":"http://schema.org","@type":"SoftwareApplication","id":softwareApplicationArray[i].idCreativeWork,"alternativeHeadline":softwareApplicationArray[i].alternativeHeadline,"commentCount":softwareApplicationArray[i].commentCount,"copyrightYear":softwareApplicationArray[i].copyrightYear,"inLanguage":softwareApplicationArray[i].inLanguage,"isAccessibleForFree":softwareApplicationArray[i].isAccessibleForFree,"applicationCategory":softwareApplicationArray[i].applicationCategory,"applicationSubCategory":softwareApplicationArray[i].applicationSubCategory,"applicationSuite":softwareApplicationArray[i].applicationSuite,"fileSize":softwareApplicationArray[i].fileSize}; 
            foundId = true;
            next(null, softwareApplication);
        }
    }
    if(!foundId){
        next(new Error("Cannot find softwareApplication with id: " + id));
    }
};

exports.postSoftwareApplication = function (alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize, next) {
	if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccessibleForFree == null) next("Mandatory isAccessibleForFree field.");
    else if (applicationCategory == null) next("Mandatory applicationCategory field.");
    else if (applicationSubCategory == null) next("Mandatory applicationSubCategory field.");
    else if (applicationSuite == null) next("Mandatory applicationSuite field.");
    else if (fileSize == null) next("Mandatory fileSize field.");
    else if (!Type.is(alternativeHeadline,String)) next("alternativeHeadline must be boolean");
	else if (!Type.is(commentCount,Number)) next("commentCount must be boolean");
	else if (!Type.is(copyrightYear,Number)) next("copyrightYear must be boolean");
	else if (!Type.is(inLanguage,String)) next("inLanguage must be boolean");
    else if (!Type.is(isAccessibleForFree,Boolean)) next("isAccessibleForFree must be boolean");
    else if (!Type.is(applicationCategory,String)) next("applicationCategory must be boolean");
    else if (!Type.is(applicationSubCategory,String)) next("applicationSubCategory must be boolean");
    else if (!Type.is(applicationSuite,String)) next("applicationSuite must be boolean");
    else if (!Type.is(fileSize,String)) next("fileSize must be boolean");
	else {
        idSoftwareApplication++;
		let softwareApplication = new SoftwareApplication();
		softwareApplication.update(idSoftwareApplication, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize);
		softwareApplicationArray.push(softwareApplication);
		next(null,idSoftwareApplication+"");
	}
};

exports.deleteSoftwareApplication = function (id, next) {
    let foundId = false;
    for (let i=0; i<softwareApplicationArray.length; i++){
		if(softwareApplicationArray[i].idCreativeWork == id){
            softwareApplicationArray.splice(softwareApplicationArray.indexOf(softwareApplicationArray[i]),1);
            foundId = true;
            next(null, softwareApplicationArray);
        }
    }
    if(!foundId){
        next(new Error("Non-existent softwareApplication with id: " + id));
    }
};

exports.putSoftwareApplication = function(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize, next) {
    if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccessibleForFree == null) next("Mandatory isAccessibleForFree field.");
    else if (applicationCategory == null) next("Mandatory applicationCategory field.");
    else if (applicationSubCategory == null) next("Mandatory applicationSubCategory field.");
    else if (applicationSuite == null) next("Mandatory applicationSuite field.");
    else if (fileSize == null) next("Mandatory fileSize field.");
    else if (!Type.is(alternativeHeadline,String)) next("alternativeHeadline must be boolean");
	else if (!Type.is(commentCount,Number)) next("commentCount must be boolean");
	else if (!Type.is(copyrightYear,Number)) next("copyrightYear must be boolean");
	else if (!Type.is(inLanguage,String)) next("inLanguage must be boolean");
    else if (!Type.is(isAccessibleForFree,Boolean)) next("isAccessibleForFree must be boolean");
    else if (!Type.is(applicationCategory,String)) next("applicationCategory must be boolean");
    else if (!Type.is(applicationSubCategory,String)) next("applicationSubCategory must be boolean");
    else if (!Type.is(applicationSuite,String)) next("applicationSuite must be boolean");
    else if (!Type.is(fileSize,String)) next("fileSize must be boolean");
    else {
        let foundId = false; 
        let softwareApplication = new SoftwareApplication();
        for (let i=0; i<softwareApplicationArray.length; i++){
            if(softwareApplicationArray[i].idCreativeWork == id){
                softwareApplication.update(softwareApplicationArray[i].idCreativeWork, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize);
                softwareApplicationArray[i] = softwareApplication;
                foundId = true;
                next(null, softwareApplicationArray);
            }
        }
        if(!foundId){
            next(new Error("Couldn't find softwareApplication. Non-existent softwareApplication with id: " + id)); 
        } 
    }
};


// Content negotiation
// HTML
exports.toHTML = function() {
    return '<ul>' + softwareApplicationArray.map(function(softwareApplication, i){
       return '<li>' + softwareApplicationArray[i].idCreativeWork +' '+softwareApplication.alternativeHeadline + ' ' + softwareApplication.commentCount + ' ' + softwareApplication.copyrightYear + ' ' + softwareApplication.inLanguage + ' ' + softwareApplication.isAccessibleForFree + ' ' + softwareApplication.applicationCategory + ' ' + softwareApplication.applicationSubCategory + ' ' + softwareApplication.applicationSuite + ' ' + softwareApplication.fileSize + '</li>';
    }).join('') + '</ul>' ;
}; 
   
// Text
exports.toText = function() {
return softwareApplicationArray.map(function(softwareApplication, i){
    return ' - ' + softwareApplicationArray[i].idCreativeWork +' '+ softwareApplication.alternativeHeadline + ' ' + softwareApplication.commentCount + ' ' + softwareApplication.copyrightYear + ' ' + softwareApplication.inLanguage + ' ' + softwareApplication.isAccessibleForFree + ' ' + softwareApplication.applicationCategory + ' ' + softwareApplication.applicationSubCategory + ' ' + softwareApplication.applicationSuite + ' ' + softwareApplication.fileSize + '\n';
    }).join('');	
};

// Json
exports.toJson = function() {
    let send=[];
    for(let i=0; i<softwareApplicationArray.length; i++){
        let jsonSend={"@context":"http://schema.org","@type":"SoftwareApplication","id":softwareApplicationArray[i].idCreativeWork,"alternativeHeadline":softwareApplicationArray[i].alternativeHeadline,"commentCount":softwareApplicationArray[i].commentCount,"copyrightYear":softwareApplicationArray[i].copyrightYear,"inLanguage":softwareApplicationArray[i].inLanguage,"isAccessibleForFree":softwareApplicationArray[i].isAccessibleForFree,"applicationCategory":softwareApplicationArray[i].applicationCategory,"applicationSubCategory":softwareApplicationArray[i].applicationSubCategory,"applicationSuite":softwareApplicationArray[i].applicationSuite,"fileSize":softwareApplicationArray[i].fileSize};
        send.push(jsonSend);
    }
    return JSON.stringify(send);
};