class PublicationVolume extends CreativeWork{
    constructor(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber){
        super(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree);
        this.pageStart = pageStart;
        this.pageEnd = pageEnd;
        this.pagination = pagination;
        this.volumeNumber = volumeNumber;
    }
}