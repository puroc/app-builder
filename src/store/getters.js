const getters = {
  sidebar: state => state.app.sidebar,
  username: state => state.user.username,
  password: state => state.user.password,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  currentRole: state => state.user.currentRole,
  currentOrg: state => state.user.currentOrg,
  permissions: state => state.user.permissions,
  componentsLayouts: state => state.builder.componentsLayouts,
  componentsParams: state => state.builder.componentsParams,
  componentsAttributes: state => state.builder.componentsAttributes,
  componentsStyles: state => state.builder.componentsStyles,
  componentsDatas: state => state.builder.componentsDatas,
  componentsEvents: state => state.builder.componentsEvents,
  componentsCodes: state => state.builder.componentsCodes,
  currentComponent: state => state.builder.currentComponent,
  time: state => state.builder.time,
  loadTime: state => state.builder.loadTime

}
export default getters
