export interface SocialUrl {
  type: string
  handle: string
}

export interface Location {
  north: number
  east: number
}

export interface Place {
  name: string
  picture: string
  text: string
  social?: SocialUrl[]
  coordinates: Location
  text_flow: "left" | "right"
  active: boolean
}