A basic book management system with CRUD capability

To execute:
# 1.docker compose up
# 2.goto localhost:300

			**OR**							

# 1.docker run --name sql1 -e MYSQL_ROOT_PASSWORD=pass -p 3307:3306  mysql
# 2.docker network create net2
# 3.docker network connect net2 sql1
4.change directory to backend:
# 	1.docker build -t bimg .
#	2.docker run -p 8800:8800 --network=net2 bimg
5.change directory to client:
#	1.docker build -t cimg .
#	2.docker run -p 3000:3000 --network=net2 cimg
6.goto localhost:3000
