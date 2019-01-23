#!/bin/sh

tar xzvf grpc-web-front-$ENV.tar
cd build
python -m SimpleHTTPServer 3000
