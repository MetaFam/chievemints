import { toSpanList } from '../lib/helpers'

test(
  'can split a list of single numbers', 
  () => {
    expect(toSpanList('1,2, 3')).toBe([1, 2, 3])
  }
)

test(
  'can join a list of numbers',
  () => {
    expect(toSpanList('1,2, 3').toString()).toBe('1,2,3')
  }
)
