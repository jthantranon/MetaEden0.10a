from DatabaseModels import PIXEL,ORB
from google.appengine.api import users
from google.appengine.api import channel
from google.appengine.ext import ndb

import json
import webapp2
import EdenDataOfficer as edo
import EdenUniCon as euc
import ProxyModels as prox

#import datetime
#import time
import json
#import random

cXUSE =  users.get_current_user() #External ID = Google ID
cpix = prox.cPixel()


class JSONWish(webapp2.RequestHandler):
    def get(self):
        wish = json.loads(self.request.get('wish'))
        name = wish['name']
        try:
            wishargs = wish['wishargs']
        except:
            wishargs = None
        if name == 'lPIXEL':
            if wishargs:
                if isinstance(wishargs, dict):
                    wReturn = edo.lPIXEL(wishargs['pixel'])
                else:
                    wReturn = edo.lPIXEL(wishargs)
            else:
                wReturn = edo.lPIXEL()
        elif name == 'lORB':
            wReturn = edo.lORB()
        elif name == 'aORB':
            if wishargs:
                if isinstance(wishargs, dict):
                    wReturn = edo.aORB(wishargs['info'])
                else:
                    wReturn = edo.aORB(wishargs)
            else:
                wReturn = edo.lORB()
        else:
            wReturn = cpix
        #cpix.grant = wish#['name']
        #cpix.anothertest = 'anothertest'
        self.response.out.write(edo.jsonify(wReturn))


class PULSE(webapp2.RequestHandler):
    
    #apix = cpix.create()
    def get(self):
        #self.response.out.write(json.dumps(self.cpix.__dict__))
        self.response.out.write(edo.obsonify(self.cpix))
        #self.response.out.write(edo.dictsonify(self.cpix))
        #self.response.out.write(json.dumps(self.cpix.dict()))





class Immigration(webapp2.RequestHandler):
    def get(self):
        if cXUSE:   self.Customs()
        else:       self.xLogin()
    def xLogin(self):
        self.redirect(users.create_login_url("/"))
    def Customs(self):
        cPIXEL = edo.lPIXEL()
        #cORB = lORB()
        if cPIXEL:
            #cpix.data = cPIXEL.to_dict()
            self.response.out.write(edo.jsonify(cpix))
            #self.response.write('test')
#            pulse = PULSE.get()
#            pulse.content = 'stuff'
#            pulse.console = 'it worked'
#            pulse.send('system')
#            self.response.out.write(edo.dictsonify(cMUSE))
        else:
            pixel = euc.aPIXEL()
            self.response.out.write(edo.jsonify(pixel))

#class NewSession(webapp2.RequestHandler):
#    def get(self):
#        cMUSE = lMUSE()
#        token = channel.create_channel(str(cMUSE.key.id()),1440)
#        
#        self.response.out.write(edo.jsonify(token))

#class IncrementTutorial(webapp2.RequestHandler):
#    def post(self):
#        cMUSE = lMUSE()
#        cMUSE.tutorial += 1
#        cMUSE.put()
#        self.response.out.write(edo.dictsonify(cMUSE))
        
app = webapp2.WSGIApplication([
#                               ('/cic/newSession', NewSession),
#                               ('/cic/incTutorial', IncrementTutorial),
                               ('/cic/immigration', Immigration),
                               ('/cic/jsonwish', JSONWish),
                               ('/cic/pulse', PULSE),
                               ],
                              debug=True) 