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
    if (alternativeHeadline is None):
        res = make_response('Mandatory alternativeHeadline field', 404)
        return res
    elif (commentCount is None):
        res = make_response('Mandatory commentCount field', 404)
        return res
    elif (copyrightYear is None):
        res = make_response('Mandatory copyrightYear field', 404)
        return res
    elif (inLanguage is None):
        res = make_response('Mandatory inLanguage field', 404)
        return res
    elif (isAccessibleForFree is None):
        res = make_response('Mandatory isAccessibleForFree field', 404)
        return res
    elif (applicationCategory is None):
        res = make_response('Mandatory applicationCategory field', 404)
        return res
    elif (applicationSubCategory is None):
        res = make_response('Mandatory applicationSubCategory field', 404)
        return res
    elif (applicationSuite is None):
        res = make_response('Mandatory applicationSuite field', 404)
        return res
    elif (fileSize is None):
        res = make_response('Mandatory fileSize field', 404)
        return res
    elif not isinstance(alternativeHeadline, str):
        res = make_response('alternativeHeadline must be a string', 404)
        return res
    elif not isinstance(commentCount, int):
        res = make_response('commentCount must be an int', 404)
        return res
    elif not isinstance(copyrightYear, int):
        res = make_response('copyrightYear must be an int', 404)
        return res
    elif not isinstance(inLanguage, str):
        res = make_response('inLanguage must be a string', 404)
        return res
    elif not isinstance(isAccessibleForFree, bool):
        res = make_response('isAccessibleForFree must be a boolean', 404)
        return res
    elif not isinstance(applicationCategory, str):
        res = make_response('applicationCategory must be a string', 404)
        return res
    elif not isinstance(applicationSubCategory, str):
        res = make_response('applicationSubCategory must be a string', 404)
        return res
    elif not isinstance(applicationSuite, str):
        res = make_response('applicationSuite must be a string', 404)
        return res
    elif not isinstance(fileSize, str):
        res = make_response('fileSize must be a string', 404)
        return res
    softwareApplication = SoftwareApplication(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize)
    softwareApplicationObj.post_software_application(softwareApplication)
    return str(id)


@routes.route('', methods=['GET'])
def getSoftwareApplication():
    softwareApplicationList = array_software_application.get_software_application()
    value = (request.headers["Accept"]) == 'application/ld+json'
    if value:
        dictionary = [{'@context': 'http://schema.org', '@type': 'SoftwareApplication', 'id': v.id, 'alternativeHeadline': v.alternativeHeadline, 'commentCount': v.commentCount, 'copyrightYear': v.copyrightYear, 'inLanguage': v.inLanguage, 'isAccessibleForFree': v.isAccessibleForFree, 'applicationCategory': v.applicationCategory, 'applicationSubCategory': v.applicationSubCategory, 'applicationSuite': v.applicationSuite, 'fileSize': v.fileSize} for v in softwareApplicationList]
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
    if (alternativeHeadline is None):
        res = make_response('Mandatory alternativeHeadline field', 404)
        return res
    elif (commentCount is None):
        res = make_response('Mandatory commentCount field', 404)
        return res
    elif (copyrightYear is None):
        res = make_response('Mandatory copyrightYear field', 404)
        return res
    elif (inLanguage is None):
        res = make_response('Mandatory inLanguage field', 404)
        return res
    elif (isAccessibleForFree is None):
        res = make_response('Mandatory isAccessibleForFree field', 404)
        return res
    elif (applicationCategory is None):
        res = make_response('Mandatory applicationCategory field', 404)
        return res
    elif (applicationSubCategory is None):
        res = make_response('Mandatory applicationSubCategory field', 404)
        return res
    elif (applicationSuite is None):
        res = make_response('Mandatory applicationSuite field', 404)
        return res
    elif (fileSize is None):
        res = make_response('Mandatory fileSize field', 404)
        return res
    elif not isinstance(alternativeHeadline, str):
        res = make_response('alternativeHeadline must be a string', 404)
        return res
    elif not isinstance(commentCount, int):
        res = make_response('commentCount must be an int', 404)
        return res
    elif not isinstance(copyrightYear, int):
        res = make_response('copyrightYear must be an int', 404)
        return res
    elif not isinstance(inLanguage, str):
        res = make_response('inLanguage must be a string', 404)
        return res
    elif not isinstance(isAccessibleForFree, bool):
        res = make_response('isAccessibleForFree must be a boolean', 404)
        return res
    elif not isinstance(applicationCategory, str):
        res = make_response('applicationCategory must be a string', 404)
        return res
    elif not isinstance(applicationSubCategory, str):
        res = make_response('applicationSubCategory must be a string', 404)
        return res
    elif not isinstance(applicationSuite, str):
        res = make_response('applicationSuite must be a string', 404)
        return res
    elif not isinstance(fileSize, str):
        res = make_response('fileSize must be a string', 404)
        return res
    softwareApplication = SoftwareApplication(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, applicationCategory, applicationSubCategory, applicationSuite, fileSize)
    if softwareApplicationObj.put_software_application(softwareApplication, id):
        res = make_response('PUT successful', 200)
        return res
    res = make_response('Could not found it', 404)
    return res
