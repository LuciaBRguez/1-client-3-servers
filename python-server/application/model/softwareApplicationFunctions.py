__author__ = 'Lucía Blanco Rodríguez'


class SoftwareApplicationFunctions:
    def __init__(self, software_application_list=None):
        self.software_application_list = [] if not software_application_list else software_application_list

    def post_software_application(self, softwareApplication):
        self.software_application_list.append(softwareApplication)
        return True

    def get_software_application(self):
        return self.software_application_list

    def delete_software_application(self, id):
        for x in range(0, len(self.software_application_list)):
            if self.software_application_list[x].id == id:
                del self.software_application_list[x]
                return True
        return False

    def get_id_software_application(self):
        for x in range(0, len(self.software_application_list)):
            if self.software_application_list[x].id == id:
                return self.software_application_list[x]
        return None

    def put_software_application(self, softwareApplication, id):
        for x in range(0, len(self.software_application_list)):
            if self.software_application_list[x].id == id:
                self.software_application_list[x] = softwareApplication
                return True
        return False
