export function searchEngine(
  search: string,
  result: any[],
  array: any[],
  entity: string
) {
  if (entity === "client") {
    array.map(
      (item: { name: string; discount: { toString: () => string } }) => {
        let searchByName = item.name.match(search);
        let searchByDiscount = item.discount.toString().match(search);

        if (searchByName || searchByDiscount) {
          result.push(item);
        }
      }
    );

    return result;
  }
}
