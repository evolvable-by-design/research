# Use Cases Evolvable-by-design

Use-cases studied:

* [Dialog Flow](https://github.com/evolvable-by-design/dialog-flow)
* [Page Speed Script](https://github.com/evolvable-by-design/pagespeed_api_apps_script)
* [Spaghetti Makes Me Moody](https://github.com/evolvable-by-design/spaghetti-makes-me-moody) -> PAUSED
* [Utify](https://github.com/evolvable-by-design/utify)

Next:
- Stripe terminal JS demo, commit dbdedd4 **|** https://github.com/stripe/stripe-terminal-js-demo
- Paperjam avec l'API Woodwing -> Dead, all evolutions are managed by the backend
- Saretec : DirectCare (https://github.com/zengularity/saretec/tree/master/directcare) ➜ API Keywiiz -> https://github.com/zengularity/saretec/pulls?q=is%3Apr+keywizz
- Darva ?
- MyStockApp ➜ voir plus en détail avec Kevin
- Photohaiku ➜ http to https change on the datamuse API, commit [39a0fe6e5b2222e02dfc689efde374cfd790b293](https://github.com/stephslye/photohaiku/commit/39a0fe6e5b2222e02dfc689efde374cfd790b293#diff-0fb1d68aeea0724ff3ef7def564576c2)
- Corium -> https://git.hermes.com/corium/corium-api/-/commits/develop/src/generated/openapi.json


## Use Case 1: Dialog Flow

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

## Use Case 2: Page Speed API App Script

> Info: this code does not have a frontend. Yet, the evolvable-by-design approach is applicable here because the two types of changes are the base URL and the type of the returned value. Indeed, only a change of the input parameters require a user interface to let the user input the parameters manually.

### Repositories

- Original repository: [pagespeed_api_apps_script](https://github.com/IronistM/pagespeed_api_apps_script/) ➜ one evolution, v1 to v2: URL + returned model
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/pagespeed_api_apps_script)

**Amount of changes:** 2

**Types of changes:** 
* Change model of returned data (n°3)
* Rename method (n°5)

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
5. In the `server/index.js` set `const VERSION = 2` in the beginning of the file
6. Start the server `node server/index.js`.
7. Starts the scripts `node run.js` -> it should display `70` at then end.
8. Stop the server with `ctrl+c` in the window where you launched it.

## Use Case 3: Spaghetti Makes Me Moody

### Repositories

- Original repository: [danielsinclairtill/spaghetti-makes-me-moody](https://github.com/danielsinclairtill/spaghetti-makes-me-moody)
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/spaghetti-makes-me-moody)

**Amount of changes:** ???

-> Several interesting changes in [**SpaghettiService.js**](https://github.com/danielsinclairtill/spaghetti-makes-me-moody/commits/master/front-end/src/components/SpaghettiService.js)

**Types of changes:** 
* Add parameter (n°1)
* Request method change (n°23)

**Commits with the changes:**

* Add parameter to createUser [6c17e41](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/6c17e41dd710dce2871b49fb7f15ce6693d940f9#diff-6e97426cd40ca2d61b263b6dda6cb512)
* Add parameters to analyzeText [f8a145a](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/f8a145a44e8a852c59daf9cbae134552729bc437#diff-6e97426cd40ca2d61b263b6dda6cb512)
* Change HTTP verb [64f2837](https://github.com/evolvable-by-design/spaghetti-makes-me-moody/commit/64f28374737937cff69785dc5069f576873e0e54#diff-6e97426cd40ca2d61b263b6dda6cb512)

**Description of the work done:**

1. Fork the project [here](https://github.com/evolvable-by-design/spaghetti-makes-me-moody)
2. Create an evolvable-by-design branch from the commit before the first evolution done
3. Fix npm dependencies
4. Enable the [google natural language API](https://console.developers.google.com/apis/library/language.googleapis.com?q=language&id=223648f2-2e7c-4acd-b0ca-782f9021a541&project=evolvable-by-design-exper-svlb&flow=gcp), which requires billing -> BLOCKED

### Report

- How many evolutions? ➜ ???
- Types of evolutions ➜ ???
- One or several commits? ➜ ???
- How many lines per commit for the original evolution? ➜ ???
- How many lines of code to implement the approach on the frontend? ➜ ???
- One or several developers ➜ several - 4
- If tests, broken? ➜ no tests
- Covered or not covered? ???

### How to test the evolution

1. Clone the [repository](https://github.com/evolvable-by-design/spaghetti-makes-me-moody).

TODO

## Use Case 4: Utify

### Repositories

- Original repository: [georgejacobt/utify](https://github.com/georgejacobt/utify)
- [Fork with the evolvable-by-design implementation](https://github.com/evolvable-by-design/utify)

**Amount of changes:** 2

**Types of changes:** 
* Add parameter (n°1)

**Commits with the changes:**

* Add parameter [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35)
* Add parameter [9694469](https://github.com/georgejacobt/utify/commit/9694469f3f6d79ac985be39c01a0cb0305f9932c) -> this change is not supported by the evolvable-by-design approach because the design decision is to add a new functionality to the frontend. This point is already discussed in the article presenting the approach. Yet, to show that the approach would be able to automatically manage the addition of new parameters, the addition of the `tag` parameter in this commit will be handled by pivo without passing on frontend changes.

**Description of the work done:**

1. Fork the project [here](https://github.com/evolvable-by-design/utify)
2. Add the missing configuration to use the Youtube API
3. Create an evolvable-by-design branch from the commit before the one introducing the first evolution ([see commit](https://github.com/evolvable-by-design/utify/commit/98dc7cb42fc4257a64f6eb857720485ea3008440))
4. Document the API and serve the documentation from the `GET /api/documentation` endpoint ([see commit](https://github.com/evolvable-by-design/utify/commit/c0e739f44bf56ec42acc8c1d095c34d91b415184))
5. Standardize authentication header and set pivo authentication ([see commit](https://github.com/evolvable-by-design/utify/commit/0c02ce75e155eedc55713fac7057aead686bab2a)) (see problem encountered 1 below)
5. Implement the evolvable-by-design approach [in a single commit](https://github.com/evolvable-by-design/utify/commit/65c452634aaad11c9f78e9db13cf640f28dab135)
6. Replay the API evolution from commit [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35) and make the changes on the server to make the evolvable-by-design approach work
7. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**
8. Apply all other changes of the commit and the next commits until the next API evolution, which includes commits 4f64b31, not 16c56ae because all the changes all already on master, 76c0646, 0ef0fd9, 195d09b, 4d29a91, a744998, c48600e, 94c7f03, 05aa8af, 8341a07, ee25225, 6b5835a, e2f1a17, 49c2b17, a13122f, c58cbe2
9. Add the operation that will evolve into the documentation ([see commit 5ba4f62](https://github.com/evolvable-by-design/utify/commit/5ba4f627d78f603d7e35add2cfb08ccdf57422ba)).
10. Implement the evolvable-by-design approach for the operation concerned by the change of commit 9694469. [See commit e379958](https://github.com/evolvable-by-design/utify/commit/e3799586c5da6949e68969fe09c950dc16d47bad) -> this change is not supported by the evolvable-by-design approach because the design decision is to add a new functionality to the frontend. This point is already discussed in the article presenting the approach. Yet, to show that the approach would be able to automatically manage the addition of new parameters, the addition of the `tag` parameter in this commit will be handled by pivo without passing the frontend changes.
11. Replay the API evolution from commit [9694469](https://github.com/georgejacobt/utify/commit/9694469f3f6d79ac985be39c01a0cb0305f9932c) ([see commit](https://github.com/evolvable-by-design/utify/commit/23e29d105d322abaa80cd8572ad9ff6ec4ce5a9f))
12. Verify that the client code does not need to be modified in order to continue working -> **SUCCESS**
13. Apply frontend changes from commit 9694469 ([see commit](https://github.com/evolvable-by-design/utify/commit/0275324c9e544263dfd54b1300fc20c6e4e7be49))

### Report

- How many evolutions? ➜ 2
- Types of evolutions ➜ n°1
- One or several commits? ➜ one commit per change (frontend and backend at the same time)
- How many lines per commit for the original evolution? ➜ Change 1: 7, change 2: 2
- How many lines of code to implement the approach on the frontend? ➜ Change 1: 57, change 2: 18
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

### Problems encountered

Problem 1

Impossible to manage the evolution of [4f64b31](https://github.com/georgejacobt/utify/commit/4f64b31930a53e96c1ad67625ce28e99b9feae35). The evolution is the addition of a `userid` parameter to the API endpoint `/api/search`. This parameter is used to identify the user making the request because no standard authentication mechanism is used here. Hence, because the mechanism is not standard, the problem can be seen with 2 different angles.

First, it can be considered that because the authentication mechanism is not standard, it has not been possible to implement it in Pivo. Thus, the authentication can not be performed automatically and the generated request will fail. Yet, this intepreation is limited. While it is true for this very use case, a more general interpretation is possible and is detailed in the next paragraph.

Second, the added parameter is an example of a parameter that the user can not know. Hence, it should be provided by the backend, either directly into the documentation, or within hypermedia controls. Yet in this project this is not possible because, to provide this information in the documentation or in hypermedia controls, the user context must be known. Here, this is not possible because the parameter is the element enbaling to retrive the user context.

To overcome this issue, I implemented a standard authentication mechanism into the project using the AuthenticationService offered in Pivo.

### Comments

* Applying all the commits between the two evolutions without the need to modify it proved that the approach can easily be applied on small areas of an app, not on the whole app without impacting the rest. Thus, a progressive migration, or a limited usage can be considered.

---

## Use Case 5: DirectCare

Pull requests with changes:

* [SAZ-780 - Send `assureurMissionneur` to Keywiiz Api](https://github.com/zengularity/saretec/pull/328/files)
* [SAZ-2372 - Contracts MRI](https://github.com/zengularity/saretec/pull/1248/files) -> when a sinitre is modified via the `updateSinistre` API operation, this PR adds optional parameters. Thus, they should not always be shown to the user. This depends on criteria that are assessed at runtime. Concretely, in the PR, the new parameters are added in forms in the `origineSinistre.ts` files. This PR also adds new parameters for the `updateRisque` API operation, in `contexteClient.ts`. In addition, the model returned by these two API endpoints changes from `NewMission` to `WrappedMission`.

Because a lot of commits was added to the project between the two studied Pull Requests, two branches are created to implement the evolvable-by-design approach.

### Hints

To start the project, reuse the following configuration in `directcare/server/conf/local.conf`:

```
play.http.secret.key = "swciR;L`W5d:nP9^"
auth.token {
  // Used for communication between bi and directcare, must be the same as `directcare.auth.token` on BI-side
  bi = "NmY5NjU3NDc0ZWYwNWY4ZmU1YTY2NTc2ZDAyYTMwMTBjNjQxMWI3MWExNmY2Y2Zj"
  // Used as authentication token for multitenant routes
  multitenant = "multitenantToken"
  directcare-token-lifespan = "PT5M"
}
rgpd {
  schedule {
    // Enable or disable automatic anonymization of mission older than personalInfoExpirationTime
    enabled = false
    // Automatically run at startup and then every 24h
    runInterval = "P1D"
    // Anonymize older than 10 days
    personalInfoExpirationTime = "P1D"
  }
  logging {
    // Enable logging of sensitive info: logger.info(sensitive = true, ...)
    authorizePersonalInfo = true
  }
}
keywiiz {
  // Authentification token used for Keywiiz API call
  // DEV
  key = "89de134a-67c9-412f-8a90-7d7b00e14731"
  urlApi = "https://recetteinterne-keywiiz.api.saretec.fr/api/v1"
  // RECETTE
  // key = "0ebca6db-d9fc-40ee-b43b-be57b4f9a30f"
  // urlApi = "https://saretec-keywiiz-api-recetteinterne.nestincloud.io/api/v1"
  enableMRI = true
  enableMRA = true
}
// Log Keywiiz API call to web browser console
monitoring.logToClient.enabled = true
monitoring.logToDb.enabled = true
monitoring.logToDb.filter = "ConventionsIrsi,MobilierDesignations"
monitoring.logToDb.missionActions = true
linkcare.enable = true
edp.enable = true
enableDebugRoutes = true
auth.sso.axa.edecla.axaAmontPublicKeyResource = "directcare/server/conf/sso/child2-edecla-recette.crt"
auth.sso.axa.edecla.axaAvalPublicKeyResource = "directcare/server/conf/sso/child2-edecla-recette.crt"
bpu.statSchedulerEnabled = true
sentry {
  enable = false
  dsn = "https://d4652944bcfd41f2bf38e9122a96fca4@sentry.io/1767156"
}
company.07.featureFlags.assureur.calculatorApp = true
expiration.passwords = "07:40,10:60"
expiration.passwordAlerts = "07:10,10:20"
auth.sso.maif {
  clientId = "pprod_saretec"
  clientSecret = "S3rZulrB1kixGy1v3rT2BoDxF5YpMlGFPSRPTzq3tR5T2nj3duADiJ0pCwrri0mz"
}
saretec {
  token = "02cbf72e96054e52a14155818563cbaa"
  mailService {
    mailTo = "nicolas.glondu@fabernovel.com"
    bpuMailTo = "nicolas.glondu@fabernovel.com"
  }
}
plusValueExceptionnelle {
  defaultByCC = "07:08:400,03:07:500,54:05:500"
  fixedByCC = "07,10:150,03:200:400,54:100:200"
  roundedByCC = "07,54"
}
cached.lifespan = "PT2M"
front.variant = "311:2"
```

To compile the frontend: `cd saretec/directcare/client && yarn build`
To start the backend: `cd saretec && SBT_OPTS=“-Xms2048m -Xmx2048m -Xss4M” sbt run`
For the DB: `cd directcare/dev && docker-compose up`

## Thoughts on the Pivo library

* The `x-affiliation` property is likely to be forgotten (I've done it)
* Indeed the vocabulary design is a big work to do
* Algorithms developed for the semantic web should be reused to search inside a resource
* Sometimes it is necessary to customize the documentation for the current user, when his user information are required as parameters of operations