/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    audios: Audio;
    categories: Category;
    comments: Comment;
    currencies: Currency;
    chats: Chat;
    medias: Media;
    metrics: Metric;
    messages: Message;
    notifications: Notification;
    'payment-methods': PaymentMethod;
    plans: Plan;
    'product-prices': ProductPrice;
    products: Product;
    prompts: Prompt;
    subscriptions: Subscription;
    orders: Order;
    users: User;
    'user-transcriptions': UserTranscription;
    'user-documents': UserDocument;
  };
  globals: {
    'pago-movil': PagoMovil;
    zelle: Zelle;
    gpt4: Gpt4;
    gpt35: Gpt35;
    whisper: Whisper;
  };
}
export interface Audio {
  id: string;
  user: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  roles?: ('admin' | 'subscriber' | 'editor' | 'user')[];
  functionalities?: 'basic' | 'premium' | 'professional' | 'enterprise' | 'custom' | 'free';
  stripeCustomerID?: string;
  stripeID?: string;
  skipSync?: boolean;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean;
  apiKey?: string;
  apiKeyIndex?: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string | Media;
  createdBy?: string | User;
  lastModifiedBy?: string | User;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  altText: string;
  createdBy?: string | User;
  lastModifiedBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    card?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    tablet?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface Comment {
  id: string;
  comment: string;
  user?: string | User;
  likes?: number;
  dislikes?: number;
  commentable?:
    | {
        value: string | Product;
        relationTo: 'products';
      }
    | {
        value: string | Comment;
        relationTo: 'comments';
      };
  createdBy?: string | User;
  lastModifiedBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  productType?: string | Plan;
  productStatus: 'active' | 'inactive';
  productImage: string | Media;
  relatedProducts?: string[] | Product[];
  info: {
    [k: string]: unknown;
  }[];
  price?: string | ProductPrice;
  lastModifiedBy?: string | User;
  createdBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Plan {
  id: string;
  name: string;
  description: string;
  status?: 'active' | 'inactive';
  functionalities?: 'basic' | 'premium' | 'professional' | 'enterprise' | 'custom' | 'free';
  category: string[] | Category[];
  subscriptions?: string[] | Subscription[];
  periodicity?: 'monthly' | 'bimonthly' | 'quarterly' | 'biannual' | 'annual' | 'custom';
  lastModifiedBy?: string | User;
  createdBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Subscription {
  id: string;
  status?: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  user?: string | User;
  product?: string | Product;
  plan?: string | Plan;
  periodicity?: 'monthly' | 'bimonthly' | 'quarterly' | 'biannual' | 'annual' | 'custom';
  order?: string | Order;
  functionalities?: 'basic' | 'premium' | 'professional' | 'enterprise' | 'custom' | 'free';
  updatedAt: string;
  createdAt: string;
}
export interface Order {
  id: string;
  amount: number;
  status?: 'active' | 'inactive' | 'canceled' | 'pending' | 'finished' | 'refunded';
  type?: 'order' | 'renewal' | 'subscription';
  customer?: string | User;
  products?: string[] | Product[];
  referenceNumber?: string;
  paymentMethod?: string | PaymentMethod;
  details?: {
    [k: string]: unknown;
  }[];
  total?: string;
  createdBy?: string | User;
  lastModifiedBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface PaymentMethod {
  id: string;
  paymentsOfUser?: string | User;
  title: string;
  paymentMethodType: 'zelle' | 'paypal' | 'pagoMovil' | 'cash' | 'bankTransfer' | 'crypto' | 'stripe' | 'binance';
  zelle?: {
    zelleEmail?: string;
    zelleName?: string;
  };
  paypal?: {
    paypalEmail?: string;
  };
  pagoMovil?: {
    pagoMovilPhone: string;
    bank?:
      | 'banco-de-venezuela'
      | 'banco-mercantil'
      | 'banco-provincial'
      | 'banco-bicentenario'
      | 'banco-exterior'
      | 'banco-occidental-de-descuento'
      | 'banco-sofitasa'
      | 'banco-plaza'
      | 'banco-caroni'
      | 'banco-activo'
      | 'banco-del-tesoro'
      | 'banco-agricola-de-venezuela'
      | 'banco-de-la-fuerza-armada-nacional-bolivariana'
      | 'banco-del-pueblo-soberano'
      | 'banco-nacional-de-credito'
      | 'banco-venezolano-de-credito'
      | 'banesco';
    pagoMovilIdn: string;
  };
  cash?: {
    cash?: string;
  };
  bankTransfer?: {
    accountNumber?: string;
    bankName?: string;
    accountType?: 'savings' | 'current';
    bank?:
      | 'banco-de-venezuela'
      | 'banco-mercantil'
      | 'banco-provincial'
      | 'banco-bicentenario'
      | 'banco-exterior'
      | 'banco-occidental-de-descuento'
      | 'banco-sofitasa'
      | 'banco-plaza'
      | 'banco-caroni'
      | 'banco-activo'
      | 'banco-del-tesoro'
      | 'banco-agricola-de-venezuela'
      | 'banco-de-la-fuerza-armada-nacional-bolivariana'
      | 'banco-del-pueblo-soberano'
      | 'banco-nacional-de-credito'
      | 'banco-venezolano-de-credito'
      | 'banesco';
  };
  stripe?: {
    stripePaymentMethodId?: string;
  };
  default?: boolean;
  createdBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface ProductPrice {
  id: string;
  price: number;
  currency: string | Currency;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}
export interface Currency {
  id: string;
  name: string;
  symbol: string;
  exchangeRate?: number;
  slug?: string;
  code:
    | 'usd'
    | ' aed'
    | ' afn'
    | ' all'
    | ' amd'
    | ' ang'
    | ' aoa'
    | ' ars'
    | ' aud'
    | ' awg'
    | ' azn'
    | ' bam'
    | ' bbd'
    | ' bdt'
    | ' bgn'
    | ' bhd'
    | ' bif'
    | ' bmd'
    | ' bnd'
    | ' bob'
    | ' brl'
    | ' bsd'
    | ' bwp'
    | ' byn'
    | ' bzd'
    | ' cad'
    | ' cdf'
    | ' chf'
    | ' clp'
    | ' cny'
    | ' cop'
    | ' crc'
    | ' cve'
    | ' czk'
    | ' djf'
    | ' dkk'
    | ' dop'
    | ' dzd'
    | ' egp'
    | ' etb'
    | ' eur'
    | ' fjd'
    | ' fkp'
    | ' gbp'
    | ' gel'
    | ' gip'
    | ' gmd'
    | ' gnf'
    | ' gtq'
    | ' gyd'
    | ' hkd'
    | ' hnl'
    | ' hrk'
    | ' htg'
    | ' huf'
    | ' idr'
    | ' ils'
    | ' inr'
    | ' isk'
    | ' jmd'
    | ' jod'
    | ' jpy'
    | ' kes'
    | ' kgs'
    | ' khr'
    | ' kmf'
    | ' krw'
    | ' kwd'
    | ' kyd'
    | ' kzt'
    | ' lak'
    | ' lbp'
    | ' lkr'
    | ' lrd'
    | ' lsl'
    | ' mad'
    | ' mdl'
    | ' mga'
    | ' mkd'
    | ' mmk'
    | ' mnt'
    | ' mop'
    | ' mur'
    | ' mvr'
    | ' mwk'
    | ' mxn'
    | ' myr'
    | ' mzn'
    | ' nad'
    | ' ngn'
    | ' nio'
    | ' nok'
    | ' npr'
    | ' nzd'
    | ' omr'
    | ' pab'
    | ' pen'
    | ' pgk'
    | ' php'
    | ' pkr'
    | ' pln'
    | ' pyg'
    | ' qar'
    | ' ron'
    | ' rsd'
    | ' rub'
    | ' rwf'
    | ' sar'
    | ' sbd'
    | ' scr'
    | ' sek'
    | ' sgd'
    | ' shp'
    | ' sle'
    | ' sos'
    | ' srd'
    | ' std'
    | ' szl'
    | ' thb'
    | ' tjs'
    | ' tnd'
    | ' top'
    | ' try'
    | ' ttd'
    | ' twd'
    | ' tzs'
    | ' uah'
    | ' ugx'
    | ' uyu'
    | ' uzs'
    | ' vnd'
    | ' vuv'
    | ' wst'
    | ' xaf'
    | ' xcd'
    | ' xof'
    | ' xpf'
    | ' yer'
    | ' zar'
    | ' zmw'
    | ' usdc'
    | ' btn'
    | ' ghs'
    | ' eek'
    | ' lvl'
    | ' svc'
    | ' vef'
    | ' ltl'
    | ' sll';
  updatedAt: string;
  createdAt: string;
}
export interface Chat {
  id: string;
  name: string;
  description?: string;
  users?: string[] | User[];
  type?: 'group' | 'private' | 'bot' | 'qa';
  updatedAt: string;
  createdAt: string;
}
export interface Metric {
  id: string;
  value:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  user: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
}
export interface Message {
  id: string;
  chat: string | Chat;
  user: string | User;
  type: 'text' | 'image' | 'audio' | 'ai';
  ai?: string;
  text?: string;
  image?: string | Media;
  audio?: string | Audio;
  updatedAt: string;
  createdAt: string;
}
export interface Notification {
  id: string;
  recipient?: string | User;
  message: string;
  status: 'active' | 'inactive';
  type:
    | 'comment'
    | 'like'
    | 'share'
    | 'follow'
    | 'mention'
    | 'message'
    | 'order'
    | 'payment'
    | 'evaluation'
    | 'request'
    | 'notification'
    | 'other';
  read: boolean;
  lastModifiedBy?: string | User;
  createdBy?: string | User;
  updatedAt: string;
  createdAt: string;
}
export interface Prompt {
  id: string;
  prompt: string;
  description: string;
  category: string[] | Category[];
  createdBy?: string | User;
  lastModifiedBy?: string | User;
  updatedAt: string;
  createdAt: string;
}
export interface UserTranscription {
  id: string;
  user?: string | User;
  audio?: string | Audio;
  transcriptionText?: string;
  summary?: string;
  updatedAt: string;
  createdAt: string;
}
export interface UserDocument {
  id: string;
  createdBy?: string | User;
  lastModifiedBy?: string | User;
  slug?: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    card?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
    tablet?: {
      url?: string;
      width?: number;
      height?: number;
      mimeType?: string;
      filesize?: number;
      filename?: string;
    };
  };
}
export interface PagoMovil {
  id: string;
  phone: string;
  name: string;
  cid: string;
  bank?:
    | 'banco-de-venezuela'
    | 'banco-mercantil'
    | 'banco-provincial'
    | 'banco-bicentenario'
    | 'banco-exterior'
    | 'banco-occidental-de-descuento'
    | 'banco-sofitasa'
    | 'banco-plaza'
    | 'banco-caroni'
    | 'banco-activo'
    | 'banco-del-tesoro'
    | 'banco-agricola-de-venezuela'
    | 'banco-de-la-fuerza-armada-nacional-bolivariana'
    | 'banco-del-pueblo-soberano'
    | 'banco-nacional-de-credito'
    | 'banco-venezolano-de-credito'
    | 'banesco';
  updatedAt?: string;
  createdAt?: string;
}
export interface Zelle {
  id: string;
  email: string;
  zelleHolder: string;
  bank: string;
  updatedAt?: string;
  createdAt?: string;
}
export interface Gpt4 {
  id: string;
  input8: number;
  output8: number;
  input32: number;
  output32: number;
  updatedAt?: string;
  createdAt?: string;
}
export interface Gpt35 {
  id: string;
  input4: number;
  output4: number;
  input16: number;
  output16: number;
  updatedAt?: string;
  createdAt?: string;
}
export interface Whisper {
  id: string;
  input: number;
  updatedAt?: string;
  createdAt?: string;
}
