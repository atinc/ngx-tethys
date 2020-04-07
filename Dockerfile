FROM nginx:mainline-alpine
RUN rm /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/conf.d/
RUN mkdir -p /etc/nginx/html/ngx-tethys

COPY docs /etc/nginx/html/ngx-tethys
