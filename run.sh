#!/bin/sh

if [ -d build ]; then
    rm -rf build
fi

tar xzvf grpc-web-front-$ENV.tar
cd build
python -m SimpleHTTPServer 3000
