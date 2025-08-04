# News Feed Eradicator (Enhanced)

A browser extension that deletes your social media news feeds and replaces them with nice quotes.

## About This Fork

This project is based on the excellent [News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator) by [@jordwest](https://github.com/jordwest). 

### ✨ Enhanced Features

This enhanced version includes several improvements over the original:

- **Extended Platform Support**: Added filters for Instagram Reels, YouTube Shorts, and other social media distractions
- **Time Period Blocking**: Smart time-based blocking that activates during specified periods to help with focus
- **Reduced Impulse**: Made it more difficult to disable lol

### Supported Platforms

- Facebook (news feed, marketplace, groups, gaming)
- Instagram (feed and reels)
- Twitter/X (timeline)
- YouTube (home feed and trending)
- LinkedIn (feed)
- Reddit (popular feeds)
- Hacker News
- GitHub (dashboard)

![Screenshot](https://raw.githubusercontent.com/jordwest/news-feed-eradicator/master/assets/screenshot.jpg)

## Development

This plugin is built as a WebExtension - a standard for browser plugins currently supported in both Chrome and Firefox.

To build for either browser, clone the repository and then run:

    make dev

If everything is successful, check the `build` folder for the extension contents. You can load the `build` directory into either Chrome or Firefox as an _unpacked_ or _temporary_ extension. See the instructions for [Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) or [Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox).

Running `make dev` will watch for changes and recompile, however each time you make changes you'll need to tell the browser to reload the temporary extension.

To build a distributable `.zip` for production, just run:

    make

The extension package can be found in the `dist` folder.
