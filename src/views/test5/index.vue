<template>
  <layout>
    <div slot="content">
       <el-dialog title="添加用户" :visible.sync="addDialogFormVisible" top="5vh">
        <el-row>
          <br/>
          <div>
            <el-form :model="addUserModel" :rules="validateUserRules" ref="addUserForm">
              <el-row>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop='username'>
                  <el-input v-model="addUserModel.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
                  <el-input type="password" v-model="addUserModel.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop='name'>
                  <el-input v-model="addUserModel.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth" prop='phone'>
                  <el-input v-model="addUserModel.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
                  <el-input v-model="addUserModel.email" auto-complete="off"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </layout>
</template>
<script>
import layout from './layout'
import test from './test'
export default {
  ...test,
  components: {
    layout
  }
}
</script>


