export default class Product   {
  id: string = ''
  name: string = ''
  price: number = 0
  count: number = 1
  star: number = 0
  info: string = ''
  photos: string[] = []
  postId: string | null = null

  public constructor(init?: Partial<Product >) {    
    Object.assign(this, init);
  }
}