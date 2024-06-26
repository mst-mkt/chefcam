import { HumanMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import type { BindingsType } from './factory'
import { ingredientsSchema } from './schemas/ingredientsSchema'
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
    temperature: 0,
  })

  const imageUrl = await fileToBase64(file)

  const structuredLlm = model.withStructuredOutput(ingredientsSchema, {
    name: 'food_detection',
  })

  const message = new HumanMessage({
    content: [
      {
        type: 'text',
        text: `# 以下のステップに従ってください、ステップが全て完了するまで出力は決定しないでください。:
              ## ステップ1: この画像に含まれている食材を日本語かつ短い単語で具体的にリストアップしてください。:
              ## ステップ2: リストアップした食材から以下の基準でフィルタリングしてください：
                 - 料理の材料として直接使用できるものだけを含めます。
                 - 曖昧な表現（例：「冷凍食品」）は避け、具体的な食材名を使用してください。
              ## ステップ3: 食材のリストを提出してください。`,
      },
      { type: 'image_url', image_url: { url: imageUrl } },
    ],
  })

  const res = await structuredLlm.invoke([message])
  const foodsData = res.data

  return foodsData
}
