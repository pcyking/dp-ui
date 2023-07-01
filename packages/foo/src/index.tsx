import { defineComponent } from 'vue'
import { fooProps } from './types'
import { testLog } from '@dp-ui/utils'

const NAME = 'dp-foo'

export default defineComponent({
  name: NAME,
  props: fooProps,
  setup (props, context) {
    console.log(props, context)
    const onBtnClick = () => {
      console.log('点击按钮测试', props.msg)
      testLog(props.msg)
    }
    return () => (
      <div class={NAME}>
        <h1>dp-demo-ui Foo</h1>
        <p class={NAME + '__description'}>msg is: { props.msg }</p>
        <el-button type='primary' onClick={onBtnClick}>点击我</el-button>
      </div>
    )
  }
})
