from application.model.creativeWork import CreativeWork

__author__ = 'Lucía Blanco Rodríguez'


class SoftwareApplication(CreativeWork):
    def __init__(self, id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize):
        super().__init__(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree)
        self.applicationCategory = applicationCategory
        self.applicationSubCategory = applicationSubCategory
        self.applicationSuite = applicationSuite
        self.fileSize = fileSize
