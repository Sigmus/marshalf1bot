# Marshal F1 Bot

Formula 1 Facebook Messenger Bot – Calendar, Results and Standings

## Introduction

[Messenger Platform Sample](https://github.com/fbsamples/messenger-platform-samples) was used as bootstrap. [Ergast Developer API](http://ergast.com/mrd/) is the source of data.

## Demo

Start interacting [clicking here](https://www.facebook.com/marshalf1bot/). Qualifying and race information is updated by restarting the bot on Saturdays and Sundays.

## Motivation

This is not a conversational bot, so it doesn't really understand text messages. Instead, the idea here is to explore UI elements offered but the [Messenger Platform](https://developers.facebook.com/docs/messenger-platform). Specifically, the following elements are used:

- [Buttons](https://developers.facebook.com/docs/messenger-platform/send-api-reference/button-template)
- [Quick Replies](https://developers.facebook.com/docs/messenger-platform/send-api-reference/quick-replies)
- [Persistent Menu](https://developers.facebook.com/docs/messenger-platform/thread-settings/persistent-menu)

## Running

Node 6.2.2 is required. The following environment variables must be set:

- MESSENGER_APP_SECRET
- MESSENGER_VALIDATION_TOKEN
- MESSENGER_PAGE_ACCESS_TOKEN
- MESSENGER_PAGE_ID
- PORT
