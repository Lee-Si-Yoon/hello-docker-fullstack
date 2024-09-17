# hello-docker-fullstack

## Commands

```sh
# DEV
docker-compose -f docker-compose.dev.yaml up --build

# PROD
docker build -t siyoonlee/hello-docker-web ./web
docker build -t siyoonlee/hello-docker-nginx ./nginx
docker build -t siyoonlee/hello-docker-python ./python
docker build -t siyoonlee/hello-docker-nodejs ./nodejs

docker-compose up --build

# to browse - in different shell
docker-compose exec nginx sh
```

## Stack

### FE

1. CRA + typescript: PORT 3000

### BE

1. express + typescript: PORT 5000
2. FastAPI: PORT 8000

## Goals

1. user inputs nodejs code to textarea
2. user clicks submit + POST to BE
3. express server runs it in sandbox env
4. express server returns result to FE

## TODOs

1. convert to [private repo image](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration-dc)
2. use [docker login action](https://github.com/docker/login-action/tree/v3/) to secure credentials

## Commit rules

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
