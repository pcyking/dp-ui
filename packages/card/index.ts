import Card from './src/card.vue'
import { App } from 'vue'

Card.name = 'dp-card'

Card.install = (app: App): void => {
  // 注册组件
  app.component(Card.name, Card)
}

export default Card
