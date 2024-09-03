import { HumanMessage } from '@langchain/core/messages'
import type { ChatOpenAI } from '@langchain/openai'
import { z } from 'zod'
import { fileToBase64 } from '../../utils/fileToBase64'

const ingredientsSchema = z.object({
  data: z.array(z.string()).describe('食材のリスト'),
})

export const imageToFoods = async (ai: ChatOpenAI, file: File) => {
  const imageUrl = await fileToBase64(file)

  const structuredLlm = ai.withStructuredOutput(ingredientsSchema, {
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

  const { data } = await structuredLlm.invoke([message])
  return data
}
