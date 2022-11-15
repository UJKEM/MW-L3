# MW-L3
MW-L3 is a basic full stack app built using Node.js, Express.js, React.js, and Redis. It includes CRUD operation(admin authentication is not being taken care of, since it is a basic app).

# Steps to Reproduce
1. Clone the repository into your local environment using command "git clone".
2. Install necessary dependencies using "npm i" on both server and client.
3. You may notice a folder called "client", please navigate into it and install necessary dependencies.
4. Get Redis Client from here: https://github.com/MicrosoftArchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.msi
5. If you fail starting redis server, please follow the steps here https://stackoverflow.com/questions/42857551/could-not-connect-to-redis-at-127-0-0-16379-connection-refused-with-homebrew
6. Please ensure you have a working redis-server before moving onto the project.
7. Navigate to your server code built using Node.js.
8. Open the terminal and paste the following command "npm run dev".
9. The client and server run on port 3000 and 4000 respectfully. Navigate to your web broswer and paste the following http://localhost:3000.
10. Start using the basic fullstack app.
