# afifmakarim-betest

## API Docs

### Get Token

| baseUrl 
| ------ |
| https://ms-afifmakarim-betest.herokuapp.com/api/v1 |

| Method | Path | Description |
| ------ | ------ | ------ |
| POST | /signup | Create new admin |
| POST | /signin | Create new accessToken(JWT)|

### CRUD

| baseUrl 
| ------ |
| http://localhost:3000/api/v1 |

| Header | isRequired | Description
| ------ |  ------ | ------ |
| x-access-token | Mandatory | API accessToken |

| Method | Path | Description |
| ------ | ------ | ------ |
| POST | /users | Create new user |
| PUT | /users/:id | Update user by Id |
| DELETE | /users/:id | Delete User by Id |
| GET | /users/:id | Get User by IdentitNumber |
| GET | /users/:id/account | Get User by Account Number |
