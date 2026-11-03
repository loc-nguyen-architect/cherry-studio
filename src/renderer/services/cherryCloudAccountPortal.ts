import { ipcApi } from '@renderer/ipc'
import { getAppEdition } from '@renderer/utils/appEdition'

import { openExternalWebsite } from './website'

// Cherry Cloud web pages are served by the same origin as its API in every environment.
async function openCherryCloudPage(path: string): Promise<void> {
  const apiOrigin = new URL(await ipcApi.request('cherry_cloud.api_origin.get')).origin
  return openExternalWebsite(`${apiOrigin}${path}`)
}

export function openCherryCloudAccountPortal(): Promise<void> {
  return openCherryCloudPage('/account/plans')
}

// The official website has no test deployment, so every China-edition build links the production FAQ.
const CN_SUBSCRIPTION_FAQ_URL = 'https://cherryai.com.cn/flash#plus-faq'

/** The global path is a placeholder until the web team provides that edition's subscription FAQ page. */
export function openCherryCloudFaq(): Promise<void> {
  if (getAppEdition() === 'cn') return openExternalWebsite(CN_SUBSCRIPTION_FAQ_URL)
  return openCherryCloudPage('/account/faq')
}
