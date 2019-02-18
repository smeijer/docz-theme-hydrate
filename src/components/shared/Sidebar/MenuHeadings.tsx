import * as React from 'react'
import { SFC } from 'react'
import { Docs, Entry, Link } from 'docz'
import styled from 'react-emotion'
import get from 'lodash/get'

import { get as themeGet } from '@utils/theme'

const primaryColor = themeGet('colors.primary')

const Submenu = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 5px 0 0;
  position: relative;
`

const SmallLink = styled(Link)`
  position: relative;
  font-size: 14px;
  font-weight: 400;
  padding: 4px var(--sidebar-padding) 5px;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:first-line {
    line-height: 22px;
  }

  &,
  &:hover,
  &:focus,
  &:visited,
  &.active {
    color: ${themeGet('colors.sidebarText')};
  }

  &.active {
    font-weight: 600;
    opacity: 1;
  }

  &:before {
    z-index: 1;
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    width: 0;
    height: 30px;
    background: ${primaryColor};
    transition: width 0.2s;
  }

  &.active:before {
    width: 3px;
  }
`

const isSmallLinkActive = (slug: string) => (m: any, location: any) =>
  slug === location.hash.slice(1, Infinity)

const getHeadings = (route: string, docs: Entry[]) => {
  const doc = docs.find(doc => doc.route === route)
  const headings = get(doc, 'headings')

  return headings ? headings.filter(heading => heading.depth === 2) : []
}

interface MenuHeadingsProps {
  route: string
  onClick?: React.MouseEventHandler<any>
}

export const MenuHeadings: SFC<MenuHeadingsProps> = ({ route, onClick }) => (
  <Docs>
    {({ docs }) => {
      const headings = getHeadings(route, docs)

      return (
        headings.length > 0 && (
          <Submenu>
            {headings.map((heading: any) => (
              <SmallLink
                key={heading.slug}
                onClick={onClick}
                to={{ pathname: route, hash: heading.slug }}
                isActive={isSmallLinkActive(heading.slug)}
              >
                {heading.value}
              </SmallLink>
            ))}
          </Submenu>
        )
      )
    }}
  </Docs>
)
