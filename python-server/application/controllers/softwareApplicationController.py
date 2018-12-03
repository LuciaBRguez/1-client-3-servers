from flask import json, Blueprint, request, make_response
from ..model import array_software_application
from ..model import SoftwareApplication
from flask_cors import CORS

__author__ = 'Lucía Blanco Rodríguez'


routes = Blueprint('softwareApplication', __name__, url_prefix='/softwareApplication')

CORS(routes)


@routes.route('', methods=['POST'])
def postSoftwareApplication():
    decoded = json.loads(request.get_data())
    softwareApplicationObj = array_software_application
    id = softwareApplicationObj.software_application_list[len(softwareApplicationObj.software_application_list)-1].id + 1
    alternativeHeadline = decoded['alternativeHeadline']
    commentCount = decoded['commentCount']
    copyrightYear = decoded['copyrightYear']
    inLanguage = decoded['inLanguage']
    isAccessibleForFree = decoded['isAccessibleForFree']
    applicationCategory = decoded['applicationCategory']
    applicationSubCategory = decoded['applicationSubCategory']
    applicationSuite = decoded['applicationSuite']
    fileSize = decoded['fileSize']
    softwareApplication = SoftwareApplication(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize)
    softwareApplicationObj.post_software_application(softwareApplication)
    return str(id)


@routes.route('', methods=['GET'])
def getSoftwareApplication():
    softwareApplicationList = array_software_application.get_software_application()
    value = (request.headers["Accept"]) == 'application/ld+json'
    if value:
        dictionary = [{'id': v.id, 'alternativeHeadline': v.alternativeHeadline, 'commentCount': v.commentCount, 'copyrightYear': v.copyrightYear, 'inLanguage': v.inLanguage, 'isAccessibleForFree': v.isAccessibleForFree, 'applicationCategory': v.applicationCategory, 'applicationSubCategory': v.applicationSubCategory, 'applicationSuite': v.applicationSuite, 'fileSize': v.fileSize} for v in softwareApplicationList]
        return json.dumps(dictionary)
    else:
        dictionary = "<ul>"
        for i in range(0, len(softwareApplicationList)):
            dictionary = '{0} <li>{1} {2} {3} {4} {5} {6} {7} {8} {9}</li>'.format(dictionary, str(softwareApplicationList[i].id), str(softwareApplicationList[i].alternativeHeadline), str(softwareApplicationList[i].commentCount), str(softwareApplicationList[i].copyrightYear), str(softwareApplicationList[i].inLanguage), str(softwareApplicationList[i].isAccessibleForFree), str(softwareApplicationList[i].applicationCategory), str(softwareApplicationList[i].applicationSubCategory), str(softwareApplicationList[i].applicationSuite), str(softwareApplicationList[i].fileSize))
        dictionary = dictionary + '</ul>'
        return dictionary


@routes.route('/<int:number>', methods=['DELETE'])
def deleteSoftwareApplication(number):
    softwareApplicationList = array_software_application.software_application_list
    for x in range(0, len(softwareApplicationList)):
        if softwareApplicationList[x].id == number:
            del softwareApplicationList[x]
            return "DELETED successful"
    res = make_response('Could not found it', 404)
    return res


@routes.route('/<int:number>', methods=['GET'])
def getIdSoftwareApplication(number):
    softwareApplicationList = array_software_application.software_application_list
    for x in range(0, len(softwareApplicationList)):
        if softwareApplicationList[x].id == number:
            return json.dumps({
                "@context": "http://schema.org",
                "@type": "SoftwareApplication",
                'id': softwareApplicationList[x].id,
                'alternativeHeadline': softwareApplicationList[x].alternativeHeadline,
                'commentCount': softwareApplicationList[x].commentCount,
                'copyrightYear': softwareApplicationList[x].copyrightYear,
                'inLanguage': softwareApplicationList[x].inLanguage,
                'isAccessibleForFree': softwareApplicationList[x].isAccessibleForFree,
                'applicationCategory': softwareApplicationList[x].applicationCategory,
                'applicationSubCategory': softwareApplicationList[x].applicationSubCategory,
                'applicationSuite': softwareApplicationList[x].applicationSuite,
                'fileSize': softwareApplicationList[x].fileSize
            })
    res = make_response('Could not found it', 404)
    return res


@routes.route('/<int:number>', methods=['PUT'])
def putSoftwareApplicatioin(number):
    decoded = json.loads(request.get_data())
    softwareApplicationObj = array_software_application
    id = number
    alternativeHeadline = decoded['alternativeHeadline']
    commentCount = decoded['commentCount']
    copyrightYear = decoded['copyrightYear']
    inLanguage = decoded['inLanguage']
    isAccessibleForFree = decoded['isAccessibleForFree']
    applicationCategory = decoded['applicationCategory']
    applicationSubCategory = decoded['applicationSubCategory']
    applicationSuite = decoded['applicationSuite']
    fileSize = decoded['fileSize']
    softwareApplication = SoftwareApplication(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize)
    if softwareApplicationObj.put_software_application(softwareApplication, id):
        res = make_response('PUT successful', 200)
        return res
    res = make_response('Could not found it', 404)
    return res
