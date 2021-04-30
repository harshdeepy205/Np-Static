import Expense from "../classes/expense";

function upheapify(heap, idx) {
  if (idx == 0) return;
  var pi = Math.floor((idx - 1) / 2);
  //console.log(pi, idx);
  if (heap[pi].first < heap[idx].first) {
    var temp = heap[pi];
    heap[pi] = heap[idx];
    heap[idx] = temp;
    upheapify(heap, pi);
  } else {
    return;
  }
}

function downheapify(heap, idx) {
  var lc = 2 * idx + 1;
  var rc = 2 * idx + 2;
  if (lc >= heap.length && rc >= heap.length) return;
  var largest = idx;
  if (lc < heap.length && heap[lc].first > heap[largest].first) {
    largest = lc;
  }
  if (rc < heap.length && heap[rc].first > heap[largest].first) {
    largest = rc;
  }
  if (largest == idx) return;
  var temp = heap[largest];
  heap[largest] = heap[idx];
  heap[idx] = temp;
  downheapify(heap, largest);
}

function push_heap(heap, key, val) {
  var o = { "first": key, "second": val };
  heap.push(o);
  //console.log(heap);
  upheapify(heap, heap.length - 1);
}

function heap_top(heap) {
  if (heap.length == 0) return {};
  return heap[0];
}

function pop_heap(heap) {
  var i = heap.length - 1;
  var temp = heap[0]
  heap[0] = heap[i]
  heap[i] = temp;
  heap.pop();
  downheapify(heap, 0);
}

export function splitwise(transactions) {
  var net_balance = {};
  //console.log(transactions);
  for (var i = 0; i < transactions.length; i++) {
    var e = transactions[i];
    if (e.person1 in net_balance)
      net_balance[e.person1] += e.amount;
    else
      net_balance[e.person1] = e.amount;
    if (e.person2 in net_balance)
      net_balance[e.person2] -= e.amount;
    else
      net_balance[e.person2] = 0 - e.amount;

  }
  //console.log(net_balance);
  var positive = [];
  var negative = [];
  for (const p in net_balance) {
    //console.log(p);
    if (net_balance[p] > 0) {
      push_heap(positive, net_balance[p], p);
    } else if (net_balance[p] < 0) {
      push_heap(negative, -1 * net_balance[p], p);
    }
  }
  //console.log("hi", positive, negative);
  var result = [];

  while (positive.length > 0) {
    var p1 = heap_top(positive);
    var p2 = heap_top(negative);
    pop_heap(positive);
    pop_heap(negative);
    let exp = new Expense(p2.second, p1.second, Math.min(p1.first, p2.first));
    result.push(exp);
    if (p1.first > p2.first) {
      push_heap(positive, p1.first - p2.first, p1.second);
    } else if (p1.first < p2.first) {
      push_heap(negative, p2.first - p1.first, p2.second);
    }
  }
  //console.log(result);
  return result;
}
