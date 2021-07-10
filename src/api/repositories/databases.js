import Repository from './repository'
import { config } from '@/constants'

export default {
  getDatabase(databaseId = config.notion.databaseId) {
    return Repository.post('/', {
      method: 'GET',
      path: `/databases/${databaseId}`,
      headers: config.notion.headers,
    })
  },
  queryDatabase({
    databaseId = config.notion.databaseId,
    filter,
    sorts,
    start_cursor,
    page_size,
  } = {}) {
    const payload = {
      filter,
      sorts,
      start_cursor,
      page_size,
    }
    return Repository.post('/', {
      method: 'POST',
      path: `/databases/${databaseId}/query`,
      payload,
    })
  },
}
