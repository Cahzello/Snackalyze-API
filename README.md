# Snackalyze RESTful API

Snackalyze is a modern web application designed to transform the way you interact with snacks! By integrating cutting-edge image recognition technology, Snackalyze allows users to scan snack packaging and instantly access detailed and insightful information. Whether you’re tracking your diet, exploring new snacks, or simply curious about what you’re eating, Snackify has got you covered.

## Key Features

- 📸 Scan Snack Packaging
  Effortlessly scan any snack package to reveal all the essential details.

- 🍎 Comprehensive Nutritional Information
  Gain instant access to nutritional facts, including calorie counts, macronutrients, and ingredient lists.

- 📚 Recipe Ideas
  Discover creative recipes and ways to incorporate your favorite snacks into meals.

- 🌟 Personalized Recommendations
  Receive tailored suggestions based on your dietary preferences and health goals.

Empower your snacking journey with Snackalyze! 🍫📖

## Prerequisite

- Git `2.40 or higher`
- nodeJS `18.00 or higher`
- SQL DB `Recommended using mysql`

## How to run

1. Clone this repo:

```
git clone https://github.com/Cahzello/Snackalyze-API.git
```

2. Move directory to project

```
cd Snackalyze-API
```

3. Install depedencies:

```
npm i
```

4. copy .env.example to .env in same directory:

```
cp .env.example .env
```

5. create database. 'naming suggested: snackalyze'
6. fill the credentials .env needed
7. crete databse structure by running prisma:

```
npx prisma db push
```

8. run the project

```
npm run dev
```

## Documentation

> **Perhatian!!**: Semua request dibawah ini menggunakan request body!!

`GET /`

Endpoint GET home

Nilai **Response**

```
{
    "status": 200,
    "message": "Success",
    "response": {}
}
```

`POST /login`

Endpoint untuk mengirimkan data login.

Nilai **Request**:

```
{
	"email": email,
    "password": password
}
```

Nilai **Response**:

```
{
    status: 200,
    message: "Success",
    payload: {
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
};
```

`POST /register`

Endpoint untuk mendaftarkan user.
Nilai **Request**:

```
{
    "username": username,
    "password": password,
    "password2": password2,
    "email": email
}
```

> **Warning**: `email` harus **unique**

Nilai **Response**:

```
{
    "status": 201,
    "message": "Success Created",
    "response": {
        "payload": {
            "createUserStatus": true
        }
    }
}
```

`GET /dashboard`

Endpoint untuk mengambil data dari halaman dashboard

Nilai header **Request**:

```
{
    "Authorization": Bearer token
}
```

Nilai **Response**:

```
{
    "status": 200,
    "message": "Success",
    "response": {}
}
```

`DELETE /logout`

Endpoint untuk melogoutkan user.

Nilai **Request**:

```
{
    "token": refreshToken
}
```

Nilai **Response**:

```
{
    "status": 200,
    "message": "success logout",
    "response": {}
}
```

`POST /token`

Endpoint untuk merefresh token `refreshToken`.

Nilai **Reqeust**:

```
{
    "token": refreshToken
}
```

Nilai **Response**:

```
{
    "status": 200,
    "message": "success refresh token",
    "response": {
        "payload": {
            "accessToken": accessToken
        }
    }
}
```

`GET /profile/:id`

Endpoint untuk mendapatkan data user

Nilai **Request** header:

```
bearer token
```

Nilai **Response** body:

```
{
    "status": 200,
    "message": "Success",
    "response": {
        "payload": {
            "id": id,
            "email": email,
            "username": username,
            "Allergy": [
                {
                    "id": id,
                    "user_id": userId,
                    "allergy": {
                        "data": [
                            Array of string
                        ]
                    }
                }
            ]
        }
    }
}
```

`POST /profile/:id`

Endpoint untuk meupdate data user, email dan username

Nilai **Request** header:

```
bearer token
```

Nilai **Request** body:

```
{
    "username": username,
    "email": email
}
```

Nilai **Response** body:

```
{
    "status": 200,
    "message": "Success updated",
    "response": {
        "payload": {
            "id": id,
            "email": email,
            "username": usernmae,
            "password": password,
            "refreshToken": refreshToken,
            "accessToken": accessToken,
            "created_at": Date,
            "updated_at": Date
        }
    }
}
```

`GET /profile/allergy/:id`

Endpoint untuk mendapatkan list allergy

Nilai **Request** header:

```
bearer token
```

Nilai **Response** body:

```
{
    "status": 201,
    "message": "Success",
    "response": {
        "payload": {
            "id": id,
            "allergy": {
                "data": [
                    Array of String
                ]
            },
            "created_at": Date,
            "updated_at": Date,
            "user_id": userID
        }
    }
}
```

`POST /profile/allergy/:id`

Endpoint untuk mendapatkan list allergy

Nilai **Request** header:

```
bearer token
```

Nilai **Request** body:

```
{
    "allergy": [ Array of string ]
}
```

Nilai **Response** body:

```
{
    "status": 201,
    "message": "Success",
    "response": {
        "payload": {
            "id": id,
            "allergy": {
                "data": [
                    Array of String
                ]
            },
            "created_at": Date,
            "updated_at": Date,
            "user_id": userID
        }
    }
}
```

## Enjoy our APP!
