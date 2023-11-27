import express from 'express';
const router = express.Router();

import { isAuthenticatedUser } from '../middleware/auth.js';
import { stripeCheckoutSession, stripeWebhook } from '../controllers/paymentController.js';

router.route('/payment/chekout_session').post(isAuthenticatedUser, stripeCheckoutSession);
router.route('/payment/webhook').post(stripeWebhook)

export default router;