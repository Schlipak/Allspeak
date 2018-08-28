export const __standardProxyHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }

    return undefined;
  },

  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
};

export const __createProxyObject = function __createProxyObject(
  target = {},
  handler = __standardProxyHandler
) {
  if (!window.Proxy) {
    throw new Error('Proxy not supported!');
  }

  return new Proxy(target, handler);
};

export default class ProxyObject {
  constructor() {
    Object.defineProperty(this, '__proxy', {
      value: __createProxyObject(),
      configurable: false,
      enumerable: false,
      writable: false,
    });
  }

  get(propertyPath) {
    const [prop, segments = []] = propertyPath.split('.');

    if (segments.length > 0) {
      return this.__proxy[prop].get(segments.join('.'));
    }

    return this.__proxy[prop];
  }

  set(propertyPath, value) {
    const [prop, segments = []] = propertyPath.split('.');

    if (segments.length > 0) {
      return this.__proxy[prop].set(segments.join('.'), value);
    }

    return (this.__proxy[prop] = value);
  }
}
