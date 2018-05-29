<template>
    <div>
        <el-row>
            <el-card :body-style="{ padding: '0px',height:'195px'}" class="add-el-card">
                <div class="add-button-wrapper">
                    <el-button type="text" class="add-button">添加</el-button>
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
                                好吃的汉堡
                            </div>
                        </el-col>
                    </el-row>
                    <div>
                        <el-row>
                            <el-col :span=12 class="button-wrapper">
                                <el-button type="text">设计</el-button>
                            </el-col>
                            <el-col :span=12 class="button-wrapper">
                                <el-button type="text">删除</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
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