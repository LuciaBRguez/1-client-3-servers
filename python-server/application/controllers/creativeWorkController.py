from flask import json, Blueprint, request, make_response
from ..model import array_creative_work
from ..model import CreativeWork
from flask_cors import CORS

__author__ = 'Lucía Blanco Rodríguez'


routes = Blueprint('creativeWork', __name__, url_prefix='/creativeWork')

CORS(routes)


@routes.route('', methods=['POST'])
def postCreativeWork():
    decoded = json.loads(request.get_data())
    creativeWorkObj = array_creative_work
    id = creativeWorkObj.creative_work_list[len(creativeWorkObj.creative_work_list)-1].id + 1
    alternativeHeadline = decoded['alternativeHeadline']
    commentCount = decoded['commentCount']
    copyrightYear = decoded['copyrightYear']
    inLanguage = decoded['inLanguage']
    isAccessibleForFree = decoded['isAccessibleForFree']
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
    creativeWork = CreativeWork(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree)
    creativeWorkObj.post_creative_work(creativeWork)
    return str(id)


@routes.route('', methods=['GET'])
def getCreativeWork():
    creativeWorkList = array_creative_work.get_creative_work()
    value = (request.headers["Accept"]) == 'application/ld+json'
    if value:
        dictionary = [{'@context': 'http://schema.org', '@type': 'CreativeWork', 'id': v.id, 'alternativeHeadline': v.alternativeHeadline, 'commentCount': v.commentCount, 'copyrightYear': v.copyrightYear, 'inLanguage': v.inLanguage, 'isAccessibleForFree': v.isAccessibleForFree} for v in creativeWorkList]
        return json.dumps(dictionary)
    else:
        dictionary = "<ul>"
        for i in range(0, len(creativeWorkList)):
            dictionary = '{0} <li>{1} {2} {3} {4} {5} {6}</li>'.format(dictionary, str(creativeWorkList[i].id), str(creativeWorkList[i].alternativeHeadline), str(creativeWorkList[i].commentCount), str(creativeWorkList[i].copyrightYear), str(creativeWorkList[i].inLanguage), str(creativeWorkList[i].isAccessibleForFree))
        dictionary = dictionary + '</ul>'
        return dictionary


@routes.route('/<int:number>', methods=['DELETE'])
def deleteCreativeWork(number):
    creativeWorkList = array_creative_work.creative_work_list
    for x in range(0, len(creativeWorkList)):
        if creativeWorkList[x].id == number:
            del creativeWorkList[x]
            res = make_response('DELETED successful', 200)
            return res
    res = make_response('Could not found it', 404)
    return res


@routes.route('/<int:number>', methods=['GET'])
def getIdcreativeWork(number):
    creativeWorkList = array_creative_work.creative_work_list
    for x in range(0, len(creativeWorkList)):
        if creativeWorkList[x].id == number:
            return json.dumps({
                "@context": "http://schema.org",
                "@type": "CreativeWork",
                'id': creativeWorkList[x].id,
                'alternativeHeadline': creativeWorkList[x].alternativeHeadline,
                'commentCount': creativeWorkList[x].commentCount,
                'copyrightYear': creativeWorkList[x].copyrightYear,
                'inLanguage': creativeWorkList[x].inLanguage,
                'isAccessibleForFree': creativeWorkList[x].isAccessibleForFree
            })
    res = make_response('Could not found it', 404)
    return res


@routes.route('/<int:number>', methods=['PUT'])
def putCreativeWork(number):
    decoded = json.loads(request.get_data())
    creativeWorkObj = array_creative_work
    id = number
    alternativeHeadline = decoded['alternativeHeadline']
    commentCount = decoded['commentCount']
    copyrightYear = decoded['copyrightYear']
    inLanguage = decoded['inLanguage']
    isAccessibleForFree = decoded['isAccessibleForFree']
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
    creativeWork = CreativeWork(id, alternativeHeadline, commentCount, copyrightYear, inLanguage, isAccessibleForFree)
    if creativeWorkObj.put_creative_work(creativeWork, id):
        res = make_response('PUT successful', 200)
        return res
    res = make_response('Could not found it', 404)
    return res
