# docker compose up

														OR							

# docker run --name sql1 -e MYSQL_ROOT_PASSWORD=pass -p 3307:3306  mysql
# docker network create net2
# docker network connect net2 sql1
inside backend:
# 	docker build -t bimg .
#	docker run -p 8800:8800 --network=net2 bimg
inside client:
#	docker build -t cimg .
#	docker run -p 3000:3000 --network=net2 cimg
goto localhost:3000