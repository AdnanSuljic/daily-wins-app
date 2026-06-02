# Daily Wins App

A simple full-stack application for tracking daily achievements (“wins”) to help build consistency, motivation, and positive habits.

## 📌 Tech Stack
Frontend: React (Vite)  
Backend: FastAPI  
Database: PostgreSQL

## ⚙️ Getting Started

1. Clone the repository  
```bash
git clone git@github.com:AdnanSuljic/daily-wins-app.git
cd daily-wins-app
```
2. Create .env file
   
Create a .env file in the root directory. Use .env-example to check which environment variables are needed.

4. Run the application
   
Use shell scripts to run the application:
```bash
./pripremi_aplikaciju.sh
./pokreni_aplikaciju.sh
```

## ⚠️ **Important Notes**

Do not commit your <code>.env</code> file! Add it to <code>.gitignore</code>

## 🚀 Manual Deployment Guide (EC2 / Linux)
Manualy deploynment on EC2

1. Install Docker and git
```
sudo dnf update -y
sudo dnf install git docker -y
```

2. Staring docker and permissions
```
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

newgrp docker
```

3. Install Docker Compose
```
sudo curl -L "[https://github.com/docker/compose/releases/latest/download/docker-compose-$](https://github.com/docker/compose/releases/latest/download/docker-compose-$)(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

4. Clone repo
```
mkdir -p /app
sudo chown ec2-user:ec2-user /app
git clone https://github.com/AdnanSuljic/daily-wins-app.git /app
cd /app
```

5. Create <code>.env</code>
```
nano .env
```
```
DATABASE_URL="postgresql://postgres:password@RDS-ENDPOINT:5432/daily_wins_db"
VITE_API_BASE_URL="http://ALB-DNS-NAME/"
To save: CTRL+O, Enter,  CTRL+X.
```

6. Build image and start container 
```
docker-compose up -d --build
```
