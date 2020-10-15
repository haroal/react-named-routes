import router from './index'

describe('router', () => {
  describe('registerRoutes', () => {
    afterEach(() => {
      // Reset registered routes
      router.globalRoutes = {}
    })

    it('should register route path', () => {
      router.registerRoutes('', {
        home: { path: '/home' }
      })

      expect(router.globalRoutes).toHaveProperty('home.path', '/home')
    })

    it('should register route path with prefix', () => {
      router.registerRoutes('/home', {
        user: { path: '/user' },
        group: { path: '/group' }
      })

      expect(router.globalRoutes).toHaveProperty('user.path', '/home/user')
      expect(router.globalRoutes).toHaveProperty('group.path', '/home/group')
    })

    it('should register route path with route data', () => {
      router.registerRoutes('', {
        user: { path: '/home', exact: true, strict: false }
      })

      expect(router.globalRoutes).toHaveProperty('user.exact', true)
      expect(router.globalRoutes).toHaveProperty('user.strict', false)
    })

    it("shouldn't register duplicated route", () => {
      router.globalRoutes = {}

      router.registerRoutes('', {
        home: { path: '/home' }
      })

      expect(() =>
        router.registerRoutes('', { home: { path: '/maison' } })
      ).toThrow(Error)
    })
  })

  describe('getRoutes', () => {
    beforeAll(() => {
      router.registerRoutes('', {
        home: { path: '/home', exact: true },
        user: { path: '/user' }
      })
    })

    afterAll(() => {
      router.globalRoutes = {}
    })

    it('should return a registered route', () => {
      const route = router.getRoute('home')
      expect(route).toHaveProperty('path', '/home')
      expect(route).toHaveProperty('exact', true)
    })

    it('should fail if route not found', () => {
      expect(() => router.getRoute('about')).toThrow(Error)
    })
  })

  describe('toUrl', () => {
    beforeAll(() => {
      router.registerRoutes('', {
        home: { path: '/home', exact: true },
        user: { path: '/user/:id' },
        groups: { path: '/groups/:group+/edit/:id' }
      })
    })

    it('should return a basic url', () => {
      const url = router.toUrl('home')
      expect(url).toBe('/home')
    })

    it('should return a url with simple parameter', () => {
      const url = router.toUrl('user', { id: 59 })
      expect(url).toBe('/user/59')
    })

    it('should return a url with complex parameters', () => {
      const url = router.toUrl('groups', { group: [1, 2, 3], id: 33 })
      expect(url).toBe('/groups/1/2/3/edit/33')
    })

    it('should fail if parameter not given', () => {
      expect(() => router.toUrl('user')).toThrow(Error)
    })
  })
})
