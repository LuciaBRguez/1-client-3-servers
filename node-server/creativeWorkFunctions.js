const {CreativeWork} = require("./creativeWork.js");
var idCreativeWork = 0;

// Array of creativeWork objects
let creativeWorkArray = [];

// Create a new Object creativeWork
let creativeWork = new CreativeWork();
creativeWork.update(0, "creativeWork", 8, 1999, "English", false);
creativeWorkArray.push(creativeWork);

// Exported functions
// Callback next
exports.getCreativeWork = function(id, next) {
	console.log(`Searching creativeWork with id: ${id}`);
	let foundId = false;
	for (let i=0; i<creativeWorkArray.length; i++){
		if(creativeWorkArray[i].idCreativeWork == id){
			let creativeWork = {"@context":"http://schema.org","@type":"CreativeWork","id":creativeWorkArray[i].idCreativeWork,"alternativeHeadline":creativeWorkArray[i].alternativeHeadline,"commentCount":creativeWorkArray[i].commentCount,"copyrightYear":creativeWorkArray[i].copyrightYear,"inLanguage":creativeWorkArray[i].inLanguage,"isAccessibleForFree":creativeWorkArray[i].isAccessibleForFree}; 
			foundId = true;
			next(null, creativeWork);
		}
	}
	if(!foundId){
		next(new Error("Non-existent creativeWork with id: " + id));
	}
};

exports.postCreativeWork = function (alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, next) {
	if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccessibleForFree == null) next("Mandatory isAccessibleForFree field.");
	else {
		idCreativeWork++;
		let creativeWork = new CreativeWork();
		creativeWork.update(idCreativeWork, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
		creativeWorkArray.push(creativeWork);
		next(null,idCreativeWork+"");
	}
};

exports.deleteCreativeWork = function (id, next) {
	let foundId = false;
	for (let i=0; i<creativeWorkArray.length; i++){
		if(creativeWorkArray[i].idCreativeWork == id){
			creativeWorkArray.splice(creativeWorkArray.indexOf(creativeWorkArray[i]),1);
			foundId = true;
			next(null, creativeWorkArray);
		}
	}
	if (!foundId){
		next(new Error("Non-existent creativeWork with id: " + id));
	}
};

exports.putCreativeWork = function(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, next) {
	let foundId = false; 
	let creativeWork = new CreativeWork();
	for (let i=0; i<creativeWorkArray.length; i++){
		if(creativeWorkArray[i].idCreativeWork == id){
			creativeWork.update(creativeWorkArray[i].idCreativeWork, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
			creativeWorkArray[i] = creativeWork;
			foundId = true;
			next(null, creativeWorkArray);
		}
	}
	if (!foundId){
		next(new Error("Couldn't find creativeWork. Non-existent creativeWork with id: " + id)) ; 
	}
};


// Content negotiation
// HTML
exports.toHTML = function() {
 return '<ul>' + creativeWorkArray.map(function(creativeWork, i){
    return '<li>' + creativeWorkArray[i].idCreativeWork +' '+creativeWork.alternativeHeadline + ' ' + creativeWork.commentCount + ' ' + creativeWork.copyrightYear + ' ' + creativeWork.inLanguage + ' ' + creativeWork.isAccessibleForFree + '</li>';
 }).join('') + '</ul>' ;
}; 

// Text
exports.toText = function() {
 return creativeWorkArray.map(function(creativeWork, i){
	return ' - ' + creativeWorkArray[i].idCreativeWork +' '+ creativeWork.alternativeHeadline + ' ' + creativeWork.commentCount + ' ' + creativeWork.copyrightYear + ' ' + creativeWork.inLanguage + ' ' + creativeWork.isAccessibleForFree + '\n';
  }).join('');	
};

// Json
exports.toJson = function() {
	let send=[];
	for(let i=0; i<creativeWorkArray.length; i++){
		let jsonSend={"@context":"http://schema.org","@type":"CreativeWork","id":creativeWorkArray[i].idCreativeWork,"alternativeHeadline":creativeWorkArray[i].alternativeHeadline,"commentCount":creativeWorkArray[i].commentCount,"copyrightYear":creativeWorkArray[i].copyrightYear,"inLanguage":creativeWorkArray[i].inLanguage,"isAccessibleForFree":creativeWorkArray[i].isAccessibleForFree};
		send.push(jsonSend);
	}
	return JSON.stringify(send);
};