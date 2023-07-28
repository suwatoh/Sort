// 交換用の関数
function swap(array, idx1, idx2) {
  const tmp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = tmp;
}

function insertionSort(array) {
  for (let i = 1; i < array.length; ++i) {
    // 挿入する値を一時的に保存する
    let currentVal = array[i];
    let j = i - 1;
    // 挿入位置まで入れ替え
    while (j >= 0 && array[j] > currentVal) {
      swap(array, j, j + 1);
      j--;
    }
  }
}

// ヒープ化
function heapify(array, i, max) {
  let index;
  let leftChild;
  let rightChild;

  while (i < max) {
    index = i;

    // 左の子の番号
    leftChild = 2 * i + 1;

    // 右の子の番号
    rightChild = leftChild + 1;

    // 左の子があって親より大きければ選択
    if (leftChild < max && array[leftChild] > array[index]) {
      index = leftChild;
    }

    // 右の子があって左の子より大きければ選択
    if (rightChild < max && array[rightChild] > array[index]) {
      index = rightChild;
    }

    // 上二つの場合のいずれでもないなら終了
    if (index === i) {
      return;
    }

    // 親と選択した子の交換
    swap(array, i, index);

    // 子の番号を親の番号として続行
    i = index;
  }
}

function heapSort(array) {
  // ヒープの構築
  for (let i = Math.floor((array.length - 1) / 2); i >= 0; --i) {
    heapify(array, i, array.length);
  }

  for (let j = array.length - 1; j > 0; --j) {
    swap(array, 0, j);
    heapify(array, 0, j);
  }
}

function merge(L, R) {
  const n = L.length + R.length;
  let B = new Array(n);
  let i = 0;  // L用のカウンタ
  let j = 0;  // R用のカウンタ

  for (let k = 0; k < n; ++k) {
    if (j >= R.length) {
      B[k] = L[i++];
    } else if (i >= L.length) {
      B[k] = R[j++];
    } else if (L[i] <= R[j]) {
      B[k] = L[i++];
    } else {
      B[k] = R[j++];
    }
  }

  return B;
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  let middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function quickSort(array, left=0, right=array.length-1) {
  // 長さ1なら終了
  if (left >= right) return;

  // ピボットを選ぶ(今回は先頭要素)
  const pivot = array[left];

  // ピボットより小さい値を左側へ、大きい値を右側へグループ分けする
  let i = left;
  for (let j = left + 1; j <= right; ++j) {
    // ピボット未満の要素があったら左に詰めていく
    if (array[j] < pivot) {
      swap(array, ++i, j);
    }
  }
  // ピボット(先頭要素)と左側グループの末尾とを交換
  swap(array, i, left);

  // 分割して再帰的に処理
  quickSort(array, left, i - 1);  // ピボットの左側
  quickSort(array, i + 1, right); // ピボットの右側
}


for (const n of [20, 100, 10000]) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n));
  }

  console.log("\nArray length:", n);
  console.log("-".repeat(20));

  console.time("insertionSort");
  insertionSort([...arr]);
  console.timeEnd("insertionSort");

  console.time("heapSort");
  heapSort([...arr]);
  console.timeEnd("heapSort");

  console.time("mergeSort");
  mergeSort([...arr]);
  console.timeEnd("mergeSort");

  console.time("quickSort");
  quickSort([...arr]);
  console.timeEnd("quickSort");
}
