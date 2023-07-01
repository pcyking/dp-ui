import { ExtractPropTypes } from 'vue'

export const cardProps = {
  msg: {
    type: String,
    required: false,
    default: ''
  }
} as const

export type CardProps = ExtractPropTypes<typeof cardProps>
