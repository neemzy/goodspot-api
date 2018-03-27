# goodspot-api

Quick'n'dirty API for TheGoodSpot app, used in Hackademy's Vue.js tutorial

## Setup

```
# install dependencies
$ npm install

# load fixture data
$ npm run fixtures

# run on http://localhost:3000
$ npm start
```

## Usage

Use this API to [follow Hackademy's Vue.js tutorial](link-tbd).

### Endpoints

| Endpoint          | Description                   | Needs authentication? |
| ----------------- | ----------------------------- | --------------------- |
| `GET /ads`        | Retrieve all ads              | No                    |
| `GET /ads/:id`    | Retrieve a single ad          | No                    |
| `POST /login`     | Log in                        | No                    |
| `GET /my-ads`     | Retrieve current user's ads   | Yes                   |
| `POST /ads`       | Create an ad for current user | Yes                   |
| `PUT /ads/:id`    | Update an ad for current user | Yes                   |
| `DELETE /ads/:id` | Delete an ad for current user | Yes                   |

Requests requiring authentication must be sent with an `Authorization: User X` header, where `X` is the current user's `id`.

### Fixture users

| Name               | `email`                  | `password` |
| ------------------ | ------------------------ | ---------- |
| Achille Talon      | `atalon@example.com`     | `virgule`  |
| Hilarion Lefuneste | `hlefuneste@example.com` | `cuistre`  |
