import DatabaseModels as dbm
#import webapp2
import json

from google.appengine.api import users

#import datetime
#import time
#import json
#import random

#from google.appengine.api import channel
from google.appengine.ext import ndb

cXUSE =  users.get_current_user() #External ID = Google ID

def aORB(name,args=''):
    Echo1 = ndb.Key('ECHO','1').get()
    Echo1.oCount += 1
    Echo1.put()
    newID = str(Echo1.oCount)
    orb = dbm.ORB(id=newID,name = name)
    orb.put()
    return orb

def lPIXEL(metaKey=users.get_current_user()):
    try:
        return dbm.PIXEL.query(dbm.PIXEL.xID == metaKey.user_id()).get()
    except AttributeError:
        return dbm.PIXEL.query(dbm.PIXEL.kid == metaKey).get()

def lORB():
    return ndb.Key('ORB','1').get()

## DEPRECATE, USE JSONIFY
def obsonify(medo):
    return json.dumps(medo.__dict__)


## DEPRECATE, USE JSONIFY
def dictsonify(data):
    if isinstance(data, str):
        return json.dumps(data)
    else:
        return json.dumps(data.to_dict())
    
def jsonify(data):
    if isinstance(data, str):
        return json.dumps(data)
    else:
        try:
            return json.dumps(data.to_dict())
        except AttributeError:
            try:
                return json.dumps(data.__dict__)
            except:
                pass
            