#!/bin/sh

if [ -d build ]; then
    rm -rf build
fi

if [ -z "$ENV" ]; then
    tar xzvf grpc-web-front-local.tar
else
    tar xzvf grpc-web-front-$ENV.tar
fi

cd build
python -m SimpleHTTPServer 3000
