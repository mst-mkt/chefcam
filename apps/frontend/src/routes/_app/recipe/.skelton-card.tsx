import type { FC } from 'react'

export const SkeltonCard: FC = () => (
  <div className="block rounded-md transition-colors hover:bg-background-100">
    <div className="flex h-fit items-center gap-x-2 sm:gap-x-4">
      <div className="aspect-1 h-24 animate-pulse rounded-md bg-foreground/30 shadow-md sm:h-36" />
      <div className="flex shrink grow flex-col justify-center gap-y-2 overflow-hidden p-4 sm:gap-y-4">
        <div className="truncate font-bold transition-colors group-hover:text-accent sm:text-lg">
          <div className="h-[1lh] w-full animate-pulse rounded bg-foreground/30" />
        </div>
        <div className="line-clamp-2">
          {[...Array(Math.floor(Math.random() * 3 + 4))].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a skeleton component, so index key is not a problem
              key={i}
              className="mr-2 mb-1 box-content inline-block h-[1lh] w-8 animate-pulse rounded-full bg-foreground/30 px-2 py-1 text-xs last:mr-0"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)
