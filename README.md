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
7. run the project

```
npm run dev
```

## Documentation

`GET /`

Endpoint GET home

Nilai __Response__
```
{
    "status": 200,
    "message": "Success",
    "response": {}
}
```

`POST /login`

Endpoint untuk mengirimkan data login. 

Nilai __Request__:
```
{
	"email": email,
    "password": password
} 
```

Nilai __Response__:
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
Nilai __Request__:
```
{
    "username": username,
    "password": password,
    "password2": password2,
    "email": email
}
```
> __Warning__: `email` harus __unique__

Nilai __Response__:
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

Nilai header __Request__:
```
{
    "Authorization": Bearer token
}
```

Nilai __Response__:
```
{
    "status": 200,
    "message": "Success",
    "response": {}
}
```

`DELETE /logout`

Endpoint untuk melogoutkan user.

Nilai __Request__:
```
{
    "token": refreshToken
}
```

Nilai __Response__:
```
{
    "status": 200,
    "message": "success logout",
    "response": {}
}
```

`POST /token`

Endpoint untuk merefresh token `refreshToken`.

Nilai __Reqeust__:
```
{
    "token": refreshToken
}
```

Nilai __Response__:
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


## Enjoy our APP!
