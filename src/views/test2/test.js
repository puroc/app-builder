export default {
  data() {
    return {
      attributes1: {
        name: '按钮1',
        type: 'danger',
        size: 'medium',
        plain: false
      },
      attributes2: {
        name: '按钮2',
        type: 'info',
        size: 'mini',
        plain: true
      },
      attributes3: {
        cols: [
          {
            id: '0',
            prop: 'num',
            label: '序号',
            type: 'selection'
          },
          {
            id: '1',
            prop: 'date',
            label: '日期11'
          },
          {
            id: '2',
            prop: 'name',
            label: '姓名22'
          },
          {
            id: '3',
            prop: 'address',
            label: '地址33'
          }
        ]
      },
      data3: {
        tableData: [
          {
            date: '2016-05-02',
            name: 'a',
            address: 'aa'
          },
          {
            date: '2016-05-04',
            name: 'b',
            address: 'bb'
          },
          {
            date: '2016-05-01',
            name: 'c',
            address: 'cc'
          },
          {
            date: '2016-05-03',
            name: 'd',
            address: 'dd'
          }
        ]
      },
      event3: {
        xixi: 'handle'
      }
    }
  },
  methods: {
    handleSelectionChange() {
      alert('haha')
    },
    a() {
      alert('a')
    },
    b() {
      alert('b')
    },
    add() {
      this.data1['tableData'].push({
        date: '111',
        name: '222',
        address: '333'
      })
    },
    subtract() {
      this.data1['tableData'].splice(0, 1)
    }
  }
}
