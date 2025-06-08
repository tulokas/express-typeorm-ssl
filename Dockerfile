FROM node:18

WORKDIR /app

# ✅ Install a concrete netcat implementation
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for-mysql.sh

CMD ["sh", "./wait-for-mysql.sh"]
