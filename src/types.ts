export interface OrderResponse {
    success: boolean
    msg: string
    order: Order
  }
  
  export interface Order {
    id: number
    name: any
    items: Item[]
    stats: Stats
  }
  
  export interface Item {
    id: number
    type: Type
    quantity: number
    price: number
    currency: string
    unit: string
    valid: boolean
    status: string
    dateCreated: string
    lastUpdated: string
  }
  
  export interface Type {
    id: number
    name: string
    type: string
  }
  
  export interface Stats {
    price: number
    currency: string
    unit: string
  }
  