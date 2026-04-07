import type { FC } from 'react';
import type { ContentBlock } from '@gvo/shared';

interface Props {
  blocks: readonly ContentBlock[];
}

export const ContentRenderer: FC<Props> = ({ blocks }) => (
  <div className="content-blocks">
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'heading':
          return <h3 key={i} className="content-heading">{block.text}</h3>;
        case 'paragraph':
          return <p key={i} className="screen-text">{block.text}</p>;
        case 'note':
          return <p key={i} className="screen-text screen-text--note">{block.text}</p>;
        case 'hint':
          return <p key={i} className="screen-text screen-text--muted">{block.text}</p>;
        default:
          return null;
      }
    })}
  </div>
);
