const {PublicationVolume} = require("./publicationVolume.js");
var idPublicationVolume = 0;

// Array of publicationVolume objects
let publicationVolumeArray = [];

// Create a new Object publicationVolume
let publicationVolume = new PublicationVolume();
publicationVolume.update(0, "publicationVolume", 5, 2001, "German", true, 1, 100, "pagination", 3);
publicationVolumeArray.push(publicationVolume);


// Exported functions
// Callback next
exports.getPublicationVolume = function(id, next) {
    console.log(`Searching publicationVolume with id: ${id}`);
    console.log(publicationVolumeArray);
    let publicationVolumeCheck = publicationVolumeArray[id];
    if (publicationVolumeCheck == undefined) 
      next(new Error("Cannot find publicationVolume with id: " + id));
    else{
      let publicationVolume = {"@context":"http://schema.org","@type":"publicationVolume","id":id,"alternativeHeadline":publicationVolumeArray[id].alternativeHeadline,"commentCount":publicationVolumeArray[id].commentCount,"copyrightYear":publicationVolumeArray[id].copyrightYear,"inLanguage":publicationVolumeArray[id].inLanguage,"isAccessibleForFree":publicationVolumeArray[id].isAccessibleForFree,"pageStart":publicationVolumeArray[id].pageStart,"pageEnd":publicationVolumeArray[id].pageEnd,"pagination":publicationVolumeArray[id].pagination,"volumeNumber":publicationVolumeArray[id].volumeNumber}; 
      next(null, publicationVolume);
    }
};

exports.postPublicationVolume = function (alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber, next) {
	if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccessibleForFree == null) next("Mandatory isAccessibleForFree field.");
    else if (pageStart == null) next("Mandatory pageStart field.");
    else if (pageEnd == null) next("Mandatory pageEnd field.");
    else if (pagination == null) next("Mandatory pagination field.");
    else if (volumeNumber == null) next("Mandatory volumeNumber field.");
	else {
        idPublicationVolume++;
		let publicationVolume = new PublicationVolume();
		publicationVolume.update(idPublicationVolume, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber);
		publicationVolumeArray.push(publicationVolume);
		next(null,idPublicationVolume+"");
	}
};

exports.deletePublicationVolume = function (id, next) {
    if (publicationVolumeArray[id] != undefined) { 
       publicationVolumeArray.splice(publicationVolumeArray.indexOf(publicationVolumeArray[id]),1);
       next(null, publicationVolumeArray);
    } else 
       next(new Error("Non-existent publicationVolume with id: " + id));
};

exports.putPublicationVolume = function(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber, next) {
    if (publicationVolumeArray[id]!= undefined) {
       let publicationVolume = new PublicationVolume();
       publicationVolume.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber);
       publicationVolumeArray[id] = publicationVolume;
       next(null, publicationVolumeArray);
    }
    else
       next(new Error("Couldn't find publicationVolume. Non-existent publicationVolume with id: " + id)) ; 
};


// Content negotiation
// HTML
exports.toHTML = function() {
    return '<ul>' + publicationVolumeArray.map(function(publicationVolume, i){
       return '<li>' + i +' '+publicationVolume.alternativeHeadline + ' ' + publicationVolume.commentCount + ' ' + publicationVolume.copyrightYear + ' ' + publicationVolume.inLanguage + ' ' + publicationVolume.isAccessibleForFree + ' ' + publicationVolume.pageStart + ' ' + publicationVolume.pageEnd + ' ' + publicationVolume.pagination + ' ' + publicationVolume.volumeNumber + '</li>';
    }).join('') + '</ul>' ;
}; 
   
// Text
exports.toText = function() {
return publicationVolumeArray.map(function(publicationVolume, i){
    return ' - ' + i +' '+ publicationVolume.alternativeHeadline + ' ' + publicationVolume.commentCount + ' ' + publicationVolume.copyrightYear + ' ' + publicationVolume.inLanguage + ' ' + publicationVolume.isAccessibleForFree + ' ' + publicationVolume.pageStart + ' ' + publicationVolume.pageEnd + ' ' + publicationVolume.pagination + ' ' + publicationVolume.volumeNumber + '\n';
    }).join('');	
};

// Json
exports.toJson = function() {
    let send=[];
    for(let i=0; i<publicationVolumeArray.length; i++){
        let jsonSend={"@context":"http://schema.org","@type":"publicationVolume","id":i,"alternativeHeadline":publicationVolumeArray[i].alternativeHeadline,"commentCount":publicationVolumeArray[i].commentCount,"copyrightYear":publicationVolumeArray[i].copyrightYear,"inLanguage":publicationVolumeArray[i].inLanguage,"isAccessibleForFree":publicationVolumeArray[i].isAccessibleForFree,"pageStart":publicationVolumeArray[i].pageStart,"pageEnd":publicationVolumeArray[i].pageEnd,"pagination":publicationVolumeArray[i].pagination,"volumeNumber":publicationVolumeArray[i].volumeNumber};
        send.push(jsonSend);
    }
    return JSON.stringify(send);
};