const {CreativeWork} = require("./creativeWork.js");

class SoftwareApplication extends CreativeWork{
	update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize){
        super.update(alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccesibleForFree);
        this.applicationCategory = applicationCategory;
        this.applicationSubCategory = applicationSubCategory;
		this.applicationSuite = applicationSuite;
		this.fileSize = fileSize;
	}
}

module.exports = {SoftwareApplication};