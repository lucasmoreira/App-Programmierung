from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import psycopg2
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

parser = reqparse.RequestParser()

STUDENTS = {
'1': {'name': 'admin', 'password': 'admin'}
}

class StudentsList(Resource):
    def get(self):
        """ Connect to the PostgreSQL database server """
        conn = None
        try:
    
            # connect to the PostgreSQL server
            print('Connecting to the PostgreSQL database...')
            conn = psycopg2.connect("dbname=postgres user=postgresHAW password=postgresHAW1 host=databasehaw.clsd7nrbhmct.eu-central-1.rds.amazonaws.com")
            
            # create a cursor
            cur = conn.cursor()
            
        # execute a statement
            print('PostgreSQL database version:')
            cur.execute('select name, code from users')
    
            # display the PostgreSQL database server version
            db_version = json.dumps(cur.fetchall())
            print(db_version)
            REPLY = db_version
            
        # close the communication with the PostgreSQL
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            REPLY = 'error'
        finally:
            if conn is not None:
                conn.close()
                print('Database connection closed.')
        return REPLY
    def post(self):
        parser.add_argument("name")
        parser.add_argument("age")
        parser.add_argument("spec")
        args = parser.parse_args()
        student_id = int(max(STUDENTS.keys())) + 1
        student_id = '%i' % student_id
        STUDENTS[student_id] = {
            "name": args["name"],
            "age": args["age"],
            "spec": args["spec"],
        }
        return STUDENTS[student_id], 201
    
api.add_resource(StudentsList, '/')

    
if __name__ == "__main__":
    app.run(debug=True)    