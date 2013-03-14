#from google.appengine.ext import ndb
from google.appengine.api import channel
from google.appengine.api import users

import EdenDataOfficer as edo
import EdenUniCon as euc
import json

#import EdenInformationControl as eic

class GameStateCrank():
    #Check Weather
    #Check Positions
    #check Box Location
    #check Soccer Participants
    pass
    
class ProxyBase():
    def actualize(self,kid):
        #self.data = dops.LoadMedo(kid)
        pass
    def save(self,attr,data):
        pass
    def create(self):
        return self
    

class Move():
    pass

class Pixel(ProxyBase,Move):
    pass



class cPixel(Pixel):
    
    def __init__(self):
        cPIXEL = edo.lPIXEL()
        if cPIXEL:
            pass
        else:
            cPIXEL = euc.aPIXEL()
        self.xid =  users.get_current_user().user_id() #External ID = Google ID
        self.name = cPIXEL.name
        self.data = cPIXEL.to_dict()
        #self.data = dbPIXEL.query(dbPIXEL.xID == cXUSE.user_id()).get()
        
        ## Match current xid with PIXEL
        # self.data = medo 
    def get(self):
        pass