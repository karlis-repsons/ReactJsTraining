function takeAndSetMessage(m) { this.message = m; }

export default function newExceptionType(
    name, BaseType, initializer = takeAndSetMessage
) {
    let exceptionFunction = (
        Function(`return function ${name}() {
                      if (${name}.initializer)
                          ${name}.initializer.apply(this, arguments);
                      if (!Error.captureStackTrace)
                          this.stack = (new Error()).stack;
                      else
                          Error.captureStackTrace(this, this.constructor);
                  };`)
    )();
    exceptionFunction.initializer = initializer;
    exceptionFunction.prototype = Object.create(BaseType.prototype);
    exceptionFunction.prototype.constructor = exceptionFunction;
    return exceptionFunction;
}