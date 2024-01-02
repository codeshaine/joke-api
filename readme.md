# Joke_API

#### description:

This is an simple joke api that can perform CRUD operations.This is built for learning purpose.
Objectives were to build an api and containarize it using docker

### To use or run this on your local machine follow the instructions:

- Clone the repository

```
https://github.com/codeshaine/joke-api.git
```

- Open the project in any Code Editor / IDE

### By Docker

- Follow the given command to build the docker image and run that image in conatiner

```
docker build -t <name-for-your-image> .
```

```
 docker run --name myapi -p 3000:3000 -d <name-for-your-image>
```

### By Node

- Get inside the project directory

```
npm i
```

```
npm run start
```

### where to access the api

- The api is running on your local machine port 3000

```
http://localhost:3000/
```

## Api routes

### Get random jokes

- This is an get method no need to pass any params and query
- This is a GET method

```
http://localhost:3000/random/
```

### Get specified jokes

- This is for getting specified joke. Replace the <id> with the id of the joke you want to get (by default there is 100 joke)
- This is a GET method

```
http://localhost:3000/jokes/<id>
```

### Get filtered jokes

- This is for getting jokes based on their type. yop can replace <joke-type> with actual type of the joke
- This is a GET method

```
http://localhost:3000/filter?type=<joke-type>
```

### To post a new joke

- This is for posting a new joke inside the joke api. note that this is an post method you need to pass the body of the joke.
- Body must contain: 'text' & 'type' as their property.

- note: 'type' and 'text' is case sensitive you must enter as shown here
- This is a POST method

```
http://localhost:3000/jokes
```

### To replace a joke

- Specify the id of the joke that you want to replace
- request must contain body same as post. both two values are mandatory
- This is a PUT method

```
http://localhost:3000/jokes/<id>
```

### To update a joke

- Unlike repplace there is no need to give both values to the body of the request. body must contain the properties that you want to update
- This is a PATCH method

```
http://localhost:3000/jokes/<id>
```

### To delete a joke

- You cant give the specified id of the joke that you want to delete
- This is a DELETE method

```
http://localhost:3000/jokes/<id>
```

### To delete all the joke

- If you request this you will delete all the jokes
- In order to achieve this you need to pass api key as:key: 'codeshaine@123'
- This is a DELETE method

```
http://localhost:3000/jokes/all?key=<refer-above>
```

<div align="end">
<a href="Joke_API">Go to up👆</a>
</div>

## Thankyou for reading ..<3
