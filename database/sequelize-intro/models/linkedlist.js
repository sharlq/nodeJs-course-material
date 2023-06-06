class Node {
  next = null;
  value = null;
  constructor(value = null, next = null) {
    this.next = next;
    this.value = value;
  }
}

class LinkedList {
  head;
  constructor(value) {
    this.head = new Node(value);
  }

  append(value) {
    let current = this.head;
    while (current.next != null) {
      current = current.next;
    }
    current.next = new Node(value);
  }

  prepend
}
