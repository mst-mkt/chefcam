import { HumanMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import type { BindingsType } from './factory'
import { fileToBase64 } from './utils/fileToBase64'

export const imageToFoods = async (file: File, envs: BindingsType) => {
  const { OPENAI_API_KEY, OPENAI_BASE_URL } = envs
  if (OPENAI_API_KEY === undefined) {
    throw new Error('OPENAI_API_KEY is not defined')
  }
  if (OPENAI_BASE_URL === undefined) {
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
        text: '以下のステップに従ってください、ステップが全て完了するまで出力は決定しないでください。ステップ1: この画像に含まれている食材を日本語かつ短い単語で具体的にリストアップしてください。ステップ2: リストアップした食材から曖昧なもの, 料理に使用できないものを除いてください。ステップ3: 食材のリストを提出してください。',
      },
      { type: 'image_url', image_url: { url: imageUrl } },
    ],
  })

  const res = await structuredLlm.invoke([message])
  const foodListData = res.ingredients

  return foodListData
}
