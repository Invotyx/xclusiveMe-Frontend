# Xclusiveme Frontend

XclusiveMe is a social media platform that empowers content creators by giving them control of their revenue models. Yes you read it right! No one except the content creator themselves knows the worth of their content. XclusiveMe allows content creators to set the price of the content they post and the users will only be able to watch the content if they have paid for it.

---

![BA9D83F0-0E42-4853-AB29-27D901281AFF](https://user-images.githubusercontent.com/73292081/154040285-63c416b8-a8c9-40b1-87cb-9f7e4989c740.jpeg)
---
![5BC5F40C-97EC-4DB7-ADD7-88E2711E25A3](https://user-images.githubusercontent.com/73292081/154040317-1ed4bddc-927d-4da0-86d1-989763d5a4a4.jpeg)
---
![E22E020C-1F5B-4B4C-B02B-F22340199783](https://user-images.githubusercontent.com/73292081/154040324-528b50e9-872c-4a60-9e48-eed7c7e846f1.jpeg)
---
![3FC19D09-30F2-4382-B387-985439D5D862](https://user-images.githubusercontent.com/73292081/154040328-34b4618b-8483-4297-b4c2-06c681b8fb24.jpeg)
---
![4BCF6B86-B8E2-4646-A4D4-D906C89D095F](https://user-images.githubusercontent.com/73292081/154040336-46756357-64c2-47ba-882e-1025a321c38d.jpeg)
---
![A9552351-A7DD-44A3-841C-22721B64054F](https://user-images.githubusercontent.com/73292081/154040344-7b2a36e7-4a97-480b-a024-9d68f844b441.jpeg)
---
![382E574A-EF61-4E06-A8E5-04BD576078A2](https://user-images.githubusercontent.com/73292081/154040350-effe73f2-547f-486f-9e2a-6ef2a84c27a3.jpeg)
---
![E88C3130-E4CE-47BB-8673-E8AC227D8546](https://user-images.githubusercontent.com/73292081/154040355-d8291667-6df7-42a4-83ff-09d7692ab74f.jpeg)
---
![289FDE9E-5060-4903-AB58-BDEBA86A6823](https://user-images.githubusercontent.com/73292081/154040362-0b5a3239-fba7-48b8-a0f6-b18fb4f621cc.jpeg)
---


## Requirements

1. NodeJS 14+

## Setup

Clone repository and copy `.env.local.example` to `.env.local`
Install dependencies `npm install` or `yarn install`

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run in Docker

```bash
# To build docker image
docker build -t xclusiveme-frontend $(cat .env | sed 's@^@--build-arg @g' | paste -s -d " ") .

# To run docker container
docker run -it --rm -p <port>:<port> xclusiveme-frontend
```
