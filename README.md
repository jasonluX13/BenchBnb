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
 
 
