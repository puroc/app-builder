<template>
    <div>
        <el-row>
            <!-- <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0"> -->
            <div v-for="project in projects">
                <el-card :body-style="{ padding: '0px' }">
                    <el-row>
                        <el-col :span=12>
                            <center>
                                <img :src="cloud" class="image">
                            </center>
                        </el-col>
                        <el-col :span=12>
                            <div class="title">
                                好吃的汉堡
                            </div>
                        </el-col>
                    </el-row>
                    <div>
                        <el-row>
                            <el-col :span=12 class="button">
                                <center>
                                    <el-button type="text">设计</el-button>
                                </center>
                            </el-col>
                            <el-col :span=12 class="button">
                                <center>
                                    <el-button type="text">删除</el-button>
                                </center>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
            <!-- </el-col> -->
        </el-row>
    </div>
</template>
<script>
import cloud from '@/assets/cloud.png'
export default {
  data() {
    return {
      currentDate: new Date(),
      cloud,
      projects: [1, 2, 3, 4, 5]
    }
  }
}
</script>
<style scoped>
.el-card {
  width: 350px;
  float: left;
  margin: 20px;
}

.title {
  position: absolute;
  top: 50%;
  /* text-align:center */
}

.button {
  padding: 0;
  border: 1px solid rgba(128, 128, 128, 0.096);
}
.image {
  height: 150px;
  width: 150px;
}
</style>