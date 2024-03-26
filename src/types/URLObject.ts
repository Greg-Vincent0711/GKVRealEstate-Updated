/**
 * Type matched to the attributes from an s3 image url
 */
interface URLObject {
    key: string | undefined,
    url: string
  }

export type {URLObject}