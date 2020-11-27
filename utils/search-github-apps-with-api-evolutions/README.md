# Search Github Apps with API evolutions

This folder contains scripts that look for open source projects on GitHub that use one of the APIs listed in the [APIs Guru OpenApi Repository](https://apis.guru/openapi-directory/).

You can also find the data that we used for the evaluation of our article `Evolvable-by-design clients of REST APIs: automated run-time evolution with no code change` in the [data-august-2020 directory](/data-august-2020). You can run the scripts on these data by changing the `data-path` entry of the `CONFIG.json` file to `./data-august-2020`.

## How to use

Follow the following steps:

1. (optional) Change the fields in the `CONFIG.json` file. For example the maximum amount of repositories to fetch per API.
2. Run the main script with `node main.js`
3. Open `repositories-to-look-at.json`
