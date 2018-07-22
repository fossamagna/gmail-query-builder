export default class QueryBuilder implements SearchOperator {

  private searchOperators: SearchOperator[] = [];

  static q(query?: SearchOperator): QueryBuilder {
    return new QueryBuilder(query);
  }

  constructor(query?: SearchOperator) {
    if (query) {
      this.searchOperators.push(query);
    }
  }

  from(from: SearchOperator): QueryBuilder {
    this.searchOperators.push(new From(from));
    return this;
  }

  to(to: SearchOperator): QueryBuilder {
    this.searchOperators.push(new To(to));
    return this;
  }

  subject(subject: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Subject(subject));
    return this;
  }

  or(...values: SearchOperator[]): QueryBuilder {
    this.searchOperators.push(new Or(values));
    return this;
  }

  exclude(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Exclude(value));
    return this;
  }

  around(count: number, value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new AroundSearchOperator(count, value));
    return this;
  }

  label(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Label(value));
    return this;
  }

  has(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Has(value));
    return this;
  }

  hasAttachment(): QueryBuilder {
    return this.has('attachment');
  }

  list(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new List(value));
    return this;
  }

  filename(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Filename(value));
    return this;
  }

  exact(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Exact(value));
    return this;
  }

  group(...values: SearchOperator[]): QueryBuilder {
    this.searchOperators.push(new Group(values));
    return this;
  }

  inAnywhere(): QueryBuilder {
    this.searchOperators.push(new In('anywhere'));
    return this;
  }

  isImportant(): QueryBuilder {
    this.searchOperators.push(new Is('important'));
    return this;
  }

  isStarred(): QueryBuilder {
    this.searchOperators.push(new Is('starred'));
    return this;
  }

  isSnoozed(): QueryBuilder {
    this.searchOperators.push(new Is('snoozed'));
    return this;
  }

  isUnread(): QueryBuilder {
    this.searchOperators.push(new Is('unread'));
    return this;
  }

  isRead(): QueryBuilder {
    this.searchOperators.push(new Is('read'));
    return this;
  }

  cc(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Cc(value));
    return this;
  }

  bcc(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Bcc(value));
    return this;
  }

  after(value: Date): QueryBuilder {
    this.searchOperators.push(new DateSearchOperator('after', value));
    return this;
  }

  before(value: Date): QueryBuilder {
    this.searchOperators.push(new DateSearchOperator('before', value));
    return this;
  }

  olderThan(value: number, unit: Unit): QueryBuilder {
    this.searchOperators.push(new RelativeDateSearchOperator('older_than', value, unit));
    return this;
  }

  newerThan(value: number, unit: Unit): QueryBuilder {
    this.searchOperators.push(new RelativeDateSearchOperator('newer_than', value, unit));
    return this;
  }

  isChat(): QueryBuilder {
    this.searchOperators.push(new Is('chat'));
    return this;
  }

  deliveredto(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Deliveredto(value));
    return this;
  }

  category(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Category(value));
    return this;
  }

  size(value: number): QueryBuilder {
    this.searchOperators.push(new Size(value));
    return this;
  }

  larger(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Larger(value));
    return this;
  }

  smaller(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new Smaller(value));
    return this;
  }

  messageId(value: SearchOperator): QueryBuilder {
    this.searchOperators.push(new MessageId(value));
    return this;
  }

  hasUserlabels(): QueryBuilder {
    this.searchOperators.push(new Has('userlabels'));
    return this;
  }

  hasNouserlabels(): QueryBuilder {
    this.searchOperators.push(new Has('nouserlabels'));
    return this;
  }

  /**
   * build query string
   * @return query string
   */
  build(): string {
    return this.searchOperators.join(' ');
  }

  toString() {
    return this.build();
  }
}

export enum Unit {
  Day = 'd',
  Month = 'm',
  Year = 'y'
}

export interface SearchOperator {
}

class KeyValueSearchOperator implements SearchOperator {
  private readonly key: string;
  private readonly value: SearchOperator;

  constructor(key: string, value: SearchOperator) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `${this.key}:${this.value}`;
  }
}

class From extends KeyValueSearchOperator {
  constructor(from: SearchOperator) {
    super('from', from);
  }
}

class To extends KeyValueSearchOperator {
  constructor(to: SearchOperator) {
    super('to', to);
  }
}

class Subject extends KeyValueSearchOperator {
  constructor(subject: SearchOperator) {
    super('subject', subject);
  }
}

class Or implements SearchOperator {
  private readonly values: SearchOperator[];
  constructor(values: SearchOperator[]) {
    this.values = values;
  }
  toString() {
    return `{${this.values.join(' ')}}`;
  }
}

class Exclude implements SearchOperator {
  private readonly value: SearchOperator;
  constructor(value: SearchOperator) {
    this.value = value;
  }
  toString() {
    return `-${this.value}`;
  }
}

class AroundSearchOperator implements SearchOperator {
  private readonly count: number;
  private readonly value: SearchOperator;

  constructor(count: number, value: SearchOperator) {
    this.count = count;
    this.value = value;
  }

  toString() {
    return `AROUND ${this.count} ${this.value}`;
  }
}

class Label extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('label', value);
  }
}

class Has extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('has', value);
  }
}

class List extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('list', value);
  }
}

class Filename extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('filename', value);
  }
}

class Exact implements SearchOperator {
  private readonly value: SearchOperator;
  constructor(value: SearchOperator) {
    this.value = value;
  }
  toString() {
    return `"${this.value}"`;
  }
}

class Group implements SearchOperator {
  private readonly values: SearchOperator[];
  constructor(values: SearchOperator[]) {
    this.values = values;
  }
  toString() {
    return `(${this.values.join(' ')})`;
  }
}

class In extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('in', value);
  }
}

class Is extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('is', value);
  }
}

class Cc extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('cc', value);
  }
}

class Bcc extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('bcc', value);
  }
}

class DateSearchOperator extends KeyValueSearchOperator {
  constructor(key: string, value: Date) {
    super(key, `${value.getFullYear()}/${DateSearchOperator.padding(value.getMonth() + 1)}/${DateSearchOperator.padding(value.getDate())}`);
  }

  private static padding(value: number): string {
    return `0${value}`.slice(-2);
  }
}

class RelativeDateSearchOperator extends KeyValueSearchOperator {
  constructor(key: string, value: number, unit: Unit) {
    super(key, RelativeDateSearchOperator.format(value, unit));
  }

  private static format(value: number, unit: Unit): string {
    return `${value}${unit}`;
  } 
}

class Deliveredto extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('deliveredto', value);
  }
}

class Category extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('category', value);
  }
}

class Size extends KeyValueSearchOperator {
  constructor(value: number) {
    super('size', value);
  }
}

class Larger extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('larger', value);
  }
}

class Smaller extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('smaller', value);
  }
}

class MessageId extends KeyValueSearchOperator {
  constructor(value: SearchOperator) {
    super('rfc822msgid', value);
  }
}
