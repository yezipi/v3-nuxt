import albumApi from '@/api/album'
import articleApi from '@/api/article'
import blogrollApi from '@/api/blogroll'
import columnApi from '@/api/column'
import commentApi from '@/api/comment'
import feedbackApi from '@/api/feedback'
import moodApi from '@/api/mood'
import settingsApi from '@/api/settings'

export const useApi = () => {
  return {
    albumApi,
    articleApi,
    blogrollApi,
    columnApi,
    commentApi,
    feedbackApi,
    moodApi,
    settingsApi,
  }
}
