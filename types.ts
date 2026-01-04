
export interface FollowUpInputs {
  productCategory: ProductCategory;
  problem: ProblemType;
  customerType: CustomerType;
  tone: string;
  language: string;
}

export enum ProblemType {
  NOT_ATTENDED = 'Problem 1 : Webinar Not Attended',
  NO_REPLY = 'Problem 2 : Attended But No reply',
  PAYMENT_DELAY = 'Problem 3 : Ready But Delaying in Payment',
  PRICE_OBJECTION = 'Problem 4 : Price Objection'
}

export enum ProductCategory {
  ONLINE_COURSE = 'Online Course',
  MENTORSHIP = 'Mentorship Program',
  SERVICE = 'Agency/Service',
  TRADING = 'Trading/Finance',
  REAL_ESTATE = 'Real Estate',
  ECOM = 'E-commerce'
}

export enum CustomerType {
  STUDENT = 'Student',
  WORKING_PROFESSIONAL = 'Working Professional',
  BUSINESS_OWNER = 'Business Owner',
  HOUSEWIFE = 'Housewife'
}

export interface GeneratedMessage {
  id: string;
  text: string;
  stepName: string;
}
