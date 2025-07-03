export interface RequestInterface<Body = unknown> {
  body: Body
  params: { id: string }
}