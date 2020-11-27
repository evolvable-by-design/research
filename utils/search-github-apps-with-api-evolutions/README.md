# Search Github Apps with API evolutions

This folder contains scripts that look for open source projects on GitHub that use one of the APIs listed in the [APIs Guru OpenApi Repository](https://apis.guru/openapi-directory/).

You can also find the data that we used for the evaluation of our article `Evolvable-by-design clients of REST APIs: automated run-time evolution with no code change` in the [data-august-2020 directory](/data-august-2020). You can run the scripts on these data by changing the `data-path` entry of the `CONFIG.json` file to `./data-august-2020`.

## How to use

Follow the following steps:

1. (optional) Change the fields in the `CONFIG.json` file. For example the maximum amount of repositories to fetch per API.
2. Run the main script with `node main.js`
3. Open `repositories-to-look-at.json`
4. Manually analyse each repository to find REST API evolutions

## Summary of how we used the script to find web applications with REST API evolutions

The steps 1 to 6 are automated with the scripts of this directory.

1. We extracted the 395 APIs that have more than one version available in the [API Guru OpenApi directory](https://apis.guru/openapi-directory/).
2. We removed from the list the APIs that are not implemented in at least one public GitHub repository written in JavaScript. To do so, we used the Search feature of the GitHub REST API. Unfortunately, it searches for a textual query into the README of the repositories, not into the code, and we could not found a REST API offering this feature. We thus searched for repositories written in JavaScript, with a query containing the name of the API along with the API keyword itself. For example, for the Google Drive API, we queried `https://api.github.com/search/repositories?\\q=Google Drive API + language:js`. At this step, we kept 92 APIs.
3. We listed the repositories using these APIs. We observed that each API is used in 1 to 10 057 repositories for a total of 14 394 repositories.
4. We cloned a maximum of 200 repositories per API. In the end we cloned 2 778 repositories.
5. We analysed the repositories to keep the ones were we could found a usage of the API URL in the code, using the `git log --source --all -S 'API-URL'` command. At this step we found 183 repositories.
6. We analysed the repositories to keep the ones were more than one version of the API is used and were these several versions are found in different commits. At this step we found 60 repositories.
7. As a last step, we manually analyzed the 60 repositories to verify that they meet the aforementioned requirements. In the end, we selected 4 of them. Most were rejected because they do not contain a user interface or do not implement evolutions, either because they already use the last version of the API, or leave their client broken. Indeed, a significant part of the analyzed projects were projects used to learn programming.
