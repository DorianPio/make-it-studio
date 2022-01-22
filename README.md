<h1 align="center">Project MakeItStudio BackendTest</h1>
<p align="center"><i>The project work with MangoDB, GraphQL, ExpressJs and Docker !</i></p>


This project is easy to test and work with docker so please check your version

To install the project please follow the instructions:

```git clone https://github.com/DorianPio/make-it-studio.git```

```cd graphQL-API```

For the next step you need <i>Docker</i>

Run:

```docker build --tag graphql-docker .```

For the next step you have two choices if you want to see the output of docker run:

```docker run --publish 8000:4000 graphql-docker```

else run:

```docker run -d --publish 8000:4000 graphql-docker```

And to access to the api you can go to

http://127.0.0.1:8000

If you have any questions don't hesitate


PS admin account to test all features is:

username: admin
email: admin@admin.com
password: admin