# CCI Directory App

### Run Development Environment
- `npm run dev`
- navigate to localhost:3000

### Run Server (production)
- The API server is running on clearviewcancer.com (port 3000) via [pm2](http://pm2.keymetrics.io/) under the job 'api-server'
- During development, server can be started locally via `npm run start`

### Import Data from [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1kZQbsrzJqKgtie-a5cXGWdO5_c7pjEYrMkw_OizUyac/edit?usp=sharing)
- The Google Spreadsheet is currently being imported hourly at the 30-minute mark via a cronjob on clearview's server. The script is located at `/home/clearview-web/import_data` and should be run as the `clearview-web` user only.
- Imported manually by running `npm run update-data`

### Build for iOS
- `npm run build-ios`

### Build for Android
- `npm run build-android`

### Generate Splash Screen & Icons
- `npm run generate-icons`
- Splash screens & Icons are generated from splash.png & icon.png in `www/assets/`
