import Card from './src/card.vue'
import { withInstall } from '../withInstall'

Card.name = 'dp-card'
const DpCard = withInstall(Card)
export default DpCard
