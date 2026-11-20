import type { MDXComponents } from 'mdx/types'
import { AudioPlayerExample } from '@/components/mdx/audio-player/audio-player'
import {
  Alert,
  BannerImage,
  LinkInPage,
  LinkToPart,
  RelativeLink,
  SmartLink,
} from '@/components/mdx/basic'
import { CarouselExample } from '@/components/mdx/carousel'
import { Pre } from '@/components/mdx/code-block'
import { FileTree } from '@/components/mdx/file-tree/file-tree'
import {
  InputWithFloatingLabel,
  InputWithFloatingLabelA,
  InputWithFloatingLabelB,
  InputWithFloatingLabelC,
} from '@/components/mdx/floating-label'

/** Everything the posts and snippets render: HTML overrides plus the
 * components they call by name. */
export const mdxComponents: MDXComponents = {
  a: ({ href, children, className }) =>
    className?.includes('heading-anchor') ? (
      <a href={href} className={className}>
        {children}
      </a>
    ) : (
      <SmartLink href={href} className={className}>
        {children}
      </SmartLink>
    ),
  pre: Pre,
  img: ({ src, alt, ...rest }) => (
    <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" {...rest} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table {...props} />
    </div>
  ),
  BannerImage,
  LinkInPage,
  RelativeLink,
  LinkToPart,
  Alert,
  AudioPlayerExample,
  CarouselExample,
  FileTree,
  InputWithFloatingLabel,
  InputWithFloatingLabelA,
  InputWithFloatingLabelB,
  InputWithFloatingLabelC,
}
