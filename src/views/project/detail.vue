<template>
    <div>
        页面列表
        <el-row>
            <el-button type="primary" size="medium">添加</el-button>
            <el-button type="primary" size="medium">删除</el-button>
        </el-row>
        <el-table ref="multipleTable" border stripe highlight-current-row :data="pages" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
            <el-table-column type="selection" disabled/>
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="url" label="URL" />
            <el-table-column prop="component" label="组件" />
            <el-table-column prop="hidden" label="隐藏" />
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="openPageBuilder(scope.row)" type="text" size="small">设计</el-button>
                    <el-button @click="updatePage(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deletePage(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <center>
            <el-pagination @size-change="chanagePageSize" @current-change="changePageNum" :current-page="currentPage" :page-sizes="pageSizeList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
            </el-pagination>
        </center>
    </div>
</template>
<script>
export default {
  data() {
    return {
      pages: [],
      currentPage: 1,
      pageSize: 10,
      totalRecord: 0,
      pageSizeList: {}
    }
  },
  created() {

  },
  methods: {
    handleSelectionChange(pageList) {},
    openPageBuilder(row) {},
    updatePage(row) {},
    deletePage(row) {},
    chanagePageSize() {},
    changePageNum() {},
    addPage() {},
    getPageList() {

    }
  }
}
</script>
