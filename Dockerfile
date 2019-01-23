FROM  node:10.5.0-alpine
WORKDIR /client
COPY build .
RUN apk --update add python
CMD ["python", "-m", "SimpleHTTPServer", "3000"]
EXPOSE 3000
