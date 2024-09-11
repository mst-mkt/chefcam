import { IconChevronLeft } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import type { FC } from 'react'

type SkeltonRecipeProps = {
  search?: string[]
}

export const SkeltonRecipe: FC<SkeltonRecipeProps> = ({ search }) => (
  <>
    <div className="flex flex-col gap-y-8">
      {search !== undefined && (
        <Link
          to="/recipe"
          search={{ foods: search }}
          className="flex items-center gap-x-2 font-bold text-accent"
        >
          <IconChevronLeft size={28} />
          <span>検索結果に戻る</span>
        </Link>
      )}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="aspect-[16/9] w-full shrink-0 grow-0 animate-pulse rounded-md bg-foreground/30 object-cover md:aspect-1 md:w-32" />
        <div className="flex shrink grow flex-col gap-y-2">
          <div className="truncate font-bold text-xl">
            <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/30" />
          </div>
          <div className="line-clamp-4">
            {[...Array(2)].map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
                key={i}
                className="inline-block h-[1lh] w-full animate-pulse rounded bg-foreground/30"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    <ul className="flex flex-col gap-y-2 rounded-md bg-background-50 p-4 text-sm">
      {[...Array(5)].map((_, i) => (
        <li
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
          key={i}
          className="flex justify-between border-background-100 border-b pb-2"
        >
          <span className="inline-block h-[1lh] w-8 animate-pulse rounded bg-foreground/30" />
          <span className="inline-block h-[1lh] w-16 animate-pulse rounded bg-foreground/30" />
        </li>
      ))}
    </ul>
    <ol className="flex flex-col gap-y-8">
      {[...Array(8)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
        <li key={i} className="flex gap-x-4">
          <div className="sticky top-[90px] flex aspect-1 h-[1lh] items-center justify-center rounded-full bg-accent font-bold text-white">
            {i + 1}
          </div>
          <div className="flex grow flex-col gap-y-2">
            <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/20" />
            <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/20" />
          </div>
        </li>
      ))}
    </ol>
    <div className="flex flex-col items-center gap-y-4">
      <h2 className="w-fit font-bold text-accent text-lg">作る際のポイント</h2>
      <div className="flex w-full flex-col gap-y-2">
        <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/30" />
        <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/30" />
      </div>
    </div>
  </>
)
