## Setup
```bash
docker build . -t nextjs_n12:16.1.0 --build-arg NODE_VERSION=12.16.1
```

## Development

```bash
cd ../
docker run -itd -p 84:3000 -v $(pwd):/opt/apps/ -v $(pwd)/logs:/opt/logs -e 'PROJECT_NAME=ecommerce-frontend' nextjs_n12:16.1.0
```

## Production

```bash
cd ../
docker run -itd -p 84:3000 -v $(pwd):/opt/apps/ -v $(pwd)/logs:/opt/logs -e 'APP_MODE=release' -e 'PROJECT_NAME=ecommerce-frontend' nextjs_n12:16.1.0
```
