# Typescript, Vue, Clean architecture project

## About

#### General

Web application to store and organize sound samples.

#### Tech
The whole project will try to fit a clean architecture approach.

* Front: VueJs using Quasar framework --> https://quasar.dev/
* Back: Nestjs --> https://nestjs.com/
* Database: MongoDB
* Storage: AWS S3 Bucket

### Backend requirement
**Create a .env file in /back with the following variables**
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

export BACKEND_PORT=3000
export FRONT_BASE_URL='http://localhost:8080'
```

### AWS S3
**Create an user in IAM and attach the following policy**

````json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:ListAllMyBuckets"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::mysoundmemes-bucket",
                "arn:aws:s3:::mysoundmemes-bucket/*"
            ]
        }
    ]
}

````


### Launch using docker and docker-compose
```shell
docker-compose up
```

## Resources

Back : 
- https://github.com/pvarentsov/typescript-clean-architecture
- https://github.com/Borrelli/mon-registre-backend

Front : 
- https://github.com/thanhchungbtc/vue-shopping-clean-architecture
- https://github.com/Borrelli/mon-registre-frontend 
