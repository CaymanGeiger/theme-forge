import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="relative overflow-hidden">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-10 px-4 pb-12 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-6">
        <section className="grid gap-8 rounded-[40px] border border-white/70 bg-white/55 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:p-8">
          <div className="space-y-6">
            <Skeleton className="h-10 w-64 rounded-full" />
            <div className="space-y-4">
              <Skeleton className="h-16 w-full max-w-3xl rounded-2xl" />
              <Skeleton className="h-16 w-full max-w-2xl rounded-2xl" />
              <Skeleton className="h-8 w-full max-w-2xl rounded-xl" />
              <Skeleton className="h-8 w-full max-w-xl rounded-xl" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
          <Skeleton className="min-h-[420px] rounded-[34px]" />
        </section>

        <section className="rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:p-7">
          <Skeleton className="h-10 w-48 rounded-xl" />
          <Skeleton className="mt-4 h-14 w-full max-w-3xl rounded-2xl" />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton className="h-72 rounded-[30px]" key={index} />
            ))}
          </div>
        </section>

        <section className="rounded-[40px] border border-white/70 bg-white/55 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
          <Skeleton className="h-12 w-72 rounded-2xl" />
          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(340px,380px)_minmax(0,1fr)] 2xl:grid-cols-[390px_minmax(0,1fr)]">
            <Skeleton className="min-h-[760px] rounded-[34px]" />
            <Skeleton className="min-h-[760px] rounded-[34px]" />
          </div>
        </section>

        <section className="grid gap-6 rounded-[40px] border border-white/70 bg-white/58 p-5 shadow-[0_28px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[0.42fr_minmax(0,0.58fr)] lg:p-7">
          <div className="space-y-4">
            <Skeleton className="h-10 w-52 rounded-xl" />
            <Skeleton className="h-14 w-full max-w-2xl rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-[24px]" />
          </div>
          <Skeleton className="min-h-[560px] rounded-[32px]" />
        </section>
      </div>
    </main>
  )
}
