from .creativeWork import CreativeWork
from .publicationVolume import PublicationVolume
from .softwareApplication import SoftwareApplication
from .creativeWorkFunctions import CreativeWorkFunctions
from .publicationVolumeFunctions import PublicationVolumeFunctions
from .softwareApplicationFunctions import SoftwareApplicationFunctions

__author__ = 'Lucía Blanco Rodríguez'


array_creative_work = CreativeWorkFunctions()
array_creative_work.post_creative_work(CreativeWork(0, 'myCreativeWork', 89, 2018, 'English', True))

array_publication_volume = PublicationVolumeFunctions()
array_publication_volume.post_publication_volume(PublicationVolume(0, 'myPublicationVolume', 123, 2016, 'Spanish', False, 1, 100, 'myPagination', '8'))

array_software_application = SoftwareApplicationFunctions()
array_software_application.post_software_application(SoftwareApplication(0, 'mySoftwareApplication', 56, 2001, 'French', True, 'cat', 'subCat', 'suite', '200Mb'))
