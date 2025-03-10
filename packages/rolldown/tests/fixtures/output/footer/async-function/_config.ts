import type { OutputChunk as RolldownOutputChunk } from 'rolldown'
import { defineTest } from 'rolldown-tests'
import { expect } from 'vitest'

const footerTxt = '// footer test\n'
const footer = async () => footerTxt

export default defineTest({
  config: {
    output: {
      footer,
    },
  },
  afterTest: (output) => {
    expect(
      output.output
        .filter(({ type }) => type === 'chunk')
        .every((chunk) =>
          (chunk as RolldownOutputChunk).code.endsWith(footerTxt),
        ),
    ).toBe(true)
  },
})
