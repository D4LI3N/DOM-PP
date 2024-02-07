from collections import defaultdict
import os
from typing import Optional
import uvicorn
import logging
import datetime
from mssql import MSSQL
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, Query, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import HTMLResponse
from jose import JWTError, jwt
# from datetime import timedelta, datetime, timezone

load_dotenv()
#logging.basicConfig(level=logging.DEBUG, format='%(levelname)s:    %(name)s: %(message)s')
logger = logging.getLogger("uvicorn.error")

class DOM_API(FastAPI):
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
    def __init__(self, *args, **kwargs):
        super().__init__(lifespan=self.lifespan,*args, **kwargs)

        self.setup_JWT()
        self.setup_CORS()
        self.setup_routes()
        self.setup_database()

    def lifespan(self, even=None):
        logger.info("CORS origins: " + os.getenv('CORS_ORIGINS'))
        logger.info("-------------START--------------")
        yield
        logger.info("-------------STOP---------------")
        self.db.close()

    def setup_JWT(self):
        self.oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
        self.JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
        self.JWT_ALGORITHM  = os.getenv('JWT_ALGORITHM')

    def setup_CORS(self):
        self.add_middleware(
        CORSMiddleware,
        allow_origins=os.getenv('CORS_ORIGINS').split(','),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )

    def setup_database(self):
        try:
            self.db = MSSQL(os.getenv('DB_CSTR'), logger)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

    async def validate_token(self, token: str = Depends(oauth2_scheme)):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

        try:
            payload = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=[os.getenv('JWT_ALGORITHM')])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        return username
    
    def setup_routes(self):

        @self.get("/",response_class=HTMLResponse)
        def home():
            return '<a href="https://danielthecyberdude.com"> <img src="https://img.huffingtonpost.com/asset/59d7eb611400001f23493818.jpg?ops=scalefit_720_noupscale" alt="Centered Image" style="display: block; margin: auto; max-width: 100%; max-height: 100vh;"/></a>'#{"message": "Hello, FastAPI!"}


        @self.post("/login")
        async def log_in(form_data: OAuth2PasswordRequestForm = Depends()):
            logger.info("[>] Login attempt: {} {}".format(form_data.username, form_data.password))
            try:
                user = self.db.get_user(form_data.username, form_data.password)
            except Exception as e:
                print("Database query error: "+str(e))
                raise HTTPException(status_code=500, detail=str(e))
            if user:
                print(user)

                token_data = {
                    "sub": user[0],
                    "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=int(os.getenv('JWT_EXPIRY_MIN'))),
                }
                token = jwt.encode(token_data, os.getenv('JWT_SECRET_KEY'), algorithm=os.getenv('JWT_ALGORITHM'))
                
                
                
                estates = self.db.get_user_estates(user[1])#04501621430
                #estates = self.db.get_user_estates("04501621430")#04501621430
                print(estates)
                types = self.db.get_user_types(tuple(dict(estates).keys()))#209
                #types = self.db.get_user_types(("209",))#209

                print(types)
                userdata = {
                    "username": user[0],
                    "oib": user[1],
                    "name": user[2],
                    "initials": ''.join(n[0].upper() for n in user[2].split()),
                    "phone": user[3],
                    "f_estates": [{'value': str(e[0]), 'name': e[1]} for e in estates],
                    "f_types": [{'value': str(e[0]), 'name': e[1]} for e in types]
                }
                print(userdata);
                
                return {"token": token, "token_type": "bearer", "userdata": userdata}
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    headers={"WWW-Authenticate": "Bearer"},
                )




        @self.get("/diagram_home")
        async def protected_diagram_home(
            username: str = Depends(self.validate_token),
            estate: Optional[str] = Query(None),
            type: Optional[str] = Query(None),
            year: Optional[int] = Query(None),
            month: Optional[int] = Query(None)
        ):
            print(year)
            print(month)
            print(estate)
            print(username)
            
            raw_points = self.db.get_diagram_home(username, estate, type, year, month)
            points = [{"month": row[0], "type": row[1], "total_consumption": round(row[2], 2) if row[2] is not None else None} for row in raw_points]
            print(points)
            return {"points": points}
        
        @self.get("/diagram_monthly_readouts")
        async def protected_diagram_monthly_readouts(
            username: str = Depends(self.validate_token),
            estate: Optional[str] = Query(None),
            type: Optional[str] = Query(None),
            year: Optional[int] = Query(None),
            month: Optional[int] = Query(None)
        ):
            print(year)
            print(type)
            print(month)
            print(estate)
            print(username)

            raw_points = self.db.get_diagram_monthly_readouts(username, estate, type, year, month)

            print(raw_points)

            # Create a dictionary to store data for each ID
            serials = {}

            # Fill in missing months and sort data for each ID
            for item in raw_points:
                serial_ = item[2]
                if serial_ not in serials:
                    serials[serial_] = [None] * 12  # Initialize with 12 None values
                serials[serial_][item[3] - 1] = item[4]

            # Flatten the data for all IDs into a single list
            filled_data = [{"serial": serial_, "type": type, "month": month + 1, "total_consumption": round(value, 2) if value is not None else None}
                        for serial_, values in serials.items()
                        for month, value in enumerate(values)]


            print(filled_data)
            return {"points": filled_data}








if __name__ == "__main__":
    app = DOM_API()
    uvicorn.run(app, host=os.getenv('HOST'), port=int(os.getenv('PORT')))



        # @self.get("/items/{item_id}")
        # def read_item(item_id: int):
        #     try:
        #         self.db_cursor.execute("SELECT * FROM YourTableName WHERE id=?", item_id)
        #         result = self.db_cursor.fetchone()
        #         if result:
        #             return {"item_id": result[0], "data": result[1]}
        #         else:
        #             raise HTTPException(status_code=404, detail="Item not found")
        #     except Exception as e:
        #         raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")

    # def read_item(self, item_id: int):
    #     try:
    #         self.db_cursor.execute("SELECT * FROM YourTableName WHERE id=?", item_id)
    #         result = self.db_cursor.fetchone()
    #         if result:
    #             return {"item_id": result[0], "data": result[1]}
    #         else:
    #             raise HTTPException(status_code=404, detail="Item not found")
    #     except Exception as e:
    #         raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")