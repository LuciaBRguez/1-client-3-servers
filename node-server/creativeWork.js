// Array of creativeWork objects
let creativeWorkArray = [];


class CreativeWork{
	update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree){
		this.alternativeHeadline = alternativeHeadline;
		this.commentCount = commentCount;
		this.copyrightYear = copyrightYear;
		this.inLanguage = inLanguage;
		this.isAccesibleForFree = isAccesibleForFree;
	}
}

// Create a new Object creativeWork
let creativeWork = new CreativeWork();
creativeWork.update("Another creativeWork", 5, 2001, "English", true);
creativeWorkArray.push(creativeWork);

// Exported functions
// Callback next
exports.getCreativeWork = function(id, next) {
  console.log(`Searching creativeWork with id: ${id}`);
  console.log(creativeWorkArray);
  let creativeWorkCheck = creativeWorkArray[id];
  if (creativeWorkCheck == undefined) 
	next(new Error("Cannot find creativeWork with id: " + id));
  else{
	let creativeWork = {"@context":"http://schema.org","@type":"CreativeWork","id":id,"alternativeHeadline":creativeWorkArray[id].alternativeHeadline,"commentCount":creativeWorkArray[id].commentCount,"copyrightYear":creativeWorkArray[id].copyrightYear,"inLanguage":creativeWorkArray[id].inLanguage,"isAccesibleForFree":creativeWorkArray[id].isAccesibleForFree}; 
	next(null, creativeWork);
  }
};

exports.insertCreativeWork = function (alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, next) {
	if (alternativeHeadline == null) next("Mandatory alternativeHeadline field.");
    else if (commentCount == null) next("Mandatory commentCount field.");
    else if (copyrightYear == null) next("Mandatory copyrightYear field.");
    else if (inLanguage == null) next("Mandatory inLanguage field.");
    else if (isAccesibleForFree == null) next("Mandatory isAccesibleForFree field.");
	else {
		let creativeWork = new CreativeWork();
		creativeWork.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree);
		creativeWorkArray.push(creativeWork);
		next(null,(creativeWorkArray.length-1)+"");
	}
};

exports.deleteCreativeWork = function (id, next) {
 if (creativeWorkArray[id] != undefined) { 
	creativeWorkArray.splice(creativeWorkArray.indexOf(creativeWorkArray[id]),1);
	next(null, creativeWorkArray);
 } else 
	next(new Error("Non-existent creativeWork with id: " + id));
};

exports.modifyCreativeWork = function(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, next) {
 if (creativeWorkArray[id]!= undefined) {
	let creativeWork = new CreativeWork();
	creativeWork.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree);
	creativeWorkArray[id] = creativeWork;
	next(null, creativeWorkArray);
 }
 else
	next(new Error("Couldn't find creativeWork. Non-existent creativeWork with id: " + id)) ; 
};


// Content negotiation
// HTML
exports.toHTML = function() {
 return '<ul>' + creativeWorkArray.map(function(creativeWork, i){
    return '<li>' + i +' '+creativeWork.alternativeHeadline + ' ' + creativeWork.commentCount + ' ' + creativeWork.copyrightYear + ' ' + creativeWork.inLanguage + ' ' + creativeWork.isAccesibleForFree + '</li>';
 }).join('') + '</ul>' ;
}; 

// Text
exports.toText = function() {
 return creativeWorkArray.map(function(creativeWork,i){
	return ' - ' + i +' '+ creativeWork.alternativeHeadline + ' ' + creativeWork.commentCount + ' ' + creativeWork.copyrightYear + ' ' + creativeWork.inLanguage + ' ' + creativeWork.isAccesibleForFree + '\n';
  }).join('');	
};

// Json
exports.toJson = function() {
	let send=[];
	for(let i=0;i<creativeWorkArray.length;i++){
		let jsonSend={"@context":"http://schema.org","@type":"CreativeWork","id":i,"alternativeHeadline":creativeWorkArray[i].alternativeHeadline,"commentCount":creativeWorkArray[i].commentCount,"copyrightYear":creativeWorkArray[i].copyrightYear,"inLanguage":creativeWorkArray[i].inLanguage,"isAccesibleForFree":creativeWorkArray[i].isAccesibleForFree};
		send.push(jsonSend);
	}
	return JSON.stringify(send);
};

// XML
exports.toXML = function() {
    return '<creativeWorkArray>' + creativeWorkArray.map(function(creativeWork,i){
	    return  '<creativeWork id =' + i + '>' +
	   			'<alternativeHeadline>'+creativeWork.alternativeHeadline+ '</alternativeHeadline>'+
                '<commentCount>' + creativeWork.commentCount + '</commentCount>' +
                '<copyrightYear>' + creativeWork.copyrightYear + '</copyrightYear>' +
                '<inLanguage>' + creativeWork.inLanguage + '</inLanguage>' +
                '<isAccesibleForFree>' + creativeWork.isAccesibleForFree + '</isAccesibleForFree>' +
		        '</creativeWork>';
   }).join('') +
   '</creativeWorkArray>';
};