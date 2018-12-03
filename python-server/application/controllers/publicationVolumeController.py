from flask import json, Blueprint, request, make_response
from ..model import array_publication_volume
from ..model import PublicationVolume
from flask_cors import CORS

__author__ = 'Lucía Blanco Rodríguez'


routes = Blueprint('publicationVolume', __name__, url_prefix='/publicationVolume')

CORS(routes)


@routes.route('', methods=['POST'])
def postPublicationVolume():
    decoded = json.loads(request.get_data())
    publicationVolumeObj = array_publication_volume
    id = publicationVolumeObj.publication_volume_list[len(publicationVolumeObj.publication_volume_list)-1].id + 1
    alternativeHeadline = decoded['alternativeHeadline']
    commentCount = decoded['commentCount']
    copyrightYear = decoded['copyrightYear']
    inLanguage = decoded['inLanguage']
    isAccessibleForFree = decoded['isAccessibleForFree']
    pageStart = decoded['pageStart']
    pageEnd = decoded['pageEnd']
    pagination = decoded['pagination']
    volumeNumber = decoded['volumeNumber']
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
    elif (pageStart is None):
        res = make_response('Mandatory pageStart field', 404)
        return res
    elif (pageEnd is None):
        res = make_response('Mandatory pageEnd field', 404)
        return res
    elif (pagination is None):
        res = make_response('Mandatory pagination field', 404)
        return res
    elif (volumeNumber is None):
        res = make_response('Mandatory volumeNumber field', 404)
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
    elif not isinstance(pageStart, int):
        res = make_response('pageStart must be an int', 404)
        return res
    elif not isinstance(pageEnd, int):
        res = make_response('pageEnd must be an int', 404)
        return res
    elif not isinstance(pagination, str):
        res = make_response('pagination must be a string', 404)
        return res
    elif not isinstance(volumeNumber, int):
        res = make_response('volumeNumber must be an int', 404)
        return res
    publicationVolume = PublicationVolume(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber)
    publicationVolumeObj.post_publication_volume(publicationVolume)
    return str(id)


@routes.route('', methods=['GET'])
def getPublicationVolume():
    publicationVolumeList = array_publication_volume.get_publication_volume()
    value = (request.headers["Accept"]) == 'application/ld+json'
    if value:
        dictionary = [{'@context': 'http://schema.org', '@type': 'PublicationVolume', 'id': v.id, 'alternativeHeadline': v.alternativeHeadline, 'commentCount': v.commentCount,
                     'copyrightYear': v.copyrightYear, 'inLanguage': v.inLanguage, 'isAccessibleForFree': v.isAccessibleForFree, 'pageStart': v.pageStart,
                     'pageEnd': v.pageEnd, 'pagination': v.pagination, 'volumeNumber': v.volumeNumber} for v in publicationVolumeList]
        return json.dumps(dictionary)
    else:
        dictionary = "<ul>"
        for i in range(0, len(publicationVolumeList)):
            dictionary = '{0} <li>{1} {2} {3} {4} {5} {6} {7} {8} {9} {10}</li>'.format(dictionary,
            str(publicationVolumeList[i].id), str(publicationVolumeList[i].alternativeHeadline), str(publicationVolumeList[i].commentCount), str(publicationVolumeList[i].copyrightYear), str(publicationVolumeList[i].inLanguage), str(publicationVolumeList[i].isAccessibleForFree), str(publicationVolumeList[i].pageStart), str(publicationVolumeList[i].pageEnd), str(publicationVolumeList[i].pagination), str(publicationVolumeList[i].volumeNumber))
        dictionary = dictionary + '</ul>'
        return dictionary


@routes.route('/<int:number>', methods=['DELETE'])
def deletePublicationVolume(number):
    publicatonVolumeList = array_publication_volume.publication_volume_list
    for x in range(0, len(publicatonVolumeList)):
        if publicatonVolumeList[x].id == number:
            del publicatonVolumeList[x]
            res = make_response('DELETED successful', 200)
            return res
    res = make_response('Could not found it', 404)
    return res


@routes.route('/<int:number>', methods=['GET'])
def getIdPublicationVolume(number):
    publicatonVolumeList = array_publication_volume.publication_volume_list
    for x in range(0, len(publicatonVolumeList)):
        if publicatonVolumeList[x].id == number:
            return json.dumps({
                "@context": "http://schema.org",
                "@type": "PublicationVolume",
                'id': publicatonVolumeList[x].id,
                'alternativeHeadline': publicatonVolumeList[x].alternativeHeadline,
                'commentCount': publicatonVolumeList[x].commentCount,
                'copyrightYear': publicatonVolumeList[x].copyrightYear,
                'inLanguage': publicatonVolumeList[x].inLanguage,
                'isAccessibleForFree': publicatonVolumeList[x].isAccessibleForFree,
                'pageStart': publicatonVolumeList[x].pageStart,
                'pageEnd': publicatonVolumeList[x].pageEnd,
                'pagination': publicatonVolumeList[x].pagination,
                'volumeNumber': publicatonVolumeList[x].volumeNumber
            })
    res = make_response('Could not found it', 404)
    return res


@routes.route('/<int:number>', methods=['PUT'])
def putPublicationVolume(number):
    decoded = json.loads(request.get_data())
    publicationVolumeObj = array_publication_volume
    id = number
    alternativeHeadline = decoded['alternativeHeadline']
    commentCount = decoded['commentCount']
    copyrightYear = decoded['copyrightYear']
    inLanguage = decoded['inLanguage']
    isAccessibleForFree = decoded['isAccessibleForFree']
    pageStart = decoded['pageStart']
    pageEnd = decoded['pageEnd']
    pagination = decoded['pagination']
    volumeNumber = decoded['volumeNumber']
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
    elif (pageStart is None):
        res = make_response('Mandatory pageStart field', 404)
        return res
    elif (pageEnd is None):
        res = make_response('Mandatory pageEnd field', 404)
        return res
    elif (pagination is None):
        res = make_response('Mandatory pagination field', 404)
        return res
    elif (volumeNumber is None):
        res = make_response('Mandatory volumeNumber field', 404)
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
    elif not isinstance(pageStart, int):
        res = make_response('pageStart must be an int', 404)
        return res
    elif not isinstance(pageEnd, int):
        res = make_response('pageEnd must be an int', 404)
        return res
    elif not isinstance(pagination, str):
        res = make_response('pagination must be a string', 404)
        return res
    elif not isinstance(volumeNumber, int):
        res = make_response('volumeNumber must be an int', 404)
        return res
    publicationVolume = PublicationVolume(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree, pageStart, pageEnd, pagination, volumeNumber)
    if publicationVolumeObj.put_publication_volume(publicationVolume, id):
        res = make_response('PUT successful', 200)
        return res
    res = make_response('Could not found it', 404)
    return res
