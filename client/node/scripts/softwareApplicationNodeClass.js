class SoftwareApplication extends CreativeWork{
    constructor(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize) {
        super(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
        this.applicationCategory = applicationCategory;
        this.applicationSubCategory = applicationSubCategory;
        this.applicationSuite = applicationSuite;
        this.fileSize = fileSize;
    }
}