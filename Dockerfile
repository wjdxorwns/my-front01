# 1단계: 빌드용 Node.js 환경
FROM node:20-alpine AS build
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사하여 의존성 설치
COPY package*.json ./
RUN npm install --verbose  # --verbose로 로그를 자세히 출력

# 소스 코드 복사
COPY . .

# react-scripts 실행 가능하게 만들기
RUN chmod +x node_modules/.bin/react-scripts

# 빌드 실행
RUN npm run build --loglevel verbose  # 빌드 로그를 자세히 출력

# 2단계: Nginx 정적 파일 서비스용
FROM nginx:alpine

# 빌드 결과물을 Nginx 서버에 복사
COPY --from=build /app/build /usr/share/nginx/html

# 80 포트로 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
