class CreativeWork{
	update(idCreativeWork, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree){
		this.idCreativeWork = idCreativeWork;
		this.alternativeHeadline = alternativeHeadline;
		this.commentCount = commentCount;
		this.copyrightYear = copyrightYear;
		this.inLanguage = inLanguage;
		this.isAccessibleForFree = isAccessibleForFree;
	}
}

module.exports = {CreativeWork};