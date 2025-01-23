#!/usr/bin/env node

const { WebClient } = require("@slack/web-api");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Capture command-line arguments:
//   process.argv[0] => 'node'
//   process.argv[1] => 'updateSlackStatus.js'
//   process.argv[2] => statusText
//   process.argv[3] => statusEmoji
//   process.argv[4] => statusExpiration (in seconds, optional)
const [
  ,
  ,
  statusText = "Away",
  statusEmoji = ":away:",
  statusExpiration = "0", // Hours
] = process.argv;

// Slack token should be stored securely, here we read from an environment variable
const token = process.env.SLACK_TOKEN;
if (!token) {
  console.error("Error: SLACK_TOKEN environment variable is missing.");
  process.exit(1);
}

// Create a new WebClient instance with your token
const web = new WebClient(token);

(async () => {
  try {
    const expirationTime = parseInt(statusExpiration, 10) || 0;
    const statusExpirationAdjusted = expirationTime
      ? Math.floor(Date.now() / 1000 + expirationTime * 60 * 60)
      : 0;

    const result = await web.users.profile.set({
      profile: {
        status_text: statusText,
        status_emoji: statusEmoji,
        status_expiration: statusExpirationAdjusted,
      },
    });
    const snooze = await web.dnd.setSnooze({
      num_minutes: expirationTime * 1000 * 60,
      token,
    });

    console.log("Status updated successfully:");
    console.log(`  Text:  ${result.profile?.status_text}`);
    console.log(`  Emoji: ${result.profile?.status_emoji}`);
    console.log(`  Expiration time: ${result.profile?.status_expiration}`);
    console.log(`  Snooze enabled: ${snooze?.snooze_enabled}`);
    console.log(`  Snooze endtime: ${snooze?.snooze_endtime}`);
  } catch (error) {
    console.error("Error updating Slack status:", error.message);
    // Log inputs
    console.log(`  Text:  ${statusText}`);
    console.log(`  Emoji: ${statusEmoji}`);
    process.exit(1);
  }
})();
