import { Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log('serializer', user);
    // login olurken serialize eder.
    done(null, user)
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void
  ): any {
    console.log('deserializer', payload);
    // login olup request üzerinden çağırıldığında deseralize eder.
    done(null, payload)
  }
}