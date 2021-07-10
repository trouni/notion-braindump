export const config = {
  environment: process.env.NODE_ENV || 'development',
  apiURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  apiVersion: process.env.VUE_APP_API_VERSION,
  notion: {
    apiBaseUrl: 'https://api.notion.com/v1',
    token: process.env.VUE_APP_NOTION_TOKEN,
    databaseId: process.env.VUE_APP_NOTION_DB_ID,
    headers: {
      Authorization: `Bearer ${process.env.VUE_APP_NOTION_TOKEN}`,
      'Notion-Version': '2021-05-13',
      'Content-Type': 'application/json',
    },
  },
}
