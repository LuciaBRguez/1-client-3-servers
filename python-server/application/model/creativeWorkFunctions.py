__author__ = 'Lucía Blanco Rodríguez'


class CreativeWorkFunctions:
    def __init__(self, creative_work_list=None):
        self.creative_work_list = [] if not creative_work_list else creative_work_list

    def post_creative_work(self, creativeWork):
        self.creative_work_list.append(creativeWork)
        return True

    def get_creative_work(self):
        return self.creative_work_list

    def delete_creative_work(self, id):
        for x in range(0, len(self.creative_work_list)):
            if self.creative_work_list[x].id == id:
                del self.creative_work_list[x]
                return True
        return False

    def get_id_creative_work(self, id):
        for x in range(0, len(self.creative_work_list)):
            if self.creative_work_list[x].id == id:
                return self.creative_work_list[x]
        return None

    def put_creative_work(self, creativeWork, id):
        for x in range(0, len(self.creative_work_list)):
            if self.creative_work_list[x].id == id:
                self.creative_work_list[x] = creativeWork
                return True
        return False
