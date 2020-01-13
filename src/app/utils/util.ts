export function transformData(data: any[], unity = 100000000) {
  const result = [];
  data.forEach(item => {
    let date = item.time.slice(11, 19);
    date = new Date('2020 01 01 ' + date).getTime();
    result.push([date, Math.ceil(item.money / unity)]);
  });
  return result;
}

export function workTime(): boolean {
  const hour = new Date().getHours();
  return 9 <= hour && hour < 16;
}
