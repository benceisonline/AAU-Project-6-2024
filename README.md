# How to run
You will need Node.js and install dependencies
`npx install`

Then start the program with
`npx expo start`

Install the Expo Go app and scan the QR code to run on your phone :)

Update IP to your local IP address in App.js and AxiosRequest.js

# Definition of Done
## Functionality
- Code must be functional, no new errors should be intentionally introduced to master branch (test the dev branch after committing PR before making PR to master)
  
## Code
- A PBI is not done before it is on the dev branch without any new errors
- No hard-coded variables or dead code
- Function/Variable names should be sufficient to understand their purpose (if not, write a comment at declaration)
- Close a feature branch once the feature has been merged into dev
- Any new dependencies should be clearly documented
- (Actions Check): Linting

## Testing
- (Actions Check): All tests must pass
- Test code when it bears significant functionality (no frontend testing)
- All code must be reviewed by at least one other team member

## Design
- All frontend components and their assets / utilities must be located in the correct folders
- If a design guide is provided, the design must follow said guide
- All design must be tested on Expo Go (or emulator)
  
## Best practices
- All routes must have exception handling
- All PRs should clearly indicate what PBI they belong to

# Short version for Github (use in PR Template)
- [x] Code has been tested locally and passes all relevant tests.
- [x] Documentation has been updated to reflect the changes, if applicable.
- [x] Code follows the established coding style and guidelines of the project.
- [x] All new and existing tests related to the changes have passed. 
- [x] Any necessary dependencies or new packages have been properly documented.
- [x] Pull request title and description are clear and descriptive.
- [x] Reviewers have been assigned to the pull request.
