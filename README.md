I'm# slack-updates

## Overview

A lightweight node app to be used to update Slack statuses in a single workspace via the command line. Credit to [ahosking](https://github.com/ahosking) for the [original idea](https://github.com/ahosking/slack-status_updates).

## Getting started

- Clone this repo and run `yarn -i` to install dependencies
- Copy the `.env.example` file to `.env` in order to store your token you'll create later
- Create a new Slack app in your workspace
- Add the following permissions to your app:
  - `users.profile:write`
- Install the app to your workspace
- Copy the `OAuth Access Token` from the `OAuth & Permissions` page and paste it into your `.env` file
- Create the following `alias`es in your `~/.zshrc` or `~/.bashrc` file or add more if you'd like:

```bash
# Alias for to run the app
alias slack="node ~/dev/slack-updates/index.js"
# Aliases per status
alias brb="slack 'Be right back!' ':brb:' 0"              # 0 defaults to a status that will not expire
alias lunch="slack 'Lunch' ':away:' 1"                    # 1 is the number of hours the status will last
alias gym="slack 'Gym - Back in an hour' ':away:' 2"      # 2 hours
alias ski="slack 'Ski break - Back in an hour' ':ski:' 2" # etc.
alias locked="slack 'Locked in' ':technologist:' 1"
alias errands="slack 'Errands - Back on this afternoon' ':car:' 1"
alias evening="slack 'Have a great evening!' ':sparkles:' 8"
alias weekend="slack 'Have a great weekend!' ':sparkles:' 48"
alias meeting="slack 'In a meeting' ':calendar:' 1"
# Alias to list all available statuses
alias slacks="echo 'brb, lunch, gym, ski, locked, errands, weekend, evening, meeting'"
```

## Using the app

- Run `source ~/.zshrc` or `source ~/.bashrc` to reload your shell
- Run `slacks` from anywhere to see all available statuses
- Run any of the aliases you've created to update your status
  (ex. `brb`, `lunch`, `gym`, `ski`, `locked`, `errands`, `weekend`, `evening`, `meeting`)

## Future iterations

- A `clear` functionality to clear your status
- Automation to run the app at certain times of the day
- Automation to run the app when certain actions take place
- Update presence 
- Include ability to pause notifications
