import type { ParsedContent } from "@nuxt/content"

export interface Timeline {
  date: string
  title: string
  text: string
}

export interface ParsedTimelineContent extends ParsedContent {
  timelines: Timeline[]
}
