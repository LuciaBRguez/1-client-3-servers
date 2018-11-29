const {SoftwareApplication} = require("./softwareApplication.js");

// Array of softwareApplication objects
let softwareApplicationArray = [];

// Create a new Object softwareApplication
let softwareApplication = new SoftwareApplication();
softwareApplication.update("softwareApplication", 7, 2003, "Spanish", true, "category", "sub-category", "suite", "200Mb");
softwareApplicationArray.push(softwareApplication);


// Exported functions
// Callback next
exports.getSoftwareApplication = function(id, next) {
    console.log(`Searching softwareApplication with id: ${id}`);
    console.log(softwareApplicationArray);
    let softwareApplicationCheck = softwareApplicationArray[id];
    if (softwareApplicationCheck == undefined) 
      next(new Error("Cannot find softwareApplication with id: " + id));
    else{
      let softwareApplication = {"@context":"http://schema.org","@type":"softwareApplication","id":id,"alternativeHeadline":softwareApplicationArray[id].alternativeHeadline,"commentCount":softwareApplicationArray[id].commentCount,"copyrightYear":softwareApplicationArray[id].copyrightYear,"inLanguage":softwareApplicationArray[id].inLanguage,"isAccesibleForFree":softwareApplicationArray[id].isAccesibleForFree,"applicationCategory":softwareApplicationArray[id].applicationCategory,"applicationSubCategory":softwareApplicationArray[id].applicationSubCategory,"applicationSuite":softwareApplicationArray[id].applicationSuite,"fileSize":softwareApplicationArray[id].fileSize}; 
      next(null, softwareApplication);
    }
};

exports.postSoftwareApplication = function (alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize, next) {
	if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccesibleForFree == null) next("Mandatory isAccesibleForFree field.");
    else if (applicationCategory == null) next("Mandatory applicationCategory field.");
    else if (applicationSubCategory == null) next("Mandatory applicationSubCategory field.");
    else if (applicationSuite == null) next("Mandatory applicationSuite field.");
    else if (fileSize == null) next("Mandatory fileSize field.");
	else {
		let softwareApplication = new SoftwareApplication();
		softwareApplication.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize);
		softwareApplicationArray.push(softwareApplication);
		next(null,(softwareApplicationArray.length-1)+"");
	}
};

exports.deleteSoftwareApplication = function (id, next) {
    if (softwareApplicationArray[id] != undefined) { 
       softwareApplicationArray.splice(softwareApplicationArray.indexOf(softwareApplicationArray[id]),1);
       next(null, softwareApplicationArray);
    } else 
       next(new Error("Non-existent softwareApplication with id: " + id));
};

exports.putSoftwareApplication = function(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize, next) {
    if (softwareApplicationArray[id]!= undefined) {
       let softwareApplication = new SoftwareApplication();
       softwareApplication.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize);
       softwareApplicationArray[id] = softwareApplication;
       next(null, softwareApplicationArray);
    }
    else
       next(new Error("Couldn't find softwareApplication. Non-existent softwareApplication with id: " + id)) ; 
};


// Content negotiation
// HTML
exports.toHTML = function() {
    return '<ul>' + softwareApplicationArray.map(function(softwareApplication, i){
       return '<li>' + i +' '+softwareApplication.alternativeHeadline + ' ' + softwareApplication.commentCount + ' ' + softwareApplication.copyrightYear + ' ' + softwareApplication.inLanguage + ' ' + softwareApplication.isAccesibleForFree + ' ' + softwareApplication.applicationCategory + ' ' + softwareApplication.applicationSubCategory + ' ' + softwareApplication.applicationSuite + ' ' + softwareApplication.fileSize + '</li>';
    }).join('') + '</ul>' ;
}; 
   
// Text
exports.toText = function() {
return softwareApplicationArray.map(function(softwareApplication, i){
    return ' - ' + i +' '+ softwareApplication.alternativeHeadline + ' ' + softwareApplication.commentCount + ' ' + softwareApplication.copyrightYear + ' ' + softwareApplication.inLanguage + ' ' + softwareApplication.isAccesibleForFree + ' ' + softwareApplication.applicationCategory + ' ' + softwareApplication.applicationSubCategory + ' ' + softwareApplication.applicationSuite + ' ' + softwareApplication.fileSize + '\n';
    }).join('');	
};

// Json
exports.toJson = function() {
    let send=[];
    for(let i=0; i<softwareApplicationArray.length; i++){
        let jsonSend={"@context":"http://schema.org","@type":"softwareApplication","id":i,"alternativeHeadline":softwareApplicationArray[i].alternativeHeadline,"commentCount":softwareApplicationArray[i].commentCount,"copyrightYear":softwareApplicationArray[i].copyrightYear,"inLanguage":softwareApplicationArray[i].inLanguage,"isAccesibleForFree":softwareApplicationArray[i].isAccesibleForFree,"applicationCategory":softwareApplicationArray[id].applicationCategory,"applicationSubCategory":softwareApplicationArray[id].applicationSubCategory,"applicationSuite":softwareApplicationArray[id].applicationSuite,"fileSize":softwareApplicationArray[id].fileSize};
        send.push(jsonSend);
    }
    return JSON.stringify(send);
};

// XML
exports.toXML = function() {
    return '<softwareApplications>' + softwareApplicationArray.map(function(softwareApplication,i){
        return  '<softwareApplication id =' + i + '>' +
                '<alternativeHeadline>'+softwareApplication.alternativeHeadline+ '</alternativeHeadline>'+
                '<commentCount>' + softwareApplication.commentCount + '</commentCount>' +
                '<copyrightYear>' + softwareApplication.copyrightYear + '</copyrightYear>' +
                '<inLanguage>' + softwareApplication.inLanguage + '</inLanguage>' +
                '<isAccesibleForFree>' + softwareApplication.isAccesibleForFree + '</isAccesibleForFree>' +
                '<applicationCategory>' + softwareApplication.applicationCategory + '</applicationCategory>' +
                '<applicationSubCategory>' + softwareApplication.applicationSubCategory + '</applicationSubCategory>' +
                '<applicationSuite>' + softwareApplication.applicationSuite + '</applicationSuite>' +
                '<fileSize>' + softwareApplication.fileSize + '</fileSize>' +
                '</softwareApplication>';
    }).join('') +
    '</softwareApplications>';
};