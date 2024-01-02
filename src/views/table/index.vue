<template>
  <div class="app-container">
    <div class="table-component">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.productName" placeholder="商品名称" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="searchForm.productPrice" placeholder="商品名称" />
        </el-form-item>
        <el-form-item label="商品类型">
          <el-select v-model="searchForm.productType" placeholder="商品类型">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
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
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.productName }}
          </template>
        </el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.productImg"
              :fit="fit"
            />
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
        <el-table-column label="商品库存" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleChangeProduct(scope.row)">编辑</el-button>
            <el-popconfirm
              title="确定要删除该产品吗？"
              @onConfirm="handleDeleteProduct(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-page">
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :total="total" @current-change="handleCurrentChange" />
      </div>

    </div>

    <el-dialog title="新增产品" :visible.sync="dialogVisible" width="40%" @close="handleDialogClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.productName" />
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.productPrice" />
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="form.productType" />
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.productNumber" />
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
import { getList, addProduct, changeProduct, deleteProduct } from '@/api/table'

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
      form: {
        productName: '',
        productPrice: '',
        productType: '',
        productNumber: ''
      },
      total: null, // 总条数
      currentPage: 1 // 当前页数
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(params) {
      this.listLoading = true
      getList({ page: this.currentPage, size: 10, ...params }).then(response => {
        this.list = response.data.result.list
        this.total = response.data.result.total
        this.listLoading = false
      })
    },

    handleAddProduct() {
      this.dialogVisible = true
    },

    // 创建商品
    handleSubmitProduct() {
      if (this.form.productId) {
        // 修改商品
        changeProduct(this.form).then(res => {
          if (res.success) {
            this.$message.success('修改成功')
          }
        }).catch(e => {
          this.$message.error(e.message)
        }).finally(() =>
          // 重新查询首页
          this.fetchData()
        )
      } else {
        // 创建商品
        addProduct(this.form).then(res => {
          if (res.success) {
            this.$message.success('新增成功')
          }
        }).catch(e => {
          this.$message.error(e.message)
        }).finally(() =>
          // 重新查询首页
          this.fetchData()
        )
      }
      this.dialogVisible = false
    },

    // 修改商品
    handleChangeProduct(item) {
      this.dialogVisible = true
      this.form = { ...item }
    },

    // 删除商品
    handleDeleteProduct(item) {
      deleteProduct(item.productId).then(res => {
        if (res.success) {
          this.$message.success('删除成功')
        }
      }).catch(e => {
        this.$message.error(e.message)
      }).finally(() =>
        // 重新查询首页
        this.fetchData()
      )
    },

    // Dialog关闭触发事件
    handleDialogClose() {
      this.form = {}
    },

    handleCurrentChange(page) {
      this.currentPage = page
      this.fetchData()
    },

    handleSearch() {
      this.fetchData(this.searchForm)
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
