import { HumanMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import type { AppBindings } from '.'
import { fileToBase64 } from './utils/fileToBase64'

export const imageToFoods = async (file: File, envs: AppBindings) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = envs
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined')
  }
  if (!OPENAI_BASE_URL) {
    throw new Error('OPENAI_REQUEST_BASE_URL is not defined')
  }
  const requestUrl = new URL(OPENAI_BASE_URL).toString()

  const model = new ChatOpenAI({
    model: 'gpt-4o',
    apiKey: OPENAI_API_KEY,
    configuration: {
      baseURL: requestUrl,
    },
  })

  const imageUrl = await fileToBase64(file)

  const foodSchema = z.object({
    ingredients: z.array(z.string()).describe('画像に含まれている食材のリスト'),
  })

  const structuredLlm = model.withStructuredOutput(foodSchema, { name: 'food_detection' })

  const message = new HumanMessage({
    content: [
      {
        type: 'text',
        text: 'この画像に含まれている食材を短い単語でリストアップしてください',
      },
      { type: 'image_url', image_url: { url: imageUrl } },
    ],
  })

  const res = await structuredLlm.invoke([message])
  const foodListData = res.ingredients

  return foodListData
}
