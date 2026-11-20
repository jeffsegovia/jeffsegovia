import {
  Loader2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

/** The player built in "Building an Audio Player With ReactJS": a track
 * list, play/pause, previous/next, a seek bar showing what is buffered,
 * and volume. Same behaviour as the post; restyled. */

const songs = [...Array(5).keys()].map((n) => ({
  title: `Song Number ${n + 1}`,
  trackNumber: String(n + 1).padStart(2, '0'),
  src: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n + 1}.mp3`,
}))

export function AudioPlayerExample() {
  const [index, setIndex] = React.useState(-1)
  const current = songs[index] as (typeof songs)[number] | undefined

  return (
    <div className="not-prose my-10 border">
      <div className="p-5">
        <p className="mb-5 text-lg font-semibold tracking-tight">
          My Audio Player
        </p>
        <ul className="flex flex-col gap-1">
          {songs.map((song, i) => (
            <li key={song.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={cn(
                  'flex w-full items-center gap-4 px-3 py-2.5 text-left text-sm transition-colors',
                  i === index
                    ? 'bg-foreground text-background'
                    : 'hover:bg-accent',
                )}
              >
                <span className="font-mono text-xs opacity-70">
                  {song.trackNumber}
                </span>
                <span className="flex-1">{song.title}</span>
                {i === index ? (
                  <Pause className="size-4" aria-hidden="true" />
                ) : (
                  <Play className="size-4" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Player
        key={index}
        song={current}
        songIndex={index}
        songCount={songs.length}
        onNext={() => setIndex((i) => i + 1)}
        onPrev={() => setIndex((i) => i - 1)}
      />
    </div>
  )
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '00:00'
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds - min * 60)
  return [min, sec].map((n) => String(n).padStart(2, '0')).join(':')
}

function Player({
  song,
  songIndex,
  songCount,
  onNext,
  onPrev,
}: {
  song?: { title: string; src: string }
  songIndex: number
  songCount: number
  onNext: () => void
  onPrev: () => void
}) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [isReady, setIsReady] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [buffered, setBuffered] = React.useState(0)
  const [volume, setVolume] = React.useState(0.2)
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    if (!song) return
    const t = setTimeout(() => {
      audioRef.current?.play().catch(() => {})
    }, 500)
    return () => clearTimeout(t)
  }, [song])

  const onBuffer: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    const audio = e.currentTarget
    if (audio.duration > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        const k = audio.buffered.length - 1 - i
        if (audio.buffered.start(k) < audio.currentTime) {
          setBuffered(audio.buffered.end(k))
          break
        }
      }
    }
  }

  const iconBtn =
    'flex items-center justify-center transition-colors disabled:opacity-40'
  const ratio = (n: number) => (duration > 0 ? n / duration : 0)

  return (
    <div className="relative border-t px-4 pt-5 pb-5">
      {song ? (
        <audio
          ref={audioRef}
          preload="metadata"
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => songIndex < songCount - 1 && onNext()}
          onCanPlay={(e) => {
            e.currentTarget.volume = volume
            setIsReady(true)
          }}
          onTimeUpdate={(e) => {
            setProgress(e.currentTarget.currentTime)
            onBuffer(e)
          }}
          onProgress={onBuffer}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        >
          <source type="audio/mpeg" src={song.src} />
        </audio>
      ) : null}

      <div className="group absolute -top-[3px] right-0 left-0 h-1">
        <input
          type="range"
          aria-label="Seek"
          className="progress-bar bg-border before:bg-foreground after:bg-foreground/30 absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none transition-all group-hover:h-2 before:absolute before:inset-0 before:h-full before:w-full before:origin-left after:absolute after:h-full after:w-full"
          style={
            {
              '--progress-width': ratio(progress),
              '--buffered-width': ratio(buffered),
            } as React.CSSProperties
          }
          min={0}
          max={duration || 0}
          value={progress}
          onChange={(e) => {
            if (!audioRef.current) return
            audioRef.current.currentTime = e.currentTarget.valueAsNumber
            setProgress(e.currentTarget.valueAsNumber)
          }}
        />
      </div>

      <div className="mb-1 text-center">
        <p className="text-sm font-medium">{song?.title ?? 'Select a song'}</p>
        <p className="text-muted-foreground text-xs">SoundHelix</p>
      </div>
      <div className="mt-4 grid grid-cols-2 items-center gap-y-3 md:grid-cols-3">
        <span className="text-muted-foreground font-mono text-xs">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
        <div className="flex items-center gap-3 justify-self-end md:justify-self-center">
          <button
            type="button"
            onClick={onPrev}
            disabled={songIndex <= 0}
            aria-label="Previous song"
            className={cn(iconBtn, 'hover:bg-accent size-10')}
          >
            <SkipBack className="size-5" />
          </button>
          <button
            type="button"
            disabled={!isReady}
            onClick={() =>
              isPlaying ? audioRef.current?.pause() : audioRef.current?.play()
            }
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className={cn(iconBtn, 'bg-foreground text-background size-12')}
          >
            {!isReady && song ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="size-6" />
            ) : (
              <Play className="size-6" />
            )}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={songIndex === songCount - 1}
            aria-label="Next song"
            className={cn(iconBtn, 'hover:bg-accent size-10')}
          >
            <SkipForward className="size-5" />
          </button>
        </div>
        <div className="col-span-2 flex items-center gap-3 md:col-span-1 md:justify-self-end">
          <button
            type="button"
            onClick={() => {
              if (!audioRef.current) return
              audioRef.current.volume = audioRef.current.volume === 0 ? 1 : 0
            }}
            aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            className={cn(iconBtn, 'hover:bg-accent size-8')}
          >
            {volume === 0 ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <input
            aria-label="Volume"
            type="range"
            min={0}
            step={0.05}
            max={1}
            value={volume}
            className="accent-foreground bg-border h-1.5 w-[80px] cursor-pointer appearance-none"
            onChange={(e) => {
              const v = e.currentTarget.valueAsNumber
              if (audioRef.current) audioRef.current.volume = v
              setVolume(v)
            }}
          />
        </div>
      </div>
    </div>
  )
}
