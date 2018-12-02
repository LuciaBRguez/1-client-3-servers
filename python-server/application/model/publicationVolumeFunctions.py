__author__ = 'Lucía Blanco Rodríguez'


class PublicationVolumeFunctions:
    def __init__(self, publication_volume_list=None):
        self.publication_volume_list = [] if not publication_volume_list else publication_volume_list

    def post_publication_volume(self, publicationVolume):
        self.publication_volume_list.append(publicationVolume)
        return True

    def get_publication_volume(self):
        return self.publication_volume_list

    def delete_publication_volume(self, id):
        for x in range(0, len(self.publication_volume_list)):
            if self.publication_volume_list[x].id == id:
                del self.publication_volume_list[x]
                return True
        return False

    def get_id_publication_volume(self):
        for x in range(0, len(self.publication_volume_list)):
            if self.publication_volume_list[x].id == id:
                return self.publication_volume_list[x]
        return None

    def put_publication_volume(self, publicationVolume, id):
        for x in range(0, len(self.publication_volume_list)):
            if self.publication_volume_list[x].id == id:
                self.publication_volume_list[x] = publicationVolume
                return True
        return False
