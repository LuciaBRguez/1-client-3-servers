const {CreativeWork} = require("./creativeWork.js");

class PublicationVolume extends CreativeWork{
	update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, pageStart, pageEnd, pagination, volumeNumber){
        super.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree);
        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
		this.pagination = pagination;
		this.volumeNumber = volumeNumber;
	}
}

module.exports = {PublicationVolume};