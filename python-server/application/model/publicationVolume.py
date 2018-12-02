from application.model.creativeWork import CreativeWork

__author__ = 'Lucía Blanco Rodríguez'


class PublicationVolume(CreativeWork):
    def __init__(self, id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber):
        super().__init__(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree)
        self.pageStart = pageStart
        self.pageEnd = pageEnd
        self.pagination = pagination
        self.volumeNumber = volumeNumber
