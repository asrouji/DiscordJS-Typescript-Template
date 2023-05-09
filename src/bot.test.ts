// Sample Test File

const add = (a: number, b: number) => a + b

describe('math', () => {
  it('should add numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
