import { buildRoute } from './routes'

describe('buildRoute', () => {
  test('it builds a route without any dynamic parts', () => {
    const path = '/some/nested/route'
    expect(buildRoute(path)).toEqual(path)
  })

  test('it builds a route with dynamic parts', () => {
    const path = '/resource/:id'
    expect(buildRoute(path, { id: '1' })).toEqual('/resource/1')
  })

  test('it ignores variables that do not matter', () => {
    const path = '/resource/:id'
    expect(buildRoute(path, { derp: '1' })).toEqual(path)
  })
})
