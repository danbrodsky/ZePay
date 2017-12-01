import { Router } from 'express'

// import pay from './pay'
import payment from './payment'

const router = Router()

router.use(payment)

export default router
