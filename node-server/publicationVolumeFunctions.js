const {PublicationVolume} = require("./publicationVolume.js");
var Type = require('type-of-is');
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
    let foundId = false;
    for (let i=0; i<publicationVolumeArray.length; i++){
        if(publicationVolumeArray[i].idCreativeWork == id){
            let publicationVolume = {"@context":"http://schema.org","@type":"PublicationVolume","id":publicationVolumeArray[i].idCreativeWork,"alternativeHeadline":publicationVolumeArray[i].alternativeHeadline,"commentCount":publicationVolumeArray[i].commentCount,"copyrightYear":publicationVolumeArray[i].copyrightYear,"inLanguage":publicationVolumeArray[i].inLanguage,"isAccessibleForFree":publicationVolumeArray[i].isAccessibleForFree,"pageStart":publicationVolumeArray[i].pageStart,"pageEnd":publicationVolumeArray[i].pageEnd,"pagination":publicationVolumeArray[i].pagination,"volumeNumber":publicationVolumeArray[i].volumeNumber}; 
            foundId = true;
            next(null, publicationVolume);
        }
    }
    if(!foundId){
        next(new Error("Cannot find publicationVolume with id: " + id));
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
    else if (!Type.is(alternativeHeadline,String)) next("alternativeHeadline must be boolean");
	else if (!Type.is(commentCount,Number)) next("commentCount must be boolean");
	else if (!Type.is(copyrightYear,Number)) next("copyrightYear must be boolean");
	else if (!Type.is(inLanguage,String)) next("inLanguage must be boolean");
    else if (!Type.is(isAccessibleForFree,Boolean)) next("isAccessibleForFree must be boolean");
    else if (!Type.is(pageStart,Number)) next("pageStart must be boolean");
    else if (!Type.is(pageEnd,Number)) next("pageEnd must be boolean");
    else if (!Type.is(pagination,String)) next("pagination must be boolean");
    else if (!Type.is(volumeNumber,Number)) next("volumeNumber must be boolean");
	else {
        idPublicationVolume++;
		let publicationVolume = new PublicationVolume();
		publicationVolume.update(idPublicationVolume, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber);
		publicationVolumeArray.push(publicationVolume);
		next(null,idPublicationVolume+"");
	}
};

exports.deletePublicationVolume = function (id, next) {
    let foundId = false;
	for (let i=0; i<publicationVolumeArray.length; i++){
		if(publicationVolumeArray[i].idCreativeWork == id){
            publicationVolumeArray.splice(publicationVolumeArray.indexOf(publicationVolumeArray[i]),1);
            foundId = true;
            next(null, publicationVolumeArray);
        }
    }
    if(!foundId){
        next(new Error("Non-existent publicationVolume with id: " + id));
    }
};

exports.putPublicationVolume = function(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber, next) {
    if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccessibleForFree == null) next("Mandatory isAccessibleForFree field.");
    else if (pageStart == null) next("Mandatory pageStart field.");
    else if (pageEnd == null) next("Mandatory pageEnd field.");
    else if (pagination == null) next("Mandatory pagination field.");
    else if (volumeNumber == null) next("Mandatory volumeNumber field.");
    else if (!Type.is(alternativeHeadline,String)) next("alternativeHeadline must be boolean");
	else if (!Type.is(commentCount,Number)) next("commentCount must be boolean");
	else if (!Type.is(copyrightYear,Number)) next("copyrightYear must be boolean");
	else if (!Type.is(inLanguage,String)) next("inLanguage must be boolean");
    else if (!Type.is(isAccessibleForFree,Boolean)) next("isAccessibleForFree must be boolean");
    else if (!Type.is(pageStart,Number)) next("pageStart must be boolean");
    else if (!Type.is(pageEnd,Number)) next("pageEnd must be boolean");
    else if (!Type.is(pagination,String)) next("pagination must be boolean");
    else if (!Type.is(volumeNumber,Number)) next("volumeNumber must be boolean");
    else {
        let foundId = false; 
        let publicationVolume = new PublicationVolume();
        for (let i=0; i<publicationVolumeArray.length; i++){
            if(publicationVolumeArray[i].idCreativeWork == id){
                publicationVolume.update(publicationVolumeArray[i].idCreativeWork, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber);
                publicationVolumeArray[i] = publicationVolume;
                foundId = true;
                next(null, publicationVolumeArray);
            }
        }
        if(!foundId){
            next(new Error("Couldn't find publicationVolume. Non-existent publicationVolume with id: " + id)); 
        }
    }
};


// Content negotiation
// HTML
exports.toHTML = function() {
    return '<ul>' + publicationVolumeArray.map(function(publicationVolume, i){
       return '<li>' + publicationVolumeArray[i].idCreativeWork +' '+publicationVolume.alternativeHeadline + ' ' + publicationVolume.commentCount + ' ' + publicationVolume.copyrightYear + ' ' + publicationVolume.inLanguage + ' ' + publicationVolume.isAccessibleForFree + ' ' + publicationVolume.pageStart + ' ' + publicationVolume.pageEnd + ' ' + publicationVolume.pagination + ' ' + publicationVolume.volumeNumber + '</li>';
    }).join('') + '</ul>' ;
}; 
   
// Text
exports.toText = function() {
return publicationVolumeArray.map(function(publicationVolume, i){
    return ' - ' + publicationVolumeArray[i].idCreativeWork +' '+ publicationVolume.alternativeHeadline + ' ' + publicationVolume.commentCount + ' ' + publicationVolume.copyrightYear + ' ' + publicationVolume.inLanguage + ' ' + publicationVolume.isAccessibleForFree + ' ' + publicationVolume.pageStart + ' ' + publicationVolume.pageEnd + ' ' + publicationVolume.pagination + ' ' + publicationVolume.volumeNumber + '\n';
    }).join('');	
};

// Json
exports.toJson = function() {
    let send=[];
    for(let i=0; i<publicationVolumeArray.length; i++){
        let jsonSend={"@context":"http://schema.org","@type":"PublicationVolume","id":publicationVolumeArray[i].idCreativeWork,"alternativeHeadline":publicationVolumeArray[i].alternativeHeadline,"commentCount":publicationVolumeArray[i].commentCount,"copyrightYear":publicationVolumeArray[i].copyrightYear,"inLanguage":publicationVolumeArray[i].inLanguage,"isAccessibleForFree":publicationVolumeArray[i].isAccessibleForFree,"pageStart":publicationVolumeArray[i].pageStart,"pageEnd":publicationVolumeArray[i].pageEnd,"pagination":publicationVolumeArray[i].pagination,"volumeNumber":publicationVolumeArray[i].volumeNumber};
        send.push(jsonSend);
    }
    return JSON.stringify(send);
};