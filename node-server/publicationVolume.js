const {CreativeWork} = require("./creativeWork.js");

class PublicationVolume extends CreativeWork{
	update(idPublicationVolume, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber){
		super.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
		this.idPublicationVolume = idPublicationVolume;
        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
		this.pagination = pagination;
		this.volumeNumber = volumeNumber;
	}
}

module.exports = {PublicationVolume};