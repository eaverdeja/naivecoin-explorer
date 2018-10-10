import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const hashResume = (hash, limit = 12) => {
  const resume = hash
    ? `${hash.slice(0, limit)}....${hash.slice(-limit)}`
    : null

  return (
    <CopyToClipboard style={{ cursor: 'pointer' }} text={hash}>
      <span>{resume}</span>
    </CopyToClipboard>
  )
}
