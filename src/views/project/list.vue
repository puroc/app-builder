<template>
    <div>
        <el-row>
            <el-card :body-style="{ padding: '0px',height:'195px'}" class="add-el-card">
                <div class="add-button-wrapper">
                    <el-button type="text" class="add-button" @click="openAddDialog">添加</el-button>
                </div>
            </el-card>
            <div v-for="project in projects">
                <el-card :body-style="{ padding: '0px' }">
                    <el-row>
                        <el-col :span=12 class="img-wrapper">
                            <img :src="cloud" class="image">
                        </el-col>
                        <el-col :span=12 class="title-wrapper">
                            <div class="title">
                                {{project.desc}}
                            </div>
                        </el-col>
                    </el-row>
                    <div>
                        <el-row>
                            <el-col :span=12 class="button-wrapper">
                                <el-button type="text" @click="openProjectDetail(project.id)">打开</el-button>
                            </el-col>
                            <el-col :span=12 class="button-wrapper">
                                <el-button type="text" @click="deleteProject(project.id)">删除</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </el-row>
        <!-- add dialog -->
        <el-dialog title="添加工程" :visible.sync="addDialogFormVisible" top="5vh">
            <br/>
            <div>
                <el-form :model="addProjectModel" :rules="validateProjectRules" ref="addProjectForm">
                    <el-form-item label="名称" :label-width="formLabelWidth" prop='name' >
                        <el-input v-model="addProjectModel.name" auto-complete="off" placeholder="只能包含字母数字和下划线"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth" prop='desc'>
                        <el-input v-model="addProjectModel.desc" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="模板" :label-width="formLabelWidth" prop='templateId'>
                        <el-input v-model="addProjectModel.templateId" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="addProject">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import cloud from '@/assets/cloud.png'
import { _getProjectList, _addProject, _deleteProject } from '@/api/project'
import { showMsg, showConfirmMsg, resetForm } from '@/utils/index'
export default {
  created() {
    this.getProjectList()
  },
  data() {
    const validateProjectname = (rule, value, callback) => {
      if (new RegExp('^\\w+$').test(value)) {
        callback()
      } else {
        callback(new Error('只能包含字母数字和下划线'))
      }
    }
    return {
      currentDate: new Date(),
      cloud,
      projects: [],
      addProjectModel: {},
      addDialogFormVisible: false,
      validateProjectRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateProjectname
          }
        ],
        desc: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        templateId: [
          {
            required: true,
            trigger: 'blur'
          }
        ]

      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    addProject() {
      this.$refs.addProjectForm.validate(valid => {
        if (valid) {
          _addProject(this.addProjectModel)
            .then(response => {
              if (response.data.resultCode === '1') {
                showMsg(this, 'success', '添加成功')
                this.getProjectList()
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
    openAddDialog() {
      this.addDialogFormVisible = true
      resetForm(this, 'addProjectForm')
    },
    deleteProject(projectId) {
      showConfirmMsg(this, '此操作将永久删除该工程, 是否继续?')
        .then(() => {
          _deleteProject(projectId)
            .then(() => {
              this.getProjectList()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProjectList() {
      _getProjectList()
        .then(response => {
          this.projects = response.data.payloads
        })
        .catch(error => {
          console.log(error)
        })
    },
    openProjectDetail(projectId) {
      this.$router.push({ path: '/project/detail?projectId=' + projectId })
    }
  }
}
</script>
<style scoped>
.add-el-card {
  width: 350px;
  float: left;
  margin: 20px;
}
.add-button {
  padding: 0;
  margin: 0;
  border: 0;
}

.add-button-wrapper {
  position: relative;
  top: calc(50% - 15px);
  text-align: center;
}
.el-card {
  width: 350px;
  float: left;
  margin: 20px;
}

.title-wrapper {
  height: 150px;
}

.img-wrapper {
  text-align: center;
}

.title {
  position: relative;
  top: 50%;
  text-align: center;
}

.button-wrapper {
  padding: 0;
  border: 1px solid rgba(128, 128, 128, 0.096);
  text-align: center;
}
.image {
  /* height: 150px; */
  width: 150px;
}
</style>