# pg6301_100021

To run the program: 
- run 'yarn start'
- go to http://localhost:8080/ in your browser

Without logging in you could press the button to reveal the top 3 rated pokemon. By default the user-input field
contains "All" which gives top 3 regardless of type. You could also filter by "Grass", "Fire", "Water" and "Bug". 
The filter is not complete and for now is case-sensitive and yields a error with status 500 if it doesn't match any of the filters.

You should be able to login with one of the existing test users with UserId: 'jon' and Password: '123'.
Alternatively you could register a new user. 

After logged in you could also search after ratings for more pokemon. For now there are only the first 12 pokemon to search from.
This search input-field is also not handled for user-error and will simply not give any response to the user if no match was found.

yarn test yields 23.93 %Stmts on All files.
