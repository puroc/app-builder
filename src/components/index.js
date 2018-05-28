import srkjLayout from './srkj/design/srkjLayout'
import srkjFormLayout from './srkj/design/srkjFormLayout'
import srkjLayoutConfig from './srkj/design/srkjLayoutConfig'
import srkjButton from './srkj/design/srkjButton'
import srkjButtonConfig from './srkj/design/srkjButtonConfig'
import styleEditor from './srkj/design/styleEditor'
import paramEditor from './srkj/design/paramEditor'
import dataEditor from './srkj/design/dataEditor'
import codeEditor from './srkj/design/codeEditor'
import srkjTable from './srkj/design/srkjTable'
import srkjTableConfig from './srkj/design/srkjTableConfig'
import srkjTableEvent from './srkj/design/srkjTableEvent'
import srkjPagination from './srkj/design/srkjPagination'
import srkjPaginationConfig from './srkj/design/srkjPaginationConfig'
import srkjForm from './srkj/design/srkjForm'
import srkjFormConfig from './srkj/design/srkjFormConfig'
import srButton from './srkj/run/srButton'
import srTable from './srkj/run/srTable'

export default (Vue) => {
  Vue.component('srkj-layout', srkjLayout)
  Vue.component('srkj-form-layout', srkjFormLayout)
  Vue.component('srkj-layout-config', srkjLayoutConfig)
  Vue.component('srkj-button', srkjButton)
  Vue.component('srkj-button-config', srkjButtonConfig)
  Vue.component('style-editor', styleEditor)
  Vue.component('param-editor', paramEditor)
  Vue.component('data-editor', dataEditor)
  Vue.component('code-editor', codeEditor)
  Vue.component('srkj-table', srkjTable)
  Vue.component('srkj-table-config', srkjTableConfig)
  Vue.component('srkj-table-event', srkjTableEvent)
  Vue.component('srkj-pagination', srkjPagination)
  Vue.component('srkj-pagination-config', srkjPaginationConfig)
  Vue.component('srkj-form', srkjForm)
  Vue.component('srkj-form-config', srkjFormConfig)
  Vue.component('sr-button', srButton)
  Vue.component('sr-table', srTable)
}

