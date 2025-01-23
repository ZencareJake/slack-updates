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
alias brb="slack 'Be right back!' ':brb:' 0 0"              # The first 0 defaults to a status that will not expire - The second 0 ensures do not disturb is not enabled
alias lunch="slack 'Lunch' ':away:' 1 1"                    # The first 1 is the number of hours the status will last - The second 1 enables do not disturb
alias gym="slack 'Gym - Back in an hour' ':away:' 2 1"      # 2 hours with do not disturb enabled
alias ski="slack 'Ski break - Back in an hour' ':ski:' 2 1" # etc.
alias locked="slack 'Locked in' ':technologist:' 1 1"
alias errands="slack 'Errands - Back on this afternoon' ':car:' 1 0"
alias evening="slack 'Have a great evening!' ':sparkles:' 8 0"
alias weekend="slack 'Have a great weekend!' ':sparkles:' 48 0"
alias meeting="slack 'In a meeting' ':calendar:' 1 1"
alias clear="slack '' '' 0 0"                               # Clear the status
# Alias to list all available statuses
alias slacks="echo 'brb, lunch, gym, ski, locked, errands, weekend, evening, meeting, clear'"
```

## Using the app

- Run `source ~/.zshrc` or `source ~/.bashrc` to reload your shell
- Run `slacks` from anywhere to see all available statuses
- Run any of the aliases you've created to update your status
  (ex. `brb`, `lunch`, `gym`, `ski`, `locked`, `errands`, `weekend`, `evening`, `meeting`)

## Future iterations

- ✅ A `clear` functionality to clear your status - Completed January 23rd, 2025
- ✅ Include ability to pause notifications - Completed January 23rd, 2025
- Automation to run the app at certain times of the day
- Automation to run the app when certain actions take place
- Update presence
