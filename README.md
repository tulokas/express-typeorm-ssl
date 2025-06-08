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

