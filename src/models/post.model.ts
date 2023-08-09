
// uygulama içerisinde apidan çekilen verileri bu model ile yakalayıp model bazlı çalışmayı göreceğiz.
export interface Post {
  id:number;
  title:string; // required
  body?:string // optional
}

// kendi entity nesnelerimizde class
