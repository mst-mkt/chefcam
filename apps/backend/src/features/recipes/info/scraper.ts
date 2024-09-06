import { load } from 'cheerio'
import { z } from 'zod'
import { getRecipeIdFromUrl } from './recipeId'

const recipeInfoSchema = z
  .object({
    title: z.string().min(1),
    thumbnail: z.string().url().optional(),
    description: z.string().min(1).optional(),
    ingredients: z
      .array(
        z.union([
          z
            .object({
              caption: z.string().min(1),
            })
            .strict(),
          z
            .object({
              ingredient: z.string().min(1),
              quantity: z.string().min(1).optional(),
              recipeLink: z
                .object({
                  id: z.string().min(1),
                  label: z.string().min(1),
                })
                .strict()
                .optional(),
            })
            .strict(),
        ]),
      )
      .min(1),
    steps: z
      .array(
        z
          .object({
            step: z.string().min(1).optional(),
            images: z.array(z.string().url()).optional(),
            recipeLink: z
              .object({
                id: z.string().min(1),
                label: z.string().min(1),
              })
              .strict()
              .optional(),
          })
          .strict(),
      )
      .min(1),
    point: z.string().min(1).optional(),
  })
  .strict()

export const scrapeRecipePage = async (html: string) => {
  const $ = load(html)
  const recipe = $('#recipe')

  const title = recipe.find('h1').text().trim()
  const thumbnail = recipe.find('.tofu_image > picture > img').attr('src')
  const description = recipe.find('h1').parent().children().last().find('p').text().trim()

  const ingredients = recipe
    .find('.ingredient-list > ol')
    .children()
    .map((_, ingredient) => {
      const classNames = ingredient.attribs.class?.split(' ') ?? []
      const isHeadline = classNames.includes('headline')

      if (isHeadline) {
        return { caption: $(ingredient).text().trim() }
      }

      const quantity = $(ingredient).find('bdi').text().trim()
      const recipeLink = $(ingredient).children('div').children('a')

      return {
        ingredient: $(ingredient).find('span').text().trim(),
        quantity: quantity !== '' ? quantity : undefined,
        recipeLink:
          recipeLink.length > 0
            ? {
                id: getRecipeIdFromUrl(recipeLink.attr('href') ?? ''),
                label: recipeLink.text().trim(),
              }
            : undefined,
      }
    })
    .get()

  const steps = recipe
    .find('#steps > ol')
    .children()
    .map((_, step) => {
      const text = $(step).find('.w-full > [dir="auto"]').children('p').text().trim()
      const recipeLink = $(step).find('.w-full > .w-full').find('a')
      const images = $(step)
        .find('.w-full > [dir="auto"]')
        .next()
        .children('a')
        .map((_, image) => $(image).find('picture > img').attr('src'))
        .get()

      return {
        step: text,
        images,
        recipeLink:
          recipeLink.length > 0
            ? {
                id: getRecipeIdFromUrl(recipeLink.attr('href') ?? ''),
                label: recipeLink.text().trim(),
              }
            : undefined,
      }
    })
    .get()

  const point = recipe.find('#advice').children('p').text().trim()

  const recipeInfo = {
    title,
    thumbnail,
    description,
    ingredients,
    steps,
    point: point !== '' ? point : undefined,
  }

  console.log(recipeInfo)

  const validated = recipeInfoSchema.safeParse(recipeInfo)

  if (!validated.success) {
    console.error('Invalid recipe:', validated.error.issues)
    console.table(validated.error.issues)
    return null
  }

  return validated.data
}
