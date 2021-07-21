# Link Shortner
App for shortner all long URL

## Description
Whit the help of this app you can convert all of long URL to tiny URL, It's help to you when you need tiny URL for give your friends in Social Media or prefer use in you'r own Website.
***
## Getting Start
1. Install docker and docker-compose,
2. Change ``.example.env`` to ``.env``
3. go into the ``.env`` and set your da_name, da_user, db_pass WITHOUT quotation mark (sessionSecret WITH quotation mark),
4. Type blow text in command line:
```bash
docker-compose build && docker-compose up -d
```
5. App is now accessible on ``http://localhost``
6. your postgres database run on port ``5432`` on postgres container and also open port ``54322`` on host for accessible from out of host inviroment to inside database
***
## Helping out
If you want accessible to database into the docker you can write the text blow un command line
```bash
psql -h localhost -p 5432 -U postgres <<your database name >>
```
***
** You can access your database when your app is run **
***
## Public service
This app is single page web app and currently is available at http://urlshr.ir and also you can use in tablet and mobile because is simple responsive 
