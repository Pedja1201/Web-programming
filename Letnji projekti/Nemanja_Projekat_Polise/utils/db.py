from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)