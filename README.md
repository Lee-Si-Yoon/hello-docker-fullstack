# hello-docker-fullstack

## Commands

```sh
# DEV
docker-compose -f docker-compose.dev.yaml up --build

# PROD
docker build -t siyoonlee/hello-docker-frontend ./frontend
docker build -t siyoonlee/hello-docker-nginx ./nginx
docker build -t siyoonlee/hello-docker-backend ./backend

docker-compose up --build

# to browse - in different shell
docker-compose exec frontend sh
```

## Stack

### FE

CRA + typescript

### BE

1. express + typescript

## Goals

1. user inputs nodejs code to textarea
2. user clicks submit + POST to BE
3. express server runs it in sandbox env
4. express server returns result to FE

## TODOs

1. convert to [private repo image](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration-dc)
