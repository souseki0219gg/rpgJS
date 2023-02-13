// 条件が満たされるまで待つ関数
async function waitUntil(condition: () => boolean): Promise<void> {
  while (!condition()) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

export default waitUntil;
