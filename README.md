# Express + TypeORM + MySQL SSL POC

This project demonstrates a secure database connection using:

- Node.js with Express and TypeORM
- MySQL over SSL (via Docker or Amazon RDS)
- Self-signed certs for local dev, global-bundle.pem for RDS
- Automatic database seeding via init.sql

---

## 🔧 Local Setup (with Docker + SSL)

### 1. Generate Self-Signed Certificates

```bash
./generate-certs.sh
```

This creates:

```bash
mysql/certs/
├── ca.pem
├── server-cert.pem
├── server-key.pem

client-cert/
├── ca.pem
├── client-cert.pem
├── client-key.pem
```

### 2. Start MySQL and Express Backend
```bash
docker-compose down -v
docker-compose up --build
```

### 3. Test the API

`curl http://localhost:3000/users`

Expected output:

```json
[
  { "id": 1, "name": "Alice", "email": "alice@example.com" },
  { "id": 2, "name": "Bob", "email": "bob@example.com" }
]
```

## ☁️ Using Amazon RDS with SSL

### 1. Download RDS CA

```bash
wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -O client-cert/global-bundle.pem
```

### 2. Modify TypeORM SSL Settings

In data-source.ts:

```ts
ssl: {
  ca: fs.readFileSync('/certs/global-bundle.pem', 'utf8')
}
```

Remove cert and key — RDS uses one-way SSL with just the CA.

### 3. Update .env for RDS connection

```bash
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=3306
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_db
```

### 4. Update docker-compose.yml (skip mysql)

-   Comment/remove the mysql service
-   Remove depends_on: [mysql] from backend
-   Mount only the client-cert volume

## Project Structure

```bash
express-typeorm-ssl/
├── docker-compose.yml
├── generate-certs.sh
├── .env
├── .gitignore
├── client-cert/
├── mysql/
│   ├── Dockerfile
│   ├── my.cnf
│   └── init/init.sql
├── src/
│   ├── app.ts
│   ├── data-source.ts
│   └── entity/User.ts
├── wait-for-mysql.sh
├── package.json
├── tsconfig.json
```

## 🧹 Cleanup

`docker-compose down -v`

## 🔑 Notes

-   synchronize: true is for dev only — use migrations in production
-   Self-signed certs only for local; use global-bundle.pem for RDS
-   wait-for-mysql.sh ensures backend waits for DB readiness

