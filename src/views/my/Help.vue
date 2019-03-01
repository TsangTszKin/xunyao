<template>
  <div class="help">
    <mt-header title="帮助">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="v-content">
      <p class="title">常见问题</p>
      <div class="main">
        <mt-cell title="下单流程是怎样的？" is-link @click.native="modal.pop1 = true">
          <span style="color: green"></span>
        </mt-cell>
      </div>
    </div>

    <mt-popup v-model="modal.pop1" position="right" style="width: 100%;height: 100%;">
      <mt-header title="下单流程是怎样的？">
        <mt-button icon="back" slot="left" @click="modal.pop1 = false"></mt-button>
      </mt-header>
      <v-qna1/>
    </mt-popup>
  </div>
</template>

<script>
import { Cell, Popup } from 'mint-ui';
import QNA1 from '@/components/user/setting/help/QNA1';

export default {
  data() {
    return {
      modal: {
        pop1: false
      }
    }
  },
  components: {
    'v-cell': Cell,
    'mt-popup': Popup,
    'v-qna1': QNA1
  }
}
</script>

<style lang="less" scoped>
.help {
  height: 100%;
  background-color: #f6f8fa;
  > .v-content {
    > .title {
      font-size: 12px;
      padding: 8px;
    }
  }
}
</style>
