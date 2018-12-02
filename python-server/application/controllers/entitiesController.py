from flask import json, Blueprint
from flask_cors import CORS

__author__ = 'Lucía Blanco Rodríguez'


routes = Blueprint('entities', __name__, url_prefix='/')

CORS(routes)


@routes.route('', methods=['GET'])
def getEntities():
    return json.dumps({'first': 'creativeWork', 'second': 'publicationVolume', 'third': 'softwareApplication'})
