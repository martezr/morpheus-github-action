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
    refType: string
    instance: Instance
    quantity: number
    price: number
    currency: string
    unit: string
    valid: boolean
    status: string
    statusMessage: string
    dateCreated: string
    lastUpdated: string
  }
  
  export interface Instance {
    id: number
    name: string
    status: string
    locations: string[]
    version: string
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
  