import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** The Embla carousel built in "Building A Carousel With ReactJS". */
export function CarouselExample() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const [selected, setSelected] = useState(0)

  const sync = useCallback(() => {
    if (!emblaApi || !thumbsApi) return
    setSelected(emblaApi.selectedScrollSnap())
    thumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }, [emblaApi, thumbsApi])

  useEffect(() => {
    if (!emblaApi) return
    sync()
    emblaApi.on('select', sync)
    emblaApi.on('reInit', sync)
    return () => {
      emblaApi.off('select', sync)
      emblaApi.off('reInit', sync)
    }
  }, [emblaApi, sync])

  const go = (i: number) => emblaApi?.scrollTo(i)
  const arrow =
    'bg-background/80 hover:bg-background absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center border backdrop-blur'

  return (
    <figure
      className="not-prose my-8 flex flex-col gap-5"
      aria-roledescription="carousel"
      aria-label="Image carousel example"
    >
      <div className="relative">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => emblaApi?.scrollPrev()}
          className={cn(arrow, 'left-3')}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => emblaApi?.scrollNext()}
          className={cn(arrow, 'right-3')}
        >
          <ChevronRight className="size-4" />
        </button>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((s, i) => (
              <div
                key={s}
                className="aspect-video flex-[0_0_100%] px-2"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
              >
                <img
                  src={s}
                  alt={`Landscape photo ${i + 1}`}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selected}
            className={cn(
              'size-2.5',
              i === selected ? 'bg-foreground' : 'bg-border',
            )}
          />
        ))}
      </div>
      <div className="overflow-hidden" ref={thumbsRef}>
        <div className="flex gap-3">
          {slides.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => go(i)}
              className="flex-[0_0_26%]"
              aria-label={`Show slide ${i + 1}`}
            >
              <img
                src={s}
                alt=""
                className={cn(
                  'aspect-video w-full object-cover transition-opacity',
                  i === selected ? 'opacity-100' : 'opacity-40',
                )}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
      <figcaption className="text-muted-foreground text-center text-sm">
        Image carousel example
      </figcaption>
    </figure>
  )
}

const slides = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
]
