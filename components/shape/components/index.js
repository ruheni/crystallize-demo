import React from 'react';
import PropTypes from 'prop-types';
import CrystallizeContent from '@crystallize/content-transformer/react';
import Image from '@crystallize/react-image';

import ParagraphCollection from './paragraph-collection';
import { Images } from './paragraph-collection/styles';

const ShapeComponents = ({ components, overrides }) => {
  if (!components || !Array.isArray(components)) {
    return null;
  }

  return components
    .filter(component => component.content != null)
    .map(({ type, ...component }, index) => {
      const key = index;
      let Component;

      // Check for overrides
      if (overrides && overrides[component.name]) {
        Component = overrides[component.name];
      }

      if (type === 'paragraphCollection') {
        if (!component.content.paragraphs) {
          return null;
        }

        Component = Component || ParagraphCollection;

        return (
          <Component key={key} paragraphs={component.content.paragraphs} />
        );
      }

      if (type === 'images') {
        if (!component.content || !component.content.images) {
          return null;
        }
        return (
          <Images>
            {component.content.images.map((image, idx) => (
              <Image key={idx} {...image} sizes="80vw" />
            ))}
          </Images>
        );
      }

      if (type === 'richText') {
        if (!component.content.json) {
          return null;
        }
        Component = Component || CrystallizeContent;
        return <Component key={key} {...component.content.json[0]} />;
      }

      if (type === 'singleLine') {
        Component = Component || 'span';
        return <Component key={key}>{component.content.text}</Component>;
      }

      // eslint-disable-next-line no-console
      console.log(`Render for ${type} not implemented`);

      return <span key={key} />;
    });
};

ShapeComponents.propTypes = {
  components: PropTypes.array.isRequired,
  overrides: PropTypes.object
};

export default ShapeComponents;
