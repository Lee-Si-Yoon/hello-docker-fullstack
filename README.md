# hello-docker-fullstack

## Commands

```sh
# DEV - opens in localhost:3000
docker-compose -f docker-compose.dev.yaml up --build

# PROD - opens in localhost:80
docker-compose up

# to browse - in different shell
docker-compose exec nginx sh
```

## Stack

### FE

1. CRA + typescript: PORT 3000

### BE

1. express + typescript: PORT 5000
2. FastAPI: PORT 8000

## TODOs

1. convert to [private repo image](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html#single-container-docker-configuration-dc)
2. use [docker login action](https://github.com/docker/login-action/tree/v3/) to secure credentials
3. use js transpiled version for nodejs server
4. convert to pnpm for faster installation

## Commit rules

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
