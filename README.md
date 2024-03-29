# BenchBnb
---
## Features
### Add a bench (Requires Validation)
  - (Not logged in) => Redirects to login
  - (Logged in) => Create a bench page => provide values for all four fields => enable submit button => add bench to list => redirect to list
  - Create a bench page => Cancel => Redirect to global list 
---
### Bench Details
 #### View Fields
  - Rating (avg rating to 1 decimal place)
  - Description
  - Number of Seats
  - lat long
  ##### User Reviews 
    - sorted by recent
    - "no reviews yet" if no reviews
    - Reviewers rating
    - Feedback
    - Time review was submitted
    - First Name Last Initial
---
### Bench List
 - Rating / "No Ratings"
 - Number of seats
 - Description (First ten words ...)
 - Creator First Name Last Initial
 
 **Pagination**
 - Show 50 benches per page max
 - Sorted by newest first
 - Link to see next 50 (If available)
 - Link to see previous 50 (If available)
 
 **Filter**
 - Filter by min seats, max seats, or both
 - Sort by newest
 - When constraints are cleared, load default list
 
 ---
 ### Login 
  - Login link visibile on every page if not logged in
  - Login Page => Cancel => Home Page
  - If logged in successful, redirect to homepage and show logout button, no login button
  - Either invalid email or password, show login page with error "Those credentials do not exist for this application."
  - Only enable login button when both fields are filled out
  
  ### Logout 
    - Logout button on  every page if logged in
    - If logged in and button clicked, log out and show home page
    
 ### Map
  - Show markers for each bench in list
  - List only shows benches visible on map
  - Clicking on a blank space will redirect to add bench page with lat long filled  out
  - Clicking on a maarker redirects to that bench detail page
  - Zooming or moving map:  list only contain benches on the map
  - Filter by num seats
  
 
 ### Sign Up
    - Sign up link on every page if not signed in
    - Cancel => Homepage
    - Email (check if already used)
    
    - First Name
    - Last Name
    - Password
    
    - Sign Up also logs you in
    - Disable button if all fields not filled
 
---
---
 ## Plan
- [x] Create initial project and install required packages
- [ ] Set up database repository
- [ ] Setup user authentication with login and logout
- [ ] Sign up page
- [ ] Basic list of benches 
- [ ] Implement Pagination and filtering
- [ ] Add a bench 
- [ ] Basic bench details
- [ ] Add user reviews to bench details
- [ ] Display a map with markers 
- [ ] Implement clicking on a bench
- [ ] Implement clicking on blank space
- [ ] Make list update when map moves 
- [ ] Implement filtering
---
---
## Details

### Models

#### Bench 
  - Properties: Id, Description, NumSeats, Lat, Long, CreatorId
  - Methods: 

#### User
  - Properties: Id, FirstName, LastName, Email, HashedPassword
  - Methods: 

#### Review
  - Properties: Id, UserId, BenchId, Rating, Feedback, TimeSubmitted
  - Methods: 
---
### Controllers

#### HomeController
  Contains the homepage which includes the map and list.

  Methods: Index

  Views: Index


#### AccountController
  Responsible for login, logout and signup.

  Methods: Login, Logout, Signup

  Views: Login, Signup

#### BenchController
  Responsible for adding a bench and bench details.

  Methods: Add, Details

  Views: Add, Details

---
### Repositories

#### BenchRepository

  Methods: 
  - GetBench(int id)  
  - GetAll()
  - GetFiltered(int min, int max)
  - AddBench(Bench bench)



