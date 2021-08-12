# Typescript, Vue, Clean architecture project

## About

#### General

Web application to store and organize sound samples. **[Demo here](https://mysoundmemes.florentcadot.com/)**

#### Tech
The whole project will try to fit a clean architecture approach.

* Front: VueJs using Quasar framework --> https://quasar.dev/
* Back: Nestjs --> https://nestjs.com/
* Database: MongoDB
* Storage: AWS S3 Bucket 
* Prod: AWS EC2, Route53, nginx

## Local development

**Requirements**

* Front 

````
yarn global add @quasar/cli

or

npm install -g @quasar/cli
````

* Back

````
yarn global add @nestjs/cli

or

npm i -g @nestjs/cli
````

* Database : 
  * Install mongodb https://docs.mongodb.com/manual/administration/install-community/ 
  * Create a database
  * Create a user
  
Example using Mongo shell:
````
mongo
use mysoundmemes
db.createUser(
  {
    user: "testUser",
    pwd: "justdoit",
    roles: ["readWrite", "dbAdmin"]
}
)
exit
````

* Storage :  
  - Create an AWS account  
  - Create a private S3 bucket ( for only user sound file storage)
  - Create a public S3 bucket

### Ensure to set the correct config variables (see **back/config** files).
###Config variables example:
```
export AWS_PRIVATE_BUCKET_NAME='myprivatebucket'
export AWS_REGION='eu-west-1'
export AWS_ACCESS_KEY_ID='IAMANID'
export AWS_SECRET_ACCESS_KEY='IAMAKEY'
export AWS_PUBLIC_BUCKET_NAME='mypublicbucket'

export ACCESS_TOKEN_SECRET='iamasecrettoken'
export ACCESS_TOKEN_HEADER='iamatokenheader'
export ACCESS_TOKEN_TTL_IN_MINUTES=60
export LOGIN_USERNAME_FIELD='username'
export LOGIN_PASSWORD_FIELD='password'
export JWT_PRIVATE_KEY='iamaprivatekey'

export DATABASE_PORT=27017
export DATABASE_USERNAME='iamanusername'
export DATABASE_PASSWORD='iamapsw'
export DATABASE_NAME='iamadbname'

export EMAIL_USER='example@example.com'
export EMAIL_PASSWORD='iamapassword'

export FRONT_BASE_URL='http://localhost:8080'

```




## Resources

Back : 
- https://github.com/pvarentsov/typescript-clean-architecture
- https://github.com/Borrelli/mon-registre-backend

Front : 
- https://github.com/thanhchungbtc/vue-shopping-clean-architecture
- https://github.com/Borrelli/mon-registre-frontend 
