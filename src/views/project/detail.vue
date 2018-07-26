<template>
  <div>
    页面列表
    <el-row>
      <el-button type="primary" size="medium" @click="openAddDialog">添加</el-button>
      <el-button type="primary" size="medium" @click="batchDeletePages">删除</el-button>
    </el-row>
    <el-table ref="multipleTable" border stripe highlight-current-row :data="pages" tooltip-effect="dark" style="width: 100%" max-height="600" @selection-change="handleSelectionChange">
      <el-table-column type="selection" disabled/>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="url" label="URL" />
      <el-table-column prop="component" label="组件" />
      <el-table-column prop="hidden" label="隐藏" />
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="openPageBuilder(scope.row)" type="text" size="small">设计</el-button>
          <el-button @click="openEditUserDialog(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="deletePage(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <center>
      <el-pagination @size-change="chanagePageSize" @current-change="changePageNum" :current-page="currentPage" :page-sizes="pageSizeList" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
      </el-pagination>
    </center>
    <!-- add dialog -->
    <el-dialog title="添加页面" :visible.sync="addDialogFormVisible" top="5vh">
      <br/>
      <div>
        <el-form :model="addPageModel" :rules="validatePageRules" ref="addPageForm">
          <el-form-item label="名称" :label-width="formLabelWidth" prop='name'>
            <el-input v-model="addPageModel.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop='url'>
            <el-input v-model="addPageModel.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="隐藏" :label-width="formLabelWidth" prop='hidden'>
            <el-checkbox v-model="addPageModel.hidden"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addPage">确 定</el-button>
      </div>
    </el-dialog>
    <!-- details dialog -->
    <el-dialog title="页面详情" :visible.sync="editDialogFormVisible" top="5vh">
      <div>
        <el-button type="primary" icon="el-icon-edit" plain @click="switchToEdit" style="float:right;margin-right:5%"></el-button>
      </div>
      <br/>
      <!-- <div style="margin:5%; height:600px; overflow:auto"> -->
      <div style="margin:5%;">
        <el-form :model="editUserModel" :rules="validatePageRules" ref="editPageForm">
          <el-form-item label="名称" :label-width="formLabelWidth" prop='name'>
            <el-input v-model="editUserModel.name" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="URL" :label-width="formLabelWidth" prop='url'>
            <el-input v-model="editUserModel.url" auto-complete="off" :disabled="editable"></el-input>
          </el-form-item>
          <el-form-item label="隐藏" :label-width="formLabelWidth" prop='hidden'>
            <el-checkbox v-model="editUserModel.hidden" :disabled="editable"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="editPage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  _getPageList,
  _addPage,
  _editPage,
  _deletePage,
  _deletePageList
} from '@/api/page'
import { deepCopy, showMsg, showConfirmMsg, resetForm } from '@/utils/index'
export default {
  data() {
    const validatePagename = (rule, value, callback) => {
      if (new RegExp('^\\w+$').test(value)) {
        callback()
      } else {
        callback(new Error('页面名称只能包含字母数字和下划线'))
      }
    }
    return {
      pages: [],
      currentPage: 1,
      pageSizeList: [10, 30, 50],
      pageSize: 10,
      totalRecord: 0,
      formLabelWidth: '70px',
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      editable: true,
      batchDeletePageList: [],
      validatePageRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePagename
          }
        ],
        url: [
          {
            required: true
          }
        ],
        hidden: [
          {
            required: true
          }
        ]
      },
      addPageModel: {
        hidden: false
      },
      editUserModel: {}
    }
  },
  created() {
    this.getPageList()
  },
  computed: {
    projectId() {
      return this.$route.query.projectId
    }
  },
  methods: {
    handleSelectionChange(pageList) {
      this.batchDeletePageList = pageList
    },
    openPageBuilder(row) {
      const pageId = row.id
      this.$router.push({
        path: '/project/builder?projectId=' + this.projectId + '&pageId=' + pageId
      })
    },
    switchToEdit() {
      this.editable = !this.editable
    },
    openEditUserDialog(row) {
      this.editDialogFormVisible = true
      this.editUserModel = deepCopy(row)
      this.editUserModel.hidden = this.editUserModel.hidden === 1
      this.editable = true
    },
    editPage(row) {
      this.$refs.editPageForm.validate(valid => {
        if (valid) {
          const page = this.editUserModel
          page.projectId = this.projectId
          _editPage(page.projectId, page)
            .then(response => {
              if (response.data.resultCode === '1') {
                showMsg(this, 'success', '编辑成功')
                this.getPageList()
              } else {
                showMsg(this, 'error', '编辑失败')
              }
            })
            .catch(error => {
              console.log(error)
            })
          this.editDialogFormVisible = false
        } else {
          return false
        }
      })
    },
    deletePage(row) {
      showConfirmMsg(this, '此操作将永久删除该页面, 是否继续?')
        .then(() => {
          _deletePage(this.projectId, row.id)
            .then(() => {
              this.getPageList()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    changePageNum(pageNum) {
      this.currentPage = pageNum
      this.getPageList()
    },
    chanagePageSize(pageSize) {
      this.pageSize = pageSize
      this.getPageList()
    },
    openAddDialog() {
      this.addDialogFormVisible = true
      resetForm(this, 'addPageForm')
    },
    addPage() {
      this.$refs.addPageForm.validate(valid => {
        if (valid) {
          const page = deepCopy(this.addPageModel)
          page.projectId = this.projectId
          _addPage(page.projectId, page)
            .then(response => {
              if (response.data.resultCode === '1') {
                showMsg(this, 'success', '添加成功')
                this.getPageList()
              } else {
                showMsg(this, 'error', '添加失败')
              }
            })
            .catch(error => {
              console.log(error)
            })
          this.addDialogFormVisible = false
        } else {
          return false
        }
      })
    },
    getPageList() {
      const params = {
        current: this.currentPage === 1 ? 0 : this.currentPage * this.pageSize,
        size: this.pageSize
      }
      _getPageList(this.$route.query.projectId, params)
        .then(response => {
          this.pages = response.data.payloads
        })
        .catch(error => {
          console.log(error)
        })
    },
    batchDeletePages() {
      showConfirmMsg(this, '此操作将永久删除该页面, 是否继续?')
        .then(() => {
          _deletePageList(this.projectId, this.batchDeletePageList)
            .then(() => {
              this.getPageList()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
