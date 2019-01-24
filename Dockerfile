FROM python:2.7.15-alpine3.7
COPY run.sh grpc-web-front-dev.tar grpc-web-front-prd.tar grpc-web-front-local.tar /
RUN chmod u+x /run.sh
CMD ["/run.sh"]
EXPOSE 3000
