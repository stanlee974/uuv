# Migrations of 3.x.x minor or patch

## Change default browser for @uuv/playwright
For `@uuv/playwright 3.0.1 -> 3.1.0`
- Rename browser name in `uuv/playwright.config.ts`:
  - `name: "Microsoft Edge"` -> `name: "edge"`
  - `name: "Google Chrome"` -> `name: "chrome"`

## Change cucumber keyword import for @uuv/playwright
For `@uuv/playwright 3.36.0 -> 3.37.0`
- Update your custom step definition's imports if you have them :
  - `import {Given, When, Then} from "@cucumber/cucumber";` -> `import { World, Given, Then } from "@uuv/playwright";`

## Replace picture sentences for english language
For `@uuv/playwright 3.41.0 -> 3.42.0`
- Replace picture sentences:
  - `Then I should see an picture named "UUV Logo fixture"` -> `Then I should see an image named "UUV Logo fixture"`