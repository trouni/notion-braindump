import Repository from './repository'
import { config } from '@/constants'

export default {
  postPage({
    parent = { database_id: config.notion.databaseId },
    properties,
  } = {}) {
    return Repository.post(`/`, {
      method: 'POST',
      path: `/pages`,
      payload: {
        parent,
        properties,
      },
    })
  },
  patchPage(pageId, { properties } = {}) {
    return Repository.post(`/`, {
      method: 'PATCH',
      path: `/pages/${pageId}`,
      payload: {
        properties,
      },
    })
  },
}
