FROM  python:2.7.15-alpine3.7
WORKDIR /client
COPY build .
CMD ["python", "-m", "SimpleHTTPServer", "3000"]
EXPOSE 3000
