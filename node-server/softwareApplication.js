const {CreativeWork} = require("./creativeWork.js");

class SoftwareApplication extends CreativeWork{
	update(idSoftwareApplication, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize){
		super.update(idSoftwareApplication, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
        this.applicationCategory = applicationCategory;
        this.applicationSubCategory = applicationSubCategory;
		this.applicationSuite = applicationSuite;
		this.fileSize = fileSize;
	}
}

module.exports = {SoftwareApplication};