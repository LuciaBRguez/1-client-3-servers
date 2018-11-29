class CreativeWork{
	update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree){
		this.alternativeHeadline = alternativeHeadline;
		this.commentCount = commentCount;
		this.copyrightYear = copyrightYear;
		this.inLanguage = inLanguage;
		this.isAccesibleForFree = isAccesibleForFree;
	}
}

module.exports = {CreativeWork};