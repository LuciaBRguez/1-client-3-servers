from flask import Flask
from .controllers import creativeWorkController, publicationVolumeController, softwareApplicationController

__author__ = 'Lucía Blanco Rodríguez'


def register_controllers_routes(app):
    app.register_blueprint(creativeWorkController.routes)
    app.register_blueprint(publicationVolumeController.routes)
    app.register_blueprint(softwareApplicationController.routes)


def create_app():
    app = Flask(__name__)
    register_controllers_routes(app)
    return app
