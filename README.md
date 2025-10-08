# Frontend Service 🖥

Frontend of the distributed payment system.

## 🧩 Main features

- Display the *service catalog* (GET /catalog)
- Allow the user to *initiate a payment* (POST /payment)
- Display the *payment status in real time* (GET /status/{traceId})

## 🧠 User flow

1. The user enters the catalog → /GET/catalog
2. Selects a service and pays → /POST/payment
3. A tracking screen is displayed that queries /GET/status/{traceId} every 2 seconds.

## 🌩 Deployment

- *AWS S3:* static hosting
- *CloudFront:* CDN and HTTPS
- *API Gateway:* backend endpoints

Translated with DeepL.com (free version)
