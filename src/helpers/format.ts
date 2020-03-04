interface String {
  format(...args: any[]): string;
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    let a = this;
    let b: any;
    // tslint:disable-next-line: forin
    for (b in arguments) {
      a = a.replace(/%[a-z]/, arguments[b]);
    }
    return a;
  };
}