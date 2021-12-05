# Use Cases Evolvable-by-design

Use-cases studied:

- [Dialog Flow](https://github.com/evolvable-by-design/dialog-flow)
- [Page Speed Script](https://github.com/evolvable-by-design/pagespeed_api_apps_script)
- [Spaghetti Makes Me Moody](https://github.com/evolvable-by-design/spaghetti-makes-me-moody)
- [Utify](https://github.com/evolvable-by-design/utify)
- [Projet Simba](https://github.com/evolvable-by-design/Projet-Simba)

## Use Case 1: Dialog Flow

API used: Google Dialogflow

### Repositories

- Client: [lauchness/dialog-flow](https://github.com/lauchness/dialog-flow/commit/929dd1f84dde381d2e393a5f76a34cf95112054f)
- Client [fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/dialog-flow)
- Server: [lauchness/dialog-flow-server](https://github.com/lauchness/dialog-flow-server)
- Server [fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/dialog-flow-server)

**Amount of changes:** 1

**Type of change:** change model of returned data

### Change 1: change returned model

**Description of the change:** do an API change (change returned model) while moving the API call to the server, see UI commit (https://github.com/lauchness/dialog-flow/commit/929dd1f84dde381d2e393a5f76a34cf95112054f) and server commit (https://github.com/lauchness/dialog-flow-server/commit/2b8b301d4909a6dbbbbda674ebe20989956118e2)

**Description of the work done:**

1. Fork both the client and the server
2. Remove the model change from the API to create a first version returning a model that is equal to the model previously used on the frontend
3. Create the API documentation and serve it from the backend on OPTIONS {baseApiUrl}/
4. Modify the frontend to use the first version of the API
5. Create the proper accounts on Google Cloud Console and Google API Console to get the dialog flow API credentials
6. Implement the evolvable-by-design approach into the frontend, [in a single commit](https://github.com/evolvable-by-design/dialog-flow/commit/560dc4de7e1a7db36510151ed67c01fcad16039f)
7. Replay the API evolution
8. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**

### Report

- How many evolutions? ➜ 1
- Types of evolutions ➜ change type of return value (n°3)
- One or several commits? ➜ 1
- How many lines per commit for the original evolution? ➜ 2 (for a 721 lines program)
- How many lines of code to implement the approach on the frontend? ➜ 43 lines changed
- One or several developers ➜ 1
- If tests, broken? ➜ no tests
- Covered or not covered? Covered

### How to test the evolution

1. Clone the [server repository](https://github.com/evolvable-by-design/dialog-flow-server/)
2. Go back to the commit before the evolution `git checkout before-evolution`
3. Start the server `npm start`
4. Clone the [frontend repository](https://github.com/evolvable-by-design/dialog-flow/), install the dependencies (`yarn install`) and then start it (`yarn start`)
5. Play with it
6. Stop the server `ctrl + c` in the bash session
7. Move to the server commit implementing the evolution `git checkout after-evaluation`
8. Start the server back `npm start`
9. Refresh the frontend and play with it, it is still working while the code has not changed

---

## Use Case 2: Page Speed API App Script

> Info: this code does not have a frontend. Yet, the evolvable-by-design approach is applicable here because the two types of changes are the base URL and the type of the returned value. Indeed, only a change of the input parameters require a user interface to let the user input the parameters manually.

### Repositories

- Original repository: [pagespeed_api_apps_script](https://github.com/IronistM/pagespeed_api_apps_script/) ➜ one evolution, v1 to v2: URL + returned model
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/pagespeed_api_apps_script)

**Amount of changes:** 2

**Types of changes:**

- Change model of returned data (n°3)
- Rename method (n°5)

**Commit with the changes:** [cb536a](https://github.com/IronistM/pagespeed_api_apps_script/commit/cb536a8389b6ac2090e5ab53e7f1b8a42a0fd62e)

**Description of the work done:**

1. Fork the project [here](https://github.com/evolvable-by-design/pagespeed_api_apps_script)
2. Create an evolvable-by-design branch from the commit before the one introducing the two evolutions
3. Adapt the application to run locally, because it is initially a Google App Script app ([commit](https://github.com/evolvable-by-design/pagespeed_api_apps_script/commit/ced50c0e0da54bf82f7be0ecf2aab2378c0caa66))
4. Create a mock server for both version of the API along with the v1 documentation, because it is not online anymore ([commit](https://github.com/evolvable-by-design/pagespeed_api_apps_script/commit/169b9f99d876aaec532a1feaccd7448a4a895a55))
5. Implements the evolvable-by-design approach [in a single commit](https://github.com/evolvable-by-design/pagespeed_api_apps_script/commit/9809e38984b9d7f556a36cad1a689bea032b7250)
6. Replay the API evolutions (already done in [the mock server commit](https://github.com/evolvable-by-design/pagespeed_api_apps_script/commit/169b9f99d876aaec532a1feaccd7448a4a895a55))
7. Adapt the server to easily change the version [3dceefd](https://github.com/evolvable-by-design/pagespeed_api_apps_script/commit/3dceefd15a86fe6461ee9436938dcae26df48460)
8. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**

### Report

- How many evolutions? ➜ 2 (from v1 to v2)
- Types of evolutions ➜ change type of return value (n°3) + rename method (n°5)
- One or several commits? ➜ 1
- How many lines per commit for the original evolution? ➜ 2 (for a 63 lines program)
- How many lines of code to implement the approach on the frontend? ➜ 15
- One or several developers ➜ 1
- If tests, broken? ➜ no tests
- Covered or not covered? Covered

### How to test the evolution

1. Clone the [repository](https://github.com/evolvable-by-design/pagespeed_api_apps_script).
2. Open `server/index.js` and set `const VERSION = 1` in the beginning of the file.
3. Start the server `node server/index.js`.
4. Starts the scripts `node run.js` -> it should display `80` at then end.
5. Stop the server with `ctrl+c` in the window where you launched it.
6. In the `server/index.js` set `const VERSION = 2` in the beginning of the file
7. Start the server `node server/index.js`.
8. Starts the scripts `node run.js` -> it should display `70` at then end.
9. Stop the server with `ctrl+c` in the window where you launched it.

---

## Use Case 3: Spaghetti Makes Me Moody

### Repositories

- Original repository: [danielsinclairtill/spaghetti-makes-me-moody](https://github.com/danielsinclairtill/spaghetti-makes-me-moody)
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/spaghetti-makes-me-moody)

**Amount of evolutions:** 3

**Types of evolutions:**

- Add parameter (n°1)
- Request method change (n°23)

**Commits with the evolutions:**

- Add a `historyData` parameter to the createUser route [6c17e41](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/6c17e41dd710dce2871b49fb7f15ce6693d940f9#diff-6e97426cd40ca2d61b263b6dda6cb512)
- Add `username` and `password` parameters to the analyzeText route [f8a145a](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/f8a145a44e8a852c59daf9cbae134552729bc437#diff-6e97426cd40ca2d61b263b6dda6cb512)
- Change HTTP verb from `post` to `put` [64f2837](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/64f28374737937cff69785dc5069f576873e0e54#diff-6e97426cd40ca2d61b263b6dda6cb512)

**Description of the work done:**

1. Fork the project [here](https://github.com/evolvable-by-design/spaghetti-makes-me-moody)
2. Create an evolvable-by-design branch from the commit before the first evolution done (728264a)
3. Fix npm dependencies
4. Enable the [google natural language API](https://console.developers.google.com/apis/library/language.googleapis.com?q=language&id=223648f2-2e7c-4acd-b0ca-782f9021a541&project=evolvable-by-design-exper-svlb&flow=gcp), which requires billing and use the key in the code
5. Create the API documentation and serve it from the backend on OPTIONS /
6. Implement the evolvable-by-design approach in a single commit [a8d4f9a](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/a8d4f9a2e40cbddefc0058508f190f69ca7e2c7f)
7. Apply the changes of the following commits to reproduce the evolution: 83c4ee4, c91ec8d, 450d627, 728264a (c00b590 is ignored because it is a copy of 728264a)
8. Verify that the frontend still work -> **Success**, but not significant in this case because the modification is the addition of an optional parameter, not using the approach would have given the same result. The historyData parameter have not been sent to the API.
9. Apply the commit 6c17e41 that adds the support for `historyData` into the frontend **and adds a semantic descriptor for the added `historyData` data** -> now the frontend support the new feature without modifying the API layer. // It confirms that the web user interface must semantically describe its data and make it available to the library
10. Apply commits until the next evolution in f8a145a. The list is: f09450a, 733344e, 4150de1, df376c8 (ignored because merge commit), 2277de9, e4f4338 (ignored because merge commit), 63eaffd, afc0225 (ignored because merge commit), 9a84f96, fbd53fd, 2d10210, 2ae0c1a (ignored because merge commit), a1eeaec, c122a35 (ignored because merge commit), 89177c2 (ignored because merge commit)
11. Adds the operation concerned by the evolution in [f8a145a](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/f8a145a44e8a852c59daf9cbae134552729bc437#diff-6e97426cd40ca2d61b263b6dda6cb512) to the previously added OpenApi documentation.
12. Apply the evolvable-by-design approach to the API call concerned by the evolution in [f8a145a](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/f8a145a44e8a852c59daf9cbae134552729bc437#diff-6e97426cd40ca2d61b263b6dda6cb512), [in a single commit 4b9ae40](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/4b9ae40d6c43365aa1dc1b7f27142e28bcc61798).
13. Apply the back-end changes of commit f8a145a to reproduce the evolution
14. Verify that the frontend still work -> **Success**, it works but the username and password and not sent to the backend. Thus, the feature that the developers wanted to add is not available to the user, which is expected in our approach. If the two parameters were required, our library would have asked them to the user and the feature would have been available to the user. In both cases, the web UI continue to work. Yet, not using the approach here, in this case, would have make no difference. The password and username are not sent because their are not available to the library when the API call is done. Once again, it proves that contextual values must be semantically annotated and available to the library on request.
15. Add the username and password to the context of the component making the analyzeText call in order to make the new feature available to the user.
16. Start working on the evolution of [64f2837](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/64f28374737937cff69785dc5069f576873e0e54#diff-6e97426cd40ca2d61b263b6dda6cb512) (request method change). It is not required to change the code to apply the evolvable by design approach because it has already been done for the first studied evolution.
17. Replay evolution of [64f2837](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/64f28374737937cff69785dc5069f576873e0e54#diff-6e97426cd40ca2d61b263b6dda6cb512) in [4ba3d10](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/4ba3d1000c04c9dc6e649a2ae00e90a95861ed23).
18. Verify that the frontend still work -> **Success**


### Report

- How many lines of code is the project? ➜ 2 827 lines
- How many evolutions? ➜ 3
- Types of evolutions ➜ add parameter (1) 2 times and request method change (23)
- One or several commits? ➜ Evolution 1: several -- Evolution 2: 1 -- Evolution 3: 1
- How many lines per commit for the original evolution? ➜ Evolution 1: 4 -- Evolution 2: 22 -- Evolution 3: 1
- How many lines of code to implement the approach on the frontend? ➜ Evolution 1: 57 -- Evolution 2: 38 -- Evolution 3: 0 (done for evolution 1)
- One or several developers ➜ several - 4
- If tests, broken? ➜ no tests
- Covered or not covered? Evolution1: partially covered -- Evolution 2: covered -- Evolution 3: covered

### How to test the evolutions

1. Clone the [repository](https://github.com/evolvable-by-design/spaghetti-makes-me-moody).
2. Create yourself a [Google natural language API key](https://console.developers.google.com/apis/library/language.googleapis.com?q=language) and keep it in a safe space.
3. Move to the commit before the first evolution: `git checkout before-evolution-1`.
4. Install the dependencies: `cd front-end && npm install && cd ../back-end && npm install && cd ..`.
5. Start mongo db `mongod` (you need to have it installed on your machine).
6. Start the server `cd back-end && node app.js`.
7. Create a `config.json` file in `front-end/src/` with the content: `{ "google": { "languageApiKey": YOUR_KEY_HERE }}`.
7. Start the frontend `cd front-end && npm start`.
8. Enter text in the Journal view, see the result and then go to "Login" page and create a new account. Watch the HTTP request sent (in the developer console of your web browser), it should not send `historyData` in the body of the `POST /createUser/{userName}/password/{password}` request.
9. Stop the backend and the frontend, with ctrl+c in both windows.
10. Move to the commit after the first evolution `git checkout after-evolution-1`;
11. Restart the front-end and the back-end.
12. Redo step 8, this time you will see a `historyData` in the body of the `POST /createUser/{userName}/password/{password}` request.
13. Stop the backend and the frontend, with ctrl+c in both windows.
14. Move to the commit before the second evolution: `git checkout before-evolution-2`
15. Move the config file from `front-end/src/config.json` to `back-end/config.json` and restart the front-end and the back-end
16. Type text in the input on the Journal view. You should get a response. Take a look at the `POST /analyzeText` request, the body should contain a `text` field but no `username` and `password` field.
17. Stop the backend and the frontend, with ctrl+c in both windows.
18. Move to the commit after the second evolution: `git checkout after-evolution-2`
19. Restart the front-end and the back-end
20. Redo step 16, this time you will see a `username` and `password` in the body of the `POST /analyzeText` request.
21. Stop the backend and the frontend, with ctrl+c in both windows.
22. Move to the commit before the third evolution: `git checkout before-evolution-3`
23. Restart the front-end and the back-end
24. Create a new account, the request should be sent to `POST /createUser/...`
25. Stop the backend and the frontend, with ctrl+c in both windows.
26. Move to the commit after the third evolution: `git checkout after-evolution-3`
27. Restart the front-end and the back-end
28. Redo step 24, this time the request should be sent to `PUT /createUser/...`

### Remarks

#### Change 1: addition of the `historyData` parameter to the sign up route

* The added parameter is a value that only the frontend can know. The user can not because the structure is too complex and it is it's history, it would not make sense to ask the user to input this information. In addition, it is a case were the API server can not provide the data in a hypermedia control, because the things happen while the user is not logged in. Then, because it is not a required parameter, the user interface will not break. Yet this is not thanks to our approach. If the parameter had been required, the user interface would likely have break. The only way to avoid the user interface from braking is to make it required that all the data used on the user interface is semantically annotated / described. In such a case, with a complete access to the application context, it is possible to automatically handle this case with our approach.
  -> all the data of the UI should be semantically annotated and the relevant context should be available when a call is done with our library, this would enable our library to pick the data it needs when it has not been input by the user or provided in an hypermedia control.

---

## Use Case 4: Utify

### Repositories

- Original repository: [georgejacobt/utify](https://github.com/georgejacobt/utify)
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/utify)

**Amount of evolutions:** 2

**Types of evolutions:**

- Add parameter (n°1)

**Commits with the evolutions:**

- Add parameter [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35)
- Add parameter [9694469](https://github.com/georgejacobt/utify/commit/9694469f3f6d79ac985be39c01a0cb0305f9932c) -> this evolution is not supported by the evolvable-by-design approach because the design decision is to add a new functionality to the frontend. This point is already discussed in the article presenting the approach. Yet, to show that the approach would be able to automatically manage the addition of new parameters, the addition of the `tag` parameter in this commit will be handled by pivo without passing on frontend changes.

**Description of the work done:**

1. Fork the project [here](https://github.com/evolvable-by-design/utify)
2. Add the missing configuration to use the Youtube API
3. Create an evolvable-by-design branch from the commit before the one introducing the first evolution ([see commit](https://github.com/evolvable-by-design/utify/commit/98dc7cb42fc4257a64f6eb857720485ea3008440))
4. Document the API and serve the documentation from the `GET /api/documentation` endpoint ([see commit](https://github.com/evolvable-by-design/utify/commit/c0e739f44bf56ec42acc8c1d095c34d91b415184))
5. Standardize authentication header and set pivo authentication ([see commit](https://github.com/evolvable-by-design/utify/commit/0c02ce75e155eedc55713fac7057aead686bab2a)) (see problem encountered 1 below)
6. Implement the evolvable-by-design approach [in a single commit](https://github.com/evolvable-by-design/utify/commit/65c452634aaad11c9f78e9db13cf640f28dab135)
7. Replay the API evolution from commit [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35) and make the changes on the server to make the evolvable-by-design approach work
8. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**
9. Apply all other changes of the commit and the next commits until the next API evolution, which includes commits 4f64b31, not 16c56ae because all the changes all already on master, 76c0646, 0ef0fd9, 195d09b, 4d29a91, a744998, c48600e, 94c7f03, 05aa8af, 8341a07, ee25225, 6b5835a, e2f1a17, 49c2b17, a13122f, c58cbe2
10. Add the operation that will evolve into the documentation ([see commit 5ba4f62](https://github.com/evolvable-by-design/utify/commit/5ba4f627d78f603d7e35add2cfb08ccdf57422ba)).
11. Implement the evolvable-by-design approach for the operation concerned by the evolution of commit 9694469. [See commit e379958](https://github.com/evolvable-by-design/utify/commit/e3799586c5da6949e68969fe09c950dc16d47bad) -> This evolution corresponds to the addition of a new feature to the web UI: sorting content per category. As aforementioned, this kind of evolution is not supported because it requires designers to think how to modify the user experience to add this feature. Otherwise, the approach would fall into the category of automatically generated web user interfaces. Yet, with our approach we are able to keep the user interface working with the evolved API. As a counterpart, the user experience will not be optimal but sufficient to make the web UI usable.
12. Replay the API evolution from commit [9694469](https://github.com/georgejacobt/utify/commit/9694469f3f6d79ac985be39c01a0cb0305f9932c) ([see commit](https://github.com/evolvable-by-design/utify/commit/23e29d105d322abaa80cd8572ad9ff6ec4ce5a9f))
13. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**
14. Apply frontend changes from commit 9694469 ([see commit](https://github.com/evolvable-by-design/utify/commit/0275324c9e544263dfd54b1300fc20c6e4e7be49))

### Report

- How many evolutions? ➜ 2
- Types of evolutions ➜ n°1
- One or several commits? ➜ one commit per evolution (frontend and backend at the same time)
- How many lines per commit for the original evolution? ➜ evolution 1: 7, evolution 2: 2
- How many lines of code to implement the approach on the frontend? ➜ evolution 1: 46, evolution 2: 18
- One or several developers ➜ 1
- If tests, broken? ➜ no tests
- Covered or not covered? partially covered

### How to test the evolution

1. Clone the [repository](https://github.com/evolvable-by-design/utify)
2. Run `npm install`
3. Create google youtube API credentials and create `config.js` file based on `config.example.js` and a `client/src/components/config.json` based on `client/src/components/config/example.json`
4. Go back to the commit before the evolution `git checkout before-evolution-1`
5. Start the server `yarn start`
6. Login and then make a search
7. Stop the server `ctrl + c` in the bash session
8. Move to the server commit implementing the evolution `git checkout after-evolution-1`
9. Start the server back `yarn start`
10. Refresh the frontend and do the same thing as before
11. Stop the server `ctrl + c` in the bash session
12. Go to the commit before the evolution 2 `git checkout before-evolution-2`
13. Reinstall dependencies `npm install`
14. Start the server `yarn start`
15. Go to the `/members` route on the frontend
16. Stop the server `ctrl + c` in the bash session
17. Move to the server commit implementing the second evolution `git checkout after-evolution-2`
18. Start the server back `yarn start`
19. Refresh the frontend and do the same thing as before

### Problem encountered

Impossible to manage the evolution of [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35). The evolution is the addition of a `userid` parameter to the API endpoint `/api/search`. This parameter is used to identify the user making the request because no standard authentication mechanism is used here. Hence, because the mechanism is not standard, the problem can be seen with 2 different angles.

First, it can be considered that because the authentication mechanism is not standard, it has not been possible to implement it in Pivo. Thus, the authentication can not be performed automatically and the generated request will fail. Yet, this interpretation is limited. While it is true for this very use case, a more general interpretation is possible and is detailed in the next paragraph.

Second, the added parameter is an example of a parameter that the user can not know. Hence, it should be provided by the API, either directly into the documentation, or within hypermedia controls. Yet in this project this is not possible because, to provide this information in the documentation or in hypermedia controls, the user context must be known. Here, this is not possible because the parameter is the element enabling the retrieval of the user context.

To overcome this issue, I implemented a standard authentication mechanism into the project using the AuthenticationService offered in Pivo.

### Comments

- Applying all the commits between the two evolutions without the need to modify it proved that the approach can easily be applied on small areas of an app, not on the whole app without impacting the rest. Thus, a progressive migration, or a limited usage can be considered.

---

## Use case 5: Simba

### Repositories

- Repository with backend v1 and frontend: [barais/Projet-Simba](https://github.com/barais/Projet-Simba)
- Repository with backend v2: [barais/doodlebackend](https://github.com/barais/doodlebackend)
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/Projet-Simba/)

### List of evolutions:

1. `POST /api/polls/{slug}/comments/{userId}` with request body `{ content }` -> replaced with `POST /api/poll/comment/{slug}` with request body `{ auteur, content }`. Also the return type changed -- Types of evolutions here: (i) rename method (n°5), (ii) remove parameter (n°1), (iii) add parameter (n°1), (iv) change type of return value (n°3)
2. To create a comment in a poll, it was previously necessary to create a user and then create the comment. Now the two operations can be done at once. This adds another type of evolution: `the set of operations to execute to achieve a business process changed`
3. To answer a poll, with the v1 of the API it is necessary to (i) create a user with `POST /api/users`, then (ii) to vote with `POST /api/polls/{slug}/vote/{userId}` and finally (iii) to send the meal preferences with `POST /api/polls/{slug}/mealpreference/{userId}`. With the v2 of the API, it is now required to send more information to a single operation `POST /api/poll/choiceuser` -> This is a `the set of operations to execute to achieve a business process changed`
4. POST /api/polls -> POST /api/poll to create a new poll
5. The MealPreference feature is not supported by the v2 API anymore. Indeed, when a new preference is sent to the backend, it is stored in the database but not linked to the poll. Then, it is not possible to retrieve the meal preference. Yet, this design decision is not reflected into the API documentation that still mention the meal preferences. Reading the API server implementation is necessary to identify this evolution.
6. `GET /api/polls/{slug}` must be replaced by `GET /api/poll/aslug/{aslug}` if the adminSlug have to be retrieved. Otherwise, `GET /api/poll/slug/{slug}` must be used
7. `PUT /api/polls/${slug}?token=${token}` is replaced with `PUT /api/poll/update1` where the slug and token must be put into the request body. The name of `token` is changed into `slugAdmin` while being moved to the request body -> Types of evolutions: rename method (n°5) because of the URL change, rename parameter (n°6) (token -> slugAdmin) and move parameter (n°28) (token/slugAdmin from query to request body)
8. In v2 of the API, two calls are necessary to get the poll with its comments. A first one to get the poll at `GET /api/poll/slug/{slug}` or at `GET /api/poll/aslug/{aslug}` or at `GET /api/poll/{id}` and a second call is necessary to get the comments at `GET /api/poll/polls/{slug}/comments`. -> Type of evolution: move API elements. In addition, the returned model changed.
9. In order to update a poll, in v1 it is required to call `PUT /api/polls/${slug}?token=${token}` to update the main information, then to call another endpoint to create new choices, a third one to update some choices and a fourth one to delete the rest. In the v2 of the API, a single call to `PUT /api/poll/update1` is sufficient but a lot more information must be provided (see commit log) -> Types of evolutions: combine methods (n°10) because one operation should be called instead of a single one

**Amount of evolutions:** 14 (of 9 different types)

**Types of evolutions:**

* Add parameter (n°1) -> see evolution 1
* Change type of return value (n°3) -> see evolution 1 & 8
* Rename method (n°5) -> see evolutions 1 & 4 & 7
* Rename parameter (n°6) -> see evolution 7
* Combine methods (n°10) -> see evolution 9
* Move API elements (n°17) -> see evolution 6 & 8
* The set of operations to execute to achieve a business process changed (n°26) -> see evolutions 2 & 3
* Move parameter (n°28) -> see evolution 7
* Remove return value (n°29) -> see evolution 5

**Commits with the evolutions:**

This use-case is different from the others because the authors of the web UI that I use did not modify its code to enable it to work with the v2 of the API. Indeed, the v2 has been developed by another developer that also created a new, slightly different, web UI.

Therefore in this use-case, I identified and corrected the web UI code by myself, by connecting it to the v2 of the API and fixing the bugs one by one. 

As a consequence, the evolutions are not linked to specific commits. As an alternative, all the evolutions are visible in a single Github Pull Request: https://github.com/evolvable-by-design/Projet-Simba/pull/3/files.

### Applying the evolvable-by-design approach for the observed evolutions

For this fifth use-case, I will describe the work done in one subsection per evolution because there are a lot more evolutions than in the previous use-cases. Hence, to avoid putting an overload linked to the set-up of the library and semantic vocabulary on the first evolution results (lines of code modified, etc.) I put this preliminary step in a separate subsection and commit.

Evolution 9 is the only one evolution that can not be adressed because it is of kind "combine methods", which implies changes in the semantics of the API that this work do not intend to address.

**Description of the preliminary work done:**

1. Create a docker-compose file to start the barais/doodlebackend project
2. Set up `cors` on barais/doodlebackend
3. Started the web UI and fixed the bugs one by one, [see code changes here](https://github.com/evolvable-by-design/Projet-Simba/pull/3/files)
4. Create the evolvable-by-design compliant OpenApi documentation for the two versions of the API. It only contains the methods that are studied within this use-case to ease its readbility by removing unnecessary items.
5. Serve the v1 documentation from the v1 backend and according hypermedia controls (Projet-Simba) [see commit](https://github.com/evolvable-by-design/Projet-Simba/commit/529372f533857a4a5ca989000a3f9d0feede3689) and [fix](https://github.com/evolvable-by-design/Projet-Simba/commit/be62896a0999ee5ebd160b297fd0ff4ecf94f47a)
6. Serve the v2 documentation from the v2 backend and according hypermedia controls (doodlebackend) [see commit](https://github.com/evolvable-by-design/doodlebackend/commit/79f30387c684ac1807fe008ea7f2ec8347a32a85)
7. Update the ports on both REST API servers to easily switch between the v1 to v2 on the web UI [v1 server](https://github.com/evolvable-by-design/Projet-Simba/commit/e554747012fc416808048d9de58d28a1ce56284e), [v2 server](https://github.com/evolvable-by-design/doodlebackend/commit/9c969dd00afd8e81d30bc7b2001d68450c23d4b1)
8. Add a toggle in the header of the Web UI to easily switch between the v1 and v2 of the REST API [https://github.com/evolvable-by-design/Projet-Simba/commit/4e66db033a10a9310fbf1e6a740fc5d1d154467b].
9. [Add the semantic vocabulary into the Web UI](https://github.com/evolvable-by-design/Projet-Simba/commit/3c3b3efc249c39ce152b833f2dd052de441fbeb0)
10. [Add and configure the Pivo library into the Web UI](https://github.com/evolvable-by-design/Projet-Simba/commit/a7f99f0c2b2c490d6d7bb93947787f6632249641)

**Description of the work done for the evolution 4:**

I started with the evolution 4 because it covers the creation of a poll. Indeed, the creation of a poll is the first thing to do on the Web UI to then test the other features.

API documentation requirements:
* Document the poll creation operation for both version
* Semantically describe the operation, its parameters and return model
* Use the same semantic descriptor for the operation, or link them with a `owl:sameAs` property in one of them, or both of them. (here I use the same identifier because the semantics is strictly the same)

Work done on the Web UI:
1. Make sure the semantic identifier is available in the vocabulary
2. Use Pivo to make the call to create a new poll, [see commit](https://github.com/evolvable-by-design/Projet-Simba/commit/04cafc92ce2369700ecd6b424c6906ebf6a79697)
3. Use Pivo to read the data from the returned value (same commit as before)

**Description of the work done for evolutions 1 and 2:**

API documentation requirements:
* Document all the operations necessary to vote on a poll
* Add the proper links to the documentation along with the `comment` and `nextComment` relation keys
* Ensure the documentation of the V2 API will not break the Web UI

1. Create a utility function to execute a process with Pivo
2. Use pivo and the utility function to make the right call to the API

See commit tracing the code changes [here](https://github.com/evolvable-by-design/Projet-Simba/commit/7df816bbec037aebebf3233aef42609d2a046be5)

**Description of the work done for the evolution 3:**

API documentation requirements:
* Document all the operations necessary to vote on a poll
* Add the proper links to the documentation along with the `vote` and `nextVote` relation keys
* Ensure the documentation of the V2 API will not break the Web UI

1. Create a utility function to execute a process with Pivo
2. Use pivo and the utility function to make the right call to the API

See commit tracing the code changes [here](https://github.com/evolvable-by-design/Projet-Simba/commit/add115d1cd954de4fb0c5122d354a3b87828a00a)

**Description of the work done for the evolution 5:**

1. Create a function that determines if the MealPreference feature is available, using Pivo
2. Make the previously created function accessible everywhere in the web UI
3. Hide for the UI the elements related to the meal preferences when the feature is not available on the API

See commit tracing the code changes [here](https://github.com/evolvable-by-design/Projet-Simba/commit/32828e1e9a39615a6ab82a25bf22af9e1d03a2d1)

**Description of the work done for the evolution 6:**

API documentation requirements:
* Document the poll retrieval operation for both version
* Semantically describe the operations, their parameters and return model

Work done on the Web UI:
1. Make sure the semantic identifier is available in the vocabulary
2. Use Pivo to make the call on the edit page request
3. Make the same call on the main poll page

See commit tracing the code changes [here](https://github.com/evolvable-by-design/Projet-Simba/commit/7c6f3c9641afc36808729f0ef68f236d7248fb9a)

**Description of the work done for the evolution 7:**

API documentation requirements:
* Document the poll update operation for both version
* Semantically describe the operations, their parameters and return model

1. Make sure the semantic identifier is available in the vocabulary
2. Use Pivo to make the call on the edit page request and reuse the non-evolvable-by-design code used to manage the pollChoices parameter because it is the subject of evolution 9

See commit tracing the code changes [here](https://github.com/evolvable-by-design/Projet-Simba/commit/3d63899314e6405497a36e8cb7b7e02685cbe902)

Warning: move to the commit after this one to test, it fixes a bug on the v1 API.

**Description of the work done for the evolution 8:**

API documentation requirements:
* Document the poll retrieval operation for both version and the operation to list comments on v2
* Semantically describe the operations, their parameters and return model

1. Make sure the semantic identifier is available in the vocabulary
2. Use Pivo to make the call to retrieve the poll and then get the poll comments using the pivo library also. Last, retrieve all the data necessary for the UI and instance a class with the proper format for the UI.

See commit tracing the code changes [here](https://github.com/evolvable-by-design/Projet-Simba/commit/13cd0507b6ffcb67a9367a5e922962addbcbf669)

### Report

- How many evolutions? ➜ 14
- Types of evolutions ➜ Add parameter (n°1), Change type of return value (n°3), Rename method (n°5), Rename parameter (n°6), Combine methods (n°10), Move API elements (n°17), The set of operations to execute to achieve a business process changed (n°26), Move parameter (n°28), Remove return value (n°29)
- One or several commits? ➜ Several
- How many lines per commit for the original evolution? ➜ Evol 1 & 2: 10; evol 3: 15; evol 4: 2; evol 5: 66; evol 6: 5; evol 7: 9; evol 8: 8
- How many lines of code to implement the approach on the frontend? ➜ Evol 1 & 2: 56; evol 3: 15; evol 4: 15; evol 5: 28; evol 6: 24; evol 7: 15; evol 8: 19
- One or several developers ➜ Several, one team for the first version of the backend and a single developer for the second version
- If tests, broken? ➜ no tests
- Covered or not covered? 14/15 covered

### How to test the evolutions

1. Make sure you have [Docker](https://www.docker.com/products/docker-desktop) and Java 11 on your machine
2. Pull this repository twice, one to move between the web UI history and one for the v1 API: `git clone https://github.com/evolvable-by-design/Projet-Simba.git web-ui && git clone https://github.com/evolvable-by-design/Projet-Simba.git v1-api` and the v2 API repository `git clone https://github.com/evolvable-by-design/doodlebackend`
3. In doodlebackend, make sure you are on the `evolvable-by-design` branch: `git checkout evolvable-by-design`
4. Start the v1 API: `cd v1-api/api && chmod +x Run.sh && ./Run.sh`
5. Start the v2 API: `cd doodlebackend` then in one shell window: `docker-compose up`, wait for it to finish initializing (it can take one to two minutes) and when up and running, in another shell window (with java 11+ set): `./mvwn clean compile quarkus:dev`
6. Install the frontend dependencies: `cd web-ui/frontend && yarn install`

**First test: evolution 4**

Evolution 4 is a change of the URL to create a poll

1. Move to commit before evolution `git checkout 68d72f6`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` and try to create a poll with the V1, it should work.
4. Toggle to use v2 on the web UI and create another poll, this time it should not work and you will see errors in the console
5. Move to the commit implementing the evolvable-by-design approach: `git checkout 04cafc9`
6. Once again, try to create a poll for the two versions: it should work for both versions

**Second test: evolution 1 and 2**

Evolution 1 and 2 are about the addition of comments to the poll

1. Move to commit before evolution `git checkout 9e7f1b1`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` create a poll and comment it.
4. Toggle to use v2 on the web UI and create another poll, try to comment it, this time it should not work and you will see errors in the console
5. Move to the commit implementing the evolvable-by-design approach: `git checkout 7df816b`
6. Once again, create a poll and comment it for each API version, it should work for both versions

**Third test: evolution 3**

Evolution 3 is about voting on a poll.

1. Move to commit before evolution `git checkout 7df816b`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` create a poll and vote on it.
4. Toggle to use v2 on the web UI and create another poll, try to vote on it, this time it should not work and you will see errors in the console
5. Move to the commit implementing the evolvable-by-design approach: `git checkout add115d`
6. Once again, create a poll and vote on it for each API version, it should work for both versions

**Fourth test: evolution 5**

Evolution 5 is about the management of the meal preferences for polls with a meal. In v2, this feature has been removed.

1. Move to commit before evolution `git checkout a284b96`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` create a poll with a meal and add meal preferences to it, it should work.
4. Toggle to use v2 on the web UI and create another poll with a meal, try to add meal preferences, they should never be visible after creation, because the feature is not supported anymore in the API v2
5. Move to the commit implementing the evolvable-by-design approach: `git checkout 32828e1`
6. Once again, create a poll for each API version, it should not be possible with the v2 API as the UI elements enabling this feature are not visible anymore

**Fifth test: evolution 6**

Evolution 6 is about accessing the administration zone of a poll

1. Move to commit before evolution `git checkout fb98607`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` create a poll, access the administration and try to modify it by clicking on "modifier", it should work. 
4. Toggle to use v2 on the web UI and do the same, this time you should see errors in the console.
5. Move to the commit implementing the evolvable-by-design approach: `git checkout 7c6f3c9`
6. Once again, create a poll for each API version, go to the administration zone and click the "Modifier" butotn. Do it with both versions of the API, it should work in all cases

**Sixth test: evolution 7**

Evolution 7 is about editing a poll

1. Move to commit before evolution `git checkout 8a41286`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` create a poll, access the administration and try to modify it by clicking on "modifier" and filling the form, it should work for the modification of the main info (choices excluded). 
4. Toggle to use v2 on the web UI and do the same, this time you should see errors in the console.
5. Move to the commit implementing the evolvable-by-design approach: `git checkout 3d63889`
6. Once again, create a poll for each API version, go to the administration zone and modify the title for example. Do it with both versions of the API, it should work in all cases

**Seventh test: evolution 8**

Evolution 8 is about listing the comments of a poll

1. Move to commit before evolution `git checkout 42f1997`
2. Start the frontend `cd frontend && yarn start`
3. Go to `http://localhost:3000` create a poll, comment it a refresh the page, you should see the comments. 
4. Toggle to use v2 on the web UI and do the same, this time you should not see the comments after the refresh.
5. Move to the commit implementing the evolvable-by-design approach: `git checkout 13cd050`
6. Once again, create a poll for each API version, comment them, refresh the page and you should see the comments after the refresh

## Thoughts on the Pivo library

- The `x-affiliation` property is likely to be forgotten (I've done it)
- Indeed the vocabulary design is a big work to do
- Algorithms developed for the semantic web should be reused to search inside a resource
- Sometimes it is necessary to customize the documentation for the current user, when his user information are required as parameters of operations
