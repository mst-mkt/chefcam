import type { FC } from 'react'

export const RecipeSkelton: FC = () => (
  <div className="group block rounded-md transition-colors hover:bg-background-100">
    <div className="flex h-fit gap-x-2 sm:gap-x-4">
      <div className="aspect-1 h-20 animate-pulse rounded-md bg-foreground/30 shadow-md sm:h-32" />
      <div className="flex shrink grow flex-col justify-center gap-y-2 overflow-hidden px-4">
        <div className="truncate font-bold transition-colors group-hover:text-accent sm:text-lg">
          <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/30" />
        </div>
        <div className="line-clamp-2 flex flex-wrap gap-2 text-sm transition-colors sm:text-base">
          {[...Array(Math.floor(Math.random() * 3 + 4))].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
            <div key={i} className="h-[1lh] w-8 animate-pulse rounded bg-foreground/30" />
          ))}
        </div>
      </div>
    </div>
  </div>
)
