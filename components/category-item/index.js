import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';

import { screen, H3 } from 'ui';
import {
  Outer,
  ProductOuter,
  Inner,
  ProductInner,
  MicroFormat,
  ImageWrapper,
  Img,
  ContentLine,
  Price,
  imageSize
} from './styles';

export default function CategoryItem({ data }) {
  if (!data) {
    return null;
  }

  const { name, path, type, variants } = data;

  if (type === 'folder' || type === 'document') {
    const images = data.components.find(c => c.type === 'images');
    const image = images?.content?.images?.[0];

    return (
      <Link as={path} href={`/${type}`} passHref>
        <Outer type={type}>
          <Inner>
            <ImageWrapper>
              {image && (
                <Img
                  {...image}
                  alt={name}
                  sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
                />
              )}
            </ImageWrapper>

            <MicroFormat>
              <H3>{name}</H3>
            </MicroFormat>
          </Inner>
        </Outer>
      </Link>
    );
  }

  const { price, image } = variants
    ? variants.find(variant => variant.isDefault)
    : {};

  return (
    <Link as={path} href="/product" passHref>
      <ProductOuter>
        <ProductInner>
          <ContentLine>
            <span>{name}</span>
          </ContentLine>
          <ImageWrapper>
            <Img
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
            />
          </ImageWrapper>
          <ContentLine right>
            <Price>
              <CurrencyValue value={price} />
            </Price>
          </ContentLine>
        </ProductInner>
      </ProductOuter>
    </Link>
  );
}
