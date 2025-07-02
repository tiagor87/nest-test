export abstract class IHandler<T, TR> {
  abstract execute(request: T): Promise<TR>
}
