import { AppError } from "shared/error/AppError"
import mercadoPago from 'mercadopago'
import { injectable } from "tsyringe"

interface Request {
    action: string,
    data: {
        id: string
    }
}

@injectable()
export class VerificarStatusPagamentoUseCase {
    async execute({action, data}: Request): Promise<void> {
        if(action === 'payment.created' || action === 'payment.updated'){
            mercadoPago.configure({
                access_token: process.env.PROD_ACCESS_TOKEN
            })
         const pagamento = await mercadoPago.payment.findById(Number(data.id))
         const test = await mercadoPago.payment.get(Number(data.id))
         console.log(pagamento)
 
        }
    }
}

// mercadopagoResponse {
//     body: {
//       additional_info: '',
//       auto_return: '',
//       back_urls: { failure: '', pending: '', success: '' },
//       binary_mode: false,
//       client_id: '694250270858432',
//       collector_id: 321803404,
//       coupon_code: null,
//       coupon_labels: null,
//       date_created: '2022-06-17T15:18:19.734-04:00',
//       date_of_expiration: null,
//       expiration_date_from: null,
//       expiration_date_to: null,
//       expires: false,
//       external_reference: '',
//       id: '321803404-5fae1f56-3b15-455d-898c-8e48d2c531d1',
//       init_point: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=321803404-5fae1f56-3b15-455d-898c-8e48d2c531d1',
//       internal_metadata: null,
//       items: [ [Object] ],
//       marketplace: 'NONE',
//       marketplace_fee: 0,
//       metadata: {},
//       notification_url: null,
//       operation_type: 'regular_payment',
//       payer: {
//         phone: [Object],
//         address: [Object],
//         email: '',
//         identification: [Object],
//         name: '',
//         surname: '',
//         date_created: null,
//         last_purchase: null
//       },
//       payment_methods: {
//         default_card_id: null,
//         default_payment_method_id: null,
//         excluded_payment_methods: [Array],
//         excluded_payment_types: [Array],
//         installments: null,
//         default_installments: null
//       },
//       processing_modes: null,
//       product_id: null,
//       redirect_urls: { failure: '', pending: '', success: '' },
//       sandbox_init_point: 'https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=321803404-5fae1f56-3b15-455d-898c-8e48d2c531d1',
//       site_id: 'MLB',
//       shipments: { default_shipping_method: null, receiver_address: [Object] },
//       total_amount: null,
//       last_updated: null
//     },
//     response: {
//       additional_info: '',
//       auto_return: '',
//       back_urls: { failure: '', pending: '', success: '' },
//       binary_mode: false,
//       client_id: '694250270858432',
//       collector_id: 321803404,
//       coupon_code: null,
//       coupon_labels: null,
//       date_created: '2022-06-17T15:18:19.734-04:00',
//       date_of_expiration: null,
//       expiration_date_from: null,
//       expiration_date_to: null,
//       expires: false,
//       external_reference: '',
//       id: '321803404-5fae1f56-3b15-455d-898c-8e48d2c531d1',
//       init_point: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=321803404-5fae1f56-3b15-455d-898c-8e48d2c531d1',
//       internal_metadata: null,
//       items: [ [Object] ],
//       marketplace: 'NONE',
//       marketplace_fee: 0,
//       metadata: {},
//       notification_url: null,
//       operation_type: 'regular_payment',
//       payer: {
//         phone: [Object],
//         address: [Object],
//         email: '',
//         identification: [Object],
//         name: '',
//         surname: '',
//         date_created: null,
//         last_purchase: null
//       },
//       payment_methods: {
//         default_card_id: null,
//         default_payment_method_id: null,
//         excluded_payment_methods: [Array],
//         excluded_payment_types: [Array],
//         installments: null,
//         default_installments: null
//       },
//       processing_modes: null,
//       product_id: null,
//       redirect_urls: { failure: '', pending: '', success: '' },
//       sandbox_init_point: 'https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=321803404-5fae1f56-3b15-455d-898c-8e48d2c531d1',
//       site_id: 'MLB',
//       shipments: { default_shipping_method: null, receiver_address: [Object] },
//       total_amount: null,
//       last_updated: null
//     },
//     status: 201,
//     idempotency: undefined,
//     pagination: undefined
//   }

//   {
//     "action": "payment.created",
//     "api_version": "v1",
//     "data": {
//       "id": "1266692275"
//     },
//     "date_created": "2022-06-17T19:20:15Z",
//     "id": 101951396811,
//     "live_mode": false,
//     "type": "payment",
//     "user_id": "321803404"
//   }

//   mercadopagoResponse {
//     body: {
//       acquirer_reconciliation: [],
//       additional_info: {
//         authentication_code: null,
//         available_balance: null,
//         ip_address: '177.10.6.219',
//         items: [Array],
//         nsu_processadora: null
//       },
//       authorization_code: null,
//       binary_mode: false,
//       brand_id: null,
//       call_for_authorize_id: null,
//       captured: true,
//       card: {
//         cardholder: [Object],
//         date_created: '2022-06-17T15:20:15.000-04:00',
//         date_last_updated: '2022-06-17T15:20:15.000-04:00',
//         expiration_month: 11,
//         expiration_year: 2025,
//         first_six_digits: '423564',
//         id: null,
//         last_four_digits: '5682'
//       },
//       charges_details: [],
//       collector_id: 321803404,
//       corporation_id: null,
//       counter_currency: null,
//       coupon_amount: 0,
//       currency_id: 'BRL',
//       date_approved: '2022-06-17T15:20:15.789-04:00',
//       date_created: '2022-06-17T15:20:15.675-04:00',
//       date_last_updated: '2022-06-17T15:20:15.789-04:00',
//       date_of_expiration: null,
//       deduction_schema: null,
//       description: 'pacote30',
//       differential_pricing_id: null,
//       external_reference: null,
//       fee_details: [ [Object] ],
//       id: 1266692275,
//       installments: 1,
//       integrator_id: null,
//       issuer_id: '25',
//       live_mode: false,
//       marketplace_owner: null,
//       merchant_account_id: null,
//       merchant_number: null,
//       metadata: {},
//       money_release_date: '2022-06-17T15:20:15.789-04:00',
//       money_release_schema: null,
//       notification_url: null,
//       operation_type: 'regular_payment',
//       order: { id: '4999780089', type: 'mercadopago' },
//       payer: {
//         first_name: null,
//         last_name: null,
//         email: 'test_user_80507629@testuser.com',
//         identification: [Object],
//         phone: [Object],
//         type: null,
//         entity_type: null,
//         id: '1144745093'
//       },
//       payment_method_id: 'visa',
//       payment_type_id: 'credit_card',
//       platform_id: null,
//       point_of_interaction: { business_info: [Object], type: 'UNSPECIFIED' },
//       pos_id: null,
//       processing_mode: 'aggregator',
//       refunds: [],
//       shipping_amount: 0,
//       sponsor_id: null,
//       statement_descriptor: 'FRA8354481',
//       status: 'approved',
//       status_detail: 'accredited',
//       store_id: null,
//       taxes_amount: 0,
//       transaction_amount: 30,
//       transaction_amount_refunded: 0,
//       transaction_details: {
//         acquirer_reference: null,
//         external_resource_url: null,
//         financial_institution: null,
//         installment_amount: 30,
//         net_received_amount: 28.5,
//         overpaid_amount: 0,
//         payable_deferral_period: null,
//         payment_method_reference_id: null,
//         total_paid_amount: 30
//       }
//     },
//     response: {
//       acquirer_reconciliation: [],
//       additional_info: {
//         authentication_code: null,
//         available_balance: null,
//         ip_address: '177.10.6.219',
//         items: [Array],
//         nsu_processadora: null
//       },
//       authorization_code: null,
//       binary_mode: false,
//       brand_id: null,
//       call_for_authorize_id: null,
//       captured: true,
//       card: {
//         cardholder: [Object],
//         date_created: '2022-06-17T15:20:15.000-04:00',
//         date_last_updated: '2022-06-17T15:20:15.000-04:00',
//         expiration_month: 11,
//         expiration_year: 2025,
//         first_six_digits: '423564',
//         id: null,
//         last_four_digits: '5682'
//       },
//       charges_details: [],
//       collector_id: 321803404,
//       corporation_id: null,
//       counter_currency: null,
//       coupon_amount: 0,
//       currency_id: 'BRL',
//       date_approved: '2022-06-17T15:20:15.789-04:00',
//       date_created: '2022-06-17T15:20:15.675-04:00',
//       date_last_updated: '2022-06-17T15:20:15.789-04:00',
//       date_of_expiration: null,
//       deduction_schema: null,
//       description: 'pacote30',
//       differential_pricing_id: null,
//       external_reference: null,
//       fee_details: [ [Object] ],
//       id: 1266692275,
//       installments: 1,
//       integrator_id: null,
//       issuer_id: '25',
//       live_mode: false,
//       marketplace_owner: null,
//       merchant_account_id: null,
//       merchant_number: null,
//       metadata: {},
//       money_release_date: '2022-06-17T15:20:15.789-04:00',
//       money_release_schema: null,
//       notification_url: null,
//       operation_type: 'regular_payment',
//       order: { id: '4999780089', type: 'mercadopago' },
//       payer: {
//         first_name: null,
//         last_name: null,
//         email: 'test_user_80507629@testuser.com',
//         identification: [Object],
//         phone: [Object],
//         type: null,
//         entity_type: null,
//         id: '1144745093'
//       },
//       payment_method_id: 'visa',
//       payment_type_id: 'credit_card',
//       platform_id: null,
//       point_of_interaction: { business_info: [Object], type: 'UNSPECIFIED' },
//       pos_id: null,
//       processing_mode: 'aggregator',
//       refunds: [],
//       shipping_amount: 0,
//       sponsor_id: null,
//       statement_descriptor: 'FRA8354481',
//       status: 'approved',
//       status_detail: 'accredited',
//       store_id: null,
//       taxes_amount: 0,
//       transaction_amount: 30,
//       transaction_amount_refunded: 0,
//       transaction_details: {
//         acquirer_reference: null,
//         external_resource_url: null,
//         financial_institution: null,
//         installment_amount: 30,
//         net_received_amount: 28.5,
//         overpaid_amount: 0,
//         payable_deferral_period: null,
//         payment_method_reference_id: null,
//         total_paid_amount: 30
//       }
//     },
//     status: 200,
//     idempotency: undefined,
//     pagination: undefined
//   }
  
  
  