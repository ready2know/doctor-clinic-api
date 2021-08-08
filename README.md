# clinic-doctor-api
 
---
 
## Running server
 
To run the server use `npm start`.
MySQL database dump in `data` folder.
 
### Enviroment variables

| Name         | Dest.                                         |
| ------------ | --------------------------------------------- |
| PORT         | Port which server is listening (default 3000) |
| DB_HOST*     | Database server address                       |
| DB_USER*     | Database user login                           |
| DB_PASSWORD* | Database user password                        |
| DB_NAME*     | Database name                                 |
| JWT_SECRET   | secret key for JWT                            |
> \* required

 
## Endpoints
 
>**All params sends as JSON**
>**All responses return JSON**
 
>**The project uses Bearer authentication. For create, update, delete operations required token that returns `/auth/login` endpoint**
>*Passwords are stored in the database as is because this is a test task*
 
#### Auth
  * login `POST /auth/login`
    | Param    | Type   | Expected value |
    | -------- | ------ | -------------- |
    | login    | String | 3+ characters  |
    | password | String | 5+ characters  |
 
#### Clinic
  *  Get clinic list `GET /clinic/`
  *  Get filtered clinic list `GET /clinic/find-clinic`
      | Param    | Type  | Expected value         |
      | -------- | ----- | ---------------------- |
      | clinics  | array | Array of clinic ID's   |
      | doctors  | array | Array of doctors ID's  |
      | services | array | Array of services ID's |
      >If use several arrays, a subset will be selected that satisfies all parameters at once.
  *  Create clinic `POST /clinic/create-clinic`
      | Param | Type   | Expected value             |
      | ----- | ------ | -------------------------- |
      | name  | string | Unique name, 3+ characters |
  *  Update clinic `POST /clinic/update-clinic/`
      | Param | Type   | Expected value             |
      | ----- | ------ | -------------------------- |
      | id    | number | ID of the desired clinic   |
      | name  | string | Unique name, 1+ characters |
  *  Delete clinic `POST /clinic/delete-clinic/`
      | Param | Type   | Expected value           |
      | ----- | ------ | ------------------------ |
      | id    | number | ID of the desired clinic |

#### Service
  *  Get services list `GET /service/`
  *  Create service `POST /service/create-service`
      | Param | Type   | Expected value             |
      | ----- | ------ | -------------------------- |
      | name  | string | Unique name, 3+ characters |
  *  Update service `POST /service/update-service/`
      | Param | Type   | Expected value             |
      | ----- | ------ | -------------------------- |
      | id    | number | ID of the desired service  |
      | name  | string | Unique name, 1+ characters |
  *  Delete service `POST /service/delete-service/`
      | Param | Type   | Expected value            |
      | ----- | ------ | ------------------------- |
      | id    | number | ID of the desired service |

#### Doctor
  *  Get doctor's list `GET /doctor/`
  *  Get filtered doctor list `GET /doctor/find-doctor`
      | Param    | Type  | Expected value         |
      | -------- | ----- | ---------------------- |
      | doctors  | array | Array of doctors ID's  |
      | services | array | Array of services ID's |
  *  Create doctor `POST /doctor/create-doctor`
      | Param    | Type   | Expected value             |
      | -------- | ------ | -------------------------- |
      | name     | string | Unique name, 3+ characters |
      | services | array  | Array of services ID's     |
      | clinics  | array  | Array of doctor ID's       |


  *  Update doctor `POST /doctor/update-doctor/`
      | Param    | Type   | Expected value             |
      | -------- | ------ | -------------------------- |
      | id       | number | ID of the desired clinic   |
      | name     | string | Unique name, 1+ characters |
      | services | array  | Array of services ID's     |
      | clinics  | array  | Array of doctor ID's       |
      >Empty arrays delete all services/clinics relation with doctor. If you do not need to change - skip this parameter. 
  *  Delete doctor `POST /doctor/delete-doctor/`
      | Param | Type   | Expected value           |
      | ----- | ------ | ------------------------ |
      | id    | number | ID of the desired clinic |