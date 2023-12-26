<template>
  <div class="app-container">
    <div class="table-component">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.productName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="searchForm.productPrice" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="searchForm.productType" placeholder="商品类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button size="mini" type="primary" @click="handleAddProduct">新增产品</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        size="small"
      >
        <el-table-column align="center" label="序号" >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.productName }}
          </template>
        </el-table-column>
        <el-table-column label="商品价格" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.productPrice }}(元/斤)</span>
          </template>
        </el-table-column>
        <el-table-column label="商品类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.productType }}
          </template>
        </el-table-column>
        <el-table-column label="商品库存" align="center">
          <template slot-scope="scope">
            {{ scope.row.productNumber }}
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-page">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" />
      </div>

    </div>


    <el-dialog title="新增产品" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.productPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="form.productType"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.productNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmitProduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addProduct } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      dialogVisible: false, // flag--新增模态框
      searchForm: {
        productName: '',
        productPrice: '',
        productType: ''
      },
      form:{
        productName: '',
        productPrice: '',
        productType: '',
        productNumber: ''
      },
      total: null // 总条数
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page, params) {
      this.listLoading = true
      getList({page:page || 1, size: 10, ...params}).then(response => {
        this.list = response.data.result.list
        this.total =  response.data.result.total
        this.listLoading = false
      })
    },
    handleAddProduct () {
      this.dialogVisible = true
    },
    handleSubmitProduct () {
      addProduct(this.form).then(res => {
        console.log(res)
      })
      this.dialogVisible = false
      // 重新查询首页
      this.fetchData()
    },
    handleCurrentChange(page){
      this.fetchData(page)
    },
    handleSearch () {
      this.fetchData(1, this.searchForm)
    }
  }
}
</script>

<style lang="less">
.table-component{
  .btns{
    margin-bottom: 10px;
  }
  .footer-page{
    float: right;
    margin-top: 10px;
  }
}

</style>
