# Globetrotter 🌎 🛩️

Internationalize like a champion 🏆 and add support for over 40 languages to your projects in a matter of minutes! ⏰ Globetrotter is an LLM-based localizer plugin for NPM that is designed to seamlessly integrate into your build process to let you go international with little effort or knowledge.

Please note that Globetrotter is designed as a standalone tool and does not require other AirJam tools and components to operate, but is designed to work seamlessly with them as needed.

* Globetrotter is free to use and does not require an account to get started.
* Globetrotter is compatible with any NPM-based codebase, including React.js and Next.js. Globetrotter works at the file level with JSON-based files, and native support for i18n libraries like react-intl will be available soon.
* Globetrotter is very resource-light from the user side and can run in heavily resource-constrained environments.


## Why use Globetrotter?
Stop managing translations manually and elevate your project's internationalization effortlessly. With Globetrotter, you can expand the language support of your project from one to over 40 with just one line of NPM configuration.

- Globetrotter is FREE! With the free basic plan, you gain access to translation service for over 40+ languages at no cost.
- Is your localization team dragging the speed of development? Do you find yourself always waiting for your localization to push out changes to your international users? Wait no more! Let your development team push out new features at the speed of innovation while supporting over 40 languages at the same time!
- Globetrotter operates at the file level, ensuring compatibility with any project that utilizes JSON files. Native support for i18n libraries, including react-intl, will be available soon!
- Globetrotter lets you save translations directly to your codebase and version control, giving you full control over how translations are edited and served.


## Supported languages

* Albanian (Shqip - sq)
* Arabic (اَلْعَرَبِيَّةُ - ar)
* Azerbaijani (آذربایجان دیلی - az)
* Bengali (বাংলা - bn)
* Bulgarian (Български - bg)
* Catalan (Català - ca)
* Chinese (中文 - zh)
* Czech (Čeština - cs)
* Danish (Dansk - da)
* Dutch (Nederlands - nl)
* English (English - en)
* Esperanto (Esperanto - eo)
* Estonian (Eesti keel - et)
* Finnish (Suomi - fi)
* French (Français - fr)
* German (Deutsch - de)
* Greek (Νέα Ελληνικά - el)
* Hebrew (עברית‎ - he)
* Hindi (हिन्दी - hi)
* Hungarian (Magyar nyelv - hu)
* Indonesian (Bahasa Indonesia - id)
* Irish (Gaeilge - ga)
* Italian (Italiano - it)
* Japanese (日本語 - ja)
* Korean (한국어 - ko)
* Latvian (Latviski - lv)
* Lithuanian (Lietuviškai - lt)
* Malay (بهاس ملايو - ms)
* Norwegian Bokmål (Norsk Bokmål - nb)
* Persian (فارسی - fa)
* Polish (Polski - pl)
* Portuguese (Português - pt)
* Romanian (Românește - ro)
* Russian (Русский язык - ru)
* Slovak (Slovenčina - sk)
* Slovenian (Slovenščina - sl)
* Spanish (Español - es)
* Swedish (Svenska - sv)
* Tagalog (Wikang Tagalog - tl)
* Thai (ภาษาไทย - th)
* Turkish (Türkçe - tr)
* Ukrainian (Українська - uk)
* Urdu (اُردُو - ur)

## Getting Started

### File Formats
Globetrotter requires locale files to be stored in JSON format, as a dictionary of translation IDs and their translation strings, in ```{'id': 'text'}``` format. Each locale's translations are expected to be kept in separate files, with file names in ```<locale>.json``` format.

For example, translations for the locale ```en-US``` should be stored in a file named ```en-US.json```, and the contents of the file should resemble the following pattern:"

```
{
    'text_id1': 'Lorem Ipsum',
    'text_id2': 'Dolor sit amet',
    'text_id3': 'Consectetur adipiscing elit'
}
```

Please note that file names are case sensitive; therefore, the file name for the locale ```en-US```, for instance, should be ```en-US.json``` and NOT ```en-us.json```.

**IMPORTANT: Globetrotter reads and writes to all files with filenames that match the locales specified in its command-line argument. Please ensure that your output directory is organized accordingly.**


## Setup

Install the package using ```npm``` or ```yarn```.

NPM:
```
npm install @airjam/globetrotter
```

Or yarn
```
yarn add @airjam/globetrotter
```

This will enable Globetrotter CLI throughout your project. Next, add Globetrotter as an NPM command by adding following line under the ```scripts``` section in ```package.json``` file.

```
  "globe": "globetrotter load-json [directory_to_locale_files] [options]",
```

The directory is where your locale files are stored. For additional CLI configurations, please refer to the [Arguments](#arguments) section.

You can also trigger Globetrotter during your project's main build process by appending ```&& npm run globe``` or ```&& yarn globe``` command to the end of the ```build``` command."

```
  "scripts": {
    "build": "yarn build && yarn globe"
  }
```

Please note that Globetrotter may take several minutes to run initially.

## Arguments

#### Available Options
```
Arguments:
  string                        directory to load

Options:
  --locales <string>            Comma-separated list of locales to backfill (default:
                                "en-US,fr-FR,es-ES,zh-CN,ja-JP,ko-KR,pt-PT,de-DE,hi-IN,ru-RU")
  --default <string>            Default locale to backfill from. Name of the locale file must be the locale itself
                                (default: "en-US")
  --ext <string>                File extensions to use (default: ".json")
  --keep_existing_translations  If specified, Globetrotter will keep pre-existing translations in files (default: false)
  -h, --help                    display help for command
```

## Exit codes and their meanings

| Exit Code | Description                                        |
| --------- | -------------------------------------------------- |
| `0`       | Success                                            |
| `1`       | Errors from Globetrotter                                |


## Important notes
* Globetrotter can time out under high demand times and reserves the right to refuse services under excessive use. Please note. that Globetrotter+ accounts include dedicated bandwidth and quotas to ensure reliability to avoid such scenarios.
* Translations do not differentiate between language variants based on country codes; so for instance, translations for `en-US` and `en-UK` will yield the same result.
* Due to the nature of training data, choosing English as the originating language yields the highest quality of results.
* Translation yields the highest quality of results when the translating texts are shorter and consist of phrases that are more commonplace. For longer sentences, consider breaking them down into smaller, more common phrases as separate translation texts.
* Globetrotter caches translations for phrases it has previously encountered, so your translation requests become much faster in subsequent runs when Globetrotter sees less of new texts and phrases.
* You can integrate your own custom translations with Globetrotter by adding the custom translations to each locale's JSON files and using the `--keep_existing_translations` option to instruct Globetrotter to use your custom translations instead. Globetrotter+ users have access to Globetrotter Dashboard where your team can add / edit translation overrides in a realtime without having to touch the actual JSON files.
* Additionally, please note that when using the `--keep_existing_translations` flag, Globetrotter will not attempt to update existing translations for translation texts in the target locales even if the text for the originating locale has changed. If you'd like to avoid this behavior, you can either remove existing translations from the destination locales or create a new translation ID and text from the originating locale whenever you are updating texts.
* Please note that Globetrotter will remove any translations for translation IDs that do not exist in the originating locale from the destination locales. To preserve your existing translations in this scenario, add the corresponding translation ID in the originating locale and enable the `--keep_existing_translations flag` to your CLI arguments.

## Globetrotter+

Features of Globetrotter don't just stop here! With Globetrotter+ account, you will gain access to:

* Low-latency servers with prioritized bandwidth and throughput.
* Large bandwidth allocation for handling large translation sets and extensive texts.
* High-volume real-time translations, ideal for applications such as chat and video streaming—available with an Enterprise account.
* Selection of various high-parameter ML models and Globetrotter can optionally provide multiple translation results for you to choose from.
* The Globetrotter Dashboard, a workflow tool that allows your localization team to review, moderate, override, and deploy translations in real-time, eliminating the need to send translations to the dev team for deployment.
* Language-specific components for frameworks such as React, Next.js, Swift, and Flutter, allowing you to simply drop in the components to your codebase and get Globetrotter up and running immediately. These components include built-in support for variables and pluralization within translation texts themselves.
* Dedicated support channels for reporting and addressing issues and outages.

Globetrotter+ is currently in an invite-only closed beta. If you're interested in joining the waitlist for access to the Globetrotter+ service, sign up by visiting [this link](https://www.globetrotter.dev/#signup).

## Support Globetrotter

😃 If you like Globetrotter, you can help us out for a [couple of beers](https://donorbox.org/support-airjam) 🍺 or give it a star ⭐ 
