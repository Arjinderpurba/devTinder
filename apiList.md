# DevTinder API's

## authRouter
- POST /signup
- POST /login
- POST /loguot
- PATCH /deleteprofile

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // Forgot password API 

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/send/accepted/:requestId
- POST /request/send/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on plastform


Status: ignore, interested, accepted, rejected  ,